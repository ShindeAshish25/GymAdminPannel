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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { FileDownload } from "@mui/icons-material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import logo from "../assets/logo1.png";

const Report = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState("list");
  const [transition, setTransition] = useState(undefined);
  const [warningMessage, setWarningMessage] = useState("");
  const [addUpdateViewRecord, setAddUpdateViewRecord] = useState({});
  const [alertMsg, setAlertMsg] = useState(false);
  const [downloadAnchorEl, setDownloadAnchorEl] = useState(null);

  const [data, setData] = useState({
    cards: [
      { id: 1, color: "#0B374D", title: "Total Members", count: "0" },
      { id: 2, color: "#1286A8", title: "Total Revenue", count: "0" },
      { id: 3, color: "#D2B53B", title: "Remaining Amount", count: "0" },
      { id: 4, color: "#DA611E", title: "New Joiners", count: "0" },
      { id: 5, color: "#AC2A1A", title: "Over Due Members", count: "0" },
      { id: 6, color: "#7aac1a", title: "Unpaid Amount Members", count: "0" },
    ],
    tableData: [
      {
        _id: "67a4844d7b6f4b7d93a9e7b0",
        firstName: "Shahid",
        lastName: "Kapoorrrrrrrrrr",
        mobileNo: "9049889898",
        email: "ashishshinde48om",
        gender: "male",
        address: "kolhapur",
        joiningDate: "2019-02-19T18:30:00.000Z",
        paymentDate: "2019-12-19T18:30:00.000Z",
        memberships: "2",
        batch: "M",
        training: "Cardio",
        totalAmount: "1000",
        remainingAmount: "700",
        paymentMode: "UPI",
        active: "Y",
        createdAt: "2025-02-06T09:43:41.806Z",
        updatedAt: "2025-03-19T08:19:01.809Z",
        __v: 0,
        paidAmount: "300",
        custId: "67a4844d7b6f4b7d93a9e7b0",
      },
      {
        _id: "67a497057b6f4b7d93a9e82f",
        photo: "",
        firstName: "Yogesh",
        lastName: "Raut",
        mobileNo: "8877995500",
        email: "yogesh@gmail.com",
        gender: "male",
        address: "Yavtmal",
        joiningDate: "2025-02-04T18:30:00.000Z",
        paymentDate: "2025-02-07T18:30:00.000Z",
        memberships: "6",
        batch: "E",
        training: "Flexibility",
        totalAmount: "800",
        remainingAmount: "",
        paymentMode: "UPI",
        active: "",
        createdAt: "2025-02-06T11:03:33.580Z",
        updatedAt: "2025-02-06T11:03:33.580Z",
        __v: 0,
        custId: "67a497057b6f4b7d93a9e82f",
      },
      {
        _id: "67a4a74e7b6f4b7d93a9e871",
        photo: "",
        firstName: "Saket",
        lastName: "singh",
        mobileNo: "7788996655",
        email: "saket@gmail.com",
        gender: "male",
        address: "MP",
        joiningDate: "2025-02-06T18:30:00.000Z",
        paymentDate: "2025-02-06T18:30:00.000Z",
        memberships: "6",
        batch: "E",
        training: "Core",
        totalAmount: "800",
        remainingAmount: "",
        paymentMode: "UPI",
        active: "",
        createdAt: "2025-02-06T12:13:02.262Z",
        updatedAt: "2025-02-06T12:13:02.262Z",
        __v: 0,
        custId: "67a4a74e7b6f4b7d93a9e871",
      },
      {
        _id: "67a4a7e47b6f4b7d93a9e878",
        firstName: "Prathmesh",
        lastName: "Padavle",
        mobileNo: "2222222222",
        email: "pratamesh@gmail.com",
        gender: "male",
        address: "CBS",
        joiningDate: "2025-02-06T18:30:00.000Z",
        paymentDate: "2024-12-26T18:30:00.000Z",
        memberships: "2",
        batch: "E",
        training: "Strength",
        totalAmount: " 1500",
        remainingAmount: "",
        paymentMode: "UPI",
        active: "",
        createdAt: "2025-02-06T12:15:32.747Z",
        updatedAt: "2025-02-10T13:19:41.852Z",
        __v: 0,
        custId: "67a4a7e47b6f4b7d93a9e878",
      },
      {
        _id: "67a9ca37bba0af4ca32c553b",
        firstName: "Saket",
        lastName: "Singh",
        mobileNo: "7788995544",
        email: "saketS@gmail.com",
        gender: "male",
        address: "Yavtmal",
        joiningDate: "2009-02-19T18:30:00.000Z",
        paymentDate: "2010-02-19T18:30:00.000Z",
        memberships: "3",
        batch: "E",
        training: "Strength",
        totalAmount: "800",
        remainingAmount: "300",
        paymentMode: "UPI",
        active: "Y",
        createdAt: "2025-02-10T09:43:19.179Z",
        updatedAt: "2025-03-18T08:28:48.546Z",
        __v: 0,
        paidAmount: "500",
        custId: "67a9ca37bba0af4ca32c553b",
      },
      {
        _id: "67a9d363bba0af4ca32c5554",
        firstName: "Madhu",
        lastName: "Choopari",
        mobileNo: "2325325465",
        email: "madhu@gmail.com",
        gender: "male",
        address: "Hydrabad",
        joiningDate: "2019-02-19T18:30:00.000Z",
        paymentDate: "2019-02-19T18:30:00.000Z",
        memberships: "1",
        batch: "E",
        training: "Core",
        totalAmount: "800",
        remainingAmount: "300",
        paymentMode: "Cash",
        active: "Y",
        createdAt: "2025-02-10T10:22:27.289Z",
        updatedAt: "2025-03-18T08:40:37.396Z",
        __v: 0,
        paidAmount: "500",
        custId: "67a9d363bba0af4ca32c5554",
      },
    ],
  });

  const onSeachChange = (e) => setSearchQuery(e.target.value);
  const toggleView = (view) => setViewType(view);

  const filteredRows = data.tableData?.filter((row) =>
    [
      row.firstName,
      row.lastName,
      row.mobileNo,
      row.address,
      row.paymentDate,
      row.remainingAmount,
      row.memberships,
      row.batch,
    ].some((field) =>
      field?.toString().toLowerCase().startsWith(searchQuery.toLowerCase())
    )
  );

  const onInputChange = (e, field) => {
    let newData = { ...addUpdateViewRecord };
    if (field === "startDate" || field === "endDate") {
      newData[field] = e ? e.format("YYYY-MM-DD") : null;
    } else {
      newData = { ...addUpdateViewRecord, [e.target.name]: e.target.value };
    }
    setAddUpdateViewRecord(newData);
  };

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
      setData(response.data);
      setAddUpdateViewRecord("");
    } catch (err) {
      if (err.response?.status === 409) {
        handleClickAlertMsg(
          TransitionTop,
          "Conflict: Customer already exists."
        );
      } else {
        console.error(err);
      }
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
      `Report from ${addUpdateViewRecord.startDate} TO ${addUpdateViewRecord.endDate}`,
      15,
      60
    );

    // Cards summary
    const summary = data.cards.map((card) => [card.title, card.count]);
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
    const tableBody = data.tableData.map((row) => [
      row.firstName + " " + row.lastName,
      row.mobileNo,
      row.batch,
      row.paymentDate,
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
      `Report from ${addUpdateViewRecord.startDate} TO ${addUpdateViewRecord.endDate}`
    );
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
                onClick={onHandleSearch}
                className="me-3"
              >
                Search
              </Button>
            </div>

            <div>
              <FileDownload
                className="me-3"
                onClick={handleDownloadClick}
                style={{
                  cursor: "pointer",
                  color: "#b1b4b9",
                  padding: "5px",
                  borderRadius: "50%",
                  backgroundColor: "#f5f5f5",
                  fontSize: "24px",
                }}
              />
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
                  {data.cards.map((card) => (
                    <li key={card.id} style={{ "--accent-color": card.color }}>
                      <div className="title">{card.title}</div>
                      <div className="title">{card.count}</div>
                    </li>
                  ))}
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

            <div className="scollDiv">
              {viewType === "list" && (
                <CustTable filteredRows={filteredRows} op="reports" />
              )}
              {viewType === "card" && <CustCard filteredRows={filteredRows} />}
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
