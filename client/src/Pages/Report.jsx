import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { Alert, Snackbar, Menu, MenuItem } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";
import CustTable from "./Table";
import CustCard from "./CustCard";
import { baseURL } from "./config";
import axios from "axios";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  ClearIcon,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { Clear, ClearAll, FileDownload, Search } from "@mui/icons-material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import logo from "../assets/logo1.png";
import CatchFunction from "./CatchFunction";
import { useLocation, useNavigate } from "react-router-dom";

const Report = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState("list");
  const [transition, setTransition] = useState(undefined);
  const [warningMessage, setWarningMessage] = useState("");
  const [addUpdateViewRecord, setAddUpdateViewRecord] = useState({});
  const [alertMsg, setAlertMsg] = useState(false);
  const [downloadAnchorEl, setDownloadAnchorEl] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const [reportData, setReportData] = useState([]);

  const onSeachChange = (e) => setSearchQuery(e.target.value);
  const toggleView = (view) => setViewType(view);

  const location = useLocation();
  const navigate = useNavigate();

  const reportDataLocal = JSON.parse(
    localStorage.getItem("reportDataLocal") || "[]"
  );

  console.log(reportDataLocal);

  const filteredRows = reportData?.tableData?.filter((row) => {
    return (
      row.firstName.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      row.lastName.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      row.mobileNo.startsWith(searchQuery) ||
      row.address.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      row.remainingAmount.toString().startsWith(searchQuery) ||
      row.memberships.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      row.batch.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  });

  const onInputChange = (e, field) => {
    let newData = { ...addUpdateViewRecord };
    if (field === "startDate" || field === "endDate") {
      newData[field] = e ? e.format("YYYY-MM-DD") : null;
    } else {
      newData = { ...addUpdateViewRecord, [e.target.name]: e.target.value };
    }
    setAddUpdateViewRecord(newData);
  };

  React.useEffect(() => {
    const savedData = localStorage.getItem("reportDataLocal");
    if (savedData) {
      setReportData(JSON.parse(savedData));
    }
  }, []);

  const onHandleSearch = async () => {
    if (!addUpdateViewRecord.startDate) {
      handleClickAlertMsg(TransitionTop, "Start Date is missing");
      return;
    }
    if (!addUpdateViewRecord.endDate) {
      handleClickAlertMsg(TransitionTop, "End Date is missing");
      return;
    }

    try {
      const response = await axios.post(
        `${baseURL}/report`,
        addUpdateViewRecord,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response?.data?.message == "Customers retrieved successfully") {
        setReportData(response?.data?.data);
        localStorage.setItem(
          "reportDataLocal",
          JSON.stringify(response?.data?.data)
        );
        setDisabled(true);
      } else {
        handleClickAlertMsg(TransitionTop, response?.data?.message);
      }
    } catch (err) {
      console.error(err);
      // CatchFunction(err, navigate, location?.state);
      setDisabled(true);
    }
  };

  function TransitionTop(props) {
    return <Slide {...props} direction="down" />;
  }

  const handleClickAlertMsg = (Transition, msg) => {
    setWarningMessage(msg);
    setTransition(() => Transition);
    setAlertMsg(true);
  };

  const handleClickAlertMsgClose = (event, reason) => {
    if (reason !== "clickaway") setAlertMsg(false);
  };

  // Download Logic
  const handleDownloadClick = (event) => {
    setDownloadAnchorEl(event.currentTarget);
  };

  const handleDownloadClose = () => {
    setDownloadAnchorEl(null);
  };

  const handleDownloadOption = (type) => {
    if (type === "pdf") generatePDF();
    else if (type === "excel") generateExcel();
    setDownloadAnchorEl(null);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.addImage(logo, "PNG", 80, 5, 40, 40);
    doc.setTextColor(235, 60, 90); // Teal color (you can change this)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(
      `Report from ${new Date(addUpdateViewRecord.startDate).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      )} to ${new Date(addUpdateViewRecord.endDate).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      )}`,
      15,
      60
    );

    // Cards summary
    const summary = reportData?.cards?.map((card) => [card.title, card.count]);
    autoTable(doc, {
      head: [["Title", "Count"]],
      body: summary,
      headStyles: {
        fillColor: [235, 60, 90], // RGB color (this is teal)
        textColor: 255, // white text
        fontSize: 10,
      },
      bodyStyles: {
        lineColor: [200, 200, 200], // light gray borders
        lineWidth: 0.2,
        fontSize: 10,
      },
      tableLineColor: [180, 180, 180], // outer border
      tableLineWidth: 0.2,
      styles: {
        cellPadding: 3,
        overflow: "linebreak",
        valign: "middle",
      },
      startY: 70,
    });

    // Table Data
    const tableBody = reportData?.tableData.map((row) => [
      row.firstName + " " + row.lastName,
      row.mobileNo,
      row.batch,
      new Date(row.paymentDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      row.totalAmount,
      row.paidAmount || "",
      row.remainingAmount || "",
    ]);

    autoTable(doc, {
      head: [
        [
          "Name",
          "Mobile No",
          "Batch",
          "Last Payment Date",
          "Total Amount",
          "Paid Amount",
          "Remaining Amount",
        ],
      ],
      body: tableBody,
      startY: doc.lastAutoTable.finalY + 10,
      headStyles: {
        fillColor: [235, 60, 90], // RGB color (this is teal)
        textColor: 255, // white text
        fontSize: 10,
      },
      bodyStyles: {
        lineColor: [200, 200, 200], // light gray borders
        lineWidth: 0.2,
        fontSize: 10,
      },
      tableLineColor: [180, 180, 180], // outer border
      tableLineWidth: 0.2,
      styles: {
        cellPadding: 3,
        overflow: "linebreak",
        valign: "middle",
      },
    });

    doc.save(
      `Report from ${new Date(addUpdateViewRecord.startDate).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      )} TO ${new Date(addUpdateViewRecord.endDate).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      )}`
    );
    setDisabled(false);
    setAddUpdateViewRecord("");
  };

  const generateExcel = () => {
    const wsData = [
      ["Name", "Mobile No", "Joining Date", "Remaining"],
      ...filteredRows.map((row) => [
        row.firstName + row.lastName,
        row.mobileNo,
        dayjs(row.joiningDate).format("DD-MM-YYYY"),
        row.remainingAmount,
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(wsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(
      workbook,
      `Report from ${addUpdateViewRecord.startDate} TO ${addUpdateViewRecord.endDate}`
    );
    setDisabled(false);
    // setAddUpdateViewRecord("");
  };

  const handleClearReport = () => {
    localStorage.removeItem("reportDataLocal"); // Clear local storage
    setReportData([]); // Reset local state
    setDisabled(false);
    setAddUpdateViewRecord("");
  };

  return (
    <>
      <div className="px-4">
        <div className="cardBox ReportSection">
          <div className="CardHeaderReports">
            <span className="cardTitle">Reports</span>
            <div className="d-flex align-items-center">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Start Date"
                    value={dayjs(addUpdateViewRecord?.startDate, "YYYY-MM-DD")}
                    format="DD-MM-YYYY"
                    onChange={(val) => onInputChange(val, "startDate")}
                    className="me-3"
                  />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="End Date"
                    value={dayjs(addUpdateViewRecord?.endDate, "YYYY-MM-DD")}
                    format="DD-MM-YYYY"
                    onChange={(val) => onInputChange(val, "endDate")}
                    className="me-3"
                  />
                </DemoContainer>
              </LocalizationProvider>

              <Button
                variant="contained"
                color="success"
                startIcon={<Search />}
                onClick={onHandleSearch}
                className="me-3"
              >
                Search
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<ClearIcon />}
                onClick={handleClearReport}
                className="me-3"
              >
                Clear
              </Button>
            </div>

            <div>
              <Button
                disabled={!disabled}
                style={{
                  cursor: "pointer",
                  // color: disabled === true ? "#b1b4b9" : "#eb3c5a",
                  color: disabled === true ? "#eb3c5a" : "#b1b4b9",
                  borderRadius: "50%",
                  fontSize: "25px",
                }}
              >
                <FileDownload
                  // disabled={disabled}
                  onClick={handleDownloadClick}
                />
              </Button>
              <Menu
                anchorEl={downloadAnchorEl}
                open={Boolean(downloadAnchorEl)}
                onClose={handleDownloadClose}
              >
                <MenuItem onClick={() => handleDownloadOption("pdf")}>
                  Download PDF
                </MenuItem>
                <MenuItem onClick={() => handleDownloadOption("excel")}>
                  Download Excel
                </MenuItem>
              </Menu>

              <FormatListBulletedIcon
                className="me-3"
                onClick={() => toggleView("list")}
                style={{
                  cursor: "pointer",
                  color: viewType === "list" ? "#eb3c5a" : "#b1b4b9",
                }}
              />
              <GridViewIcon
                onClick={() => toggleView("card")}
                style={{
                  cursor: "pointer",
                  color: viewType === "card" ? "#eb3c5a" : "#b1b4b9",
                }}
              />
            </div>
          </div>
          <div className="CardBody">
            <div className="reportDiv">
              <div className="p-6 mx-auto">
                <ul>
                  <li style={{ "--accent-color": "#0B374D" }}>
                    <div className="title">Total Members</div>
                    <div className="title">
                      {reportData?.cards?.TotalMembers || 0}
                    </div>
                  </li>
                  <li style={{ "--accent-color": "#1286A8" }}>
                    <div className="title">Total Revenue</div>
                    <div className="title">
                      {reportData?.cards?.TotalRevenue || 0}
                    </div>
                  </li>
                  <li style={{ "--accent-color": "#D2B53B" }}>
                    <div className="title">Remaining Amount</div>
                    <div className="title">
                      {reportData?.cards?.RemainingAmount || 0}
                    </div>
                  </li>
                  <li style={{ "--accent-color": "#DA611E" }}>
                    <div className="title">New Joiners</div>
                    <div className="title">
                      {reportData?.cards?.NewJoiners || 0}
                    </div>
                  </li>
                  <li style={{ "--accent-color": "#AC2A1A" }}>
                    <div className="title">Over Due Members</div>
                    <div className="title">
                      {reportData?.cards?.OverDueMembers || 0}
                    </div>
                  </li>
                  <li style={{ "--accent-color": "#7aac1a" }}>
                    <div className="title">Unpaid Amount Members</div>
                    <div className="title">
                      {reportData?.cards?.UnpaidAmountMembers || 0}
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="row justify-content-end align-items-center">
              <div className="col-md-4">
                <TextField
                  variant="outlined"
                  name="search"
                  placeholder="search..."
                  onChange={onSeachChange}
                  fullWidth
                  className="my-3"
                />
              </div>
            </div>

            <div className="scollfDiv">
              {viewType === "list" && (
                <CustTable filteredRows={filteredRows} op={"reports"} />
              )}
              {viewType === "card" && (
                <CustCard filteredRows={filteredRows} op={"reports"} />
              )}
            </div>
          </div>
        </div>
      </div>

      <Snackbar
        open={alertMsg}
        autoHideDuration={3000}
        onClose={handleClickAlertMsgClose}
        TransitionComponent={transition}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClickAlertMsgClose}
          severity="warning"
          sx={{ width: "100%", marginTop: "8px", fontWeight: "bold" }}
        >
          {warningMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Report;
