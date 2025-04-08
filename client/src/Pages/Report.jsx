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
  const [disabled, setDisabled] = useState(true);

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
        _id: "67f02f4f7d17412745c588a1",
        photo: "/uploads/1743793999401-820932774-Photo_ID.jpg",
        firstName: "Ashish",
        lastName: "Shinde",
        mobileNo: "9049381815",
        email: "ashishshinde485@gmail.com",
        gender: "male",
        address: "Hujur galli kolhapur Hujur galli kolhapur Hujur ga",
        joiningDate: "2025-03-05T00:00:00.000Z",
        paymentDate: "2025-03-05T00:00:00.000Z",
        memberships: "1",
        batch: "M",
        training: "Cardio",
        totalAmount: "500",
        remainingAmount: "100",
        paidAmount: "400",
        paymentMode: "Cash",
        active: "Y",
        createdAt: "2025-04-04T19:13:19.877Z",
        updatedAt: "2025-04-04T19:32:59.966Z",
        __v: 0,
        custId: "67f02f4f7d17412745c588a1",
      },
      {
        _id: "67f02fe77d17412745c588a8",
        photo: "/uploads/1743794151876-556609999-CK_ID_Photo.jpeg",
        firstName: "chaianya",
        lastName: "kovale",
        mobileNo: "7884077077",
        email: "ck24@gmail.com",
        gender: "male",
        address: "kolhapur",
        joiningDate: "2025-03-04T00:00:00.000Z",
        paymentDate: "2025-03-04T00:00:00.000Z",
        memberships: "1",
        batch: "E",
        training: "Strength",
        totalAmount: "1200",
        remainingAmount: "200",
        paidAmount: "1000",
        paymentMode: "UPI",
        active: "Y",
        createdAt: "2025-04-04T19:15:51.883Z",
        updatedAt: "2025-04-04T19:15:51.883Z",
        __v: 0,
        custId: "67f02fe77d17412745c588a8",
      },
      {
        _id: "67f030857d17412745c588ac",
        photo:
          "/uploads/1743794308957-711412300-ab2827f1-a2ea-469f-874f-de59c41af595.jpeg",
        firstName: "yogesh",
        lastName: "Shinde",
        mobileNo: "7878787878",
        email: "sunny@gmail.com",
        gender: "male",
        address: "Somvar peth",
        joiningDate: "2025-03-07T00:00:00.000Z",
        paymentDate: "2025-03-07T00:00:00.000Z",
        memberships: "1",
        batch: "E",
        training: "Cardio",
        totalAmount: "500",
        remainingAmount: "100",
        paidAmount: "400",
        paymentMode: "UPI",
        active: "Y",
        createdAt: "2025-04-04T19:18:29.021Z",
        updatedAt: "2025-04-04T20:54:27.664Z",
        __v: 0,
        custId: "67f030857d17412745c588ac",
      },
      {
        _id: "67f031f17d17412745c588b6",
        photo:
          "/uploads/1743794673030-587452850-man-listening-music-cellphone-gym.jpg",
        firstName: "Aditya",
        lastName: "Dalvi",
        mobileNo: "8789878897",
        email: "adit@gmail.com",
        gender: "male",
        address: "kolhapur",
        joiningDate: "2025-04-05T00:00:00.000Z",
        paymentDate: "2025-04-05T00:00:00.000Z",
        memberships: "1",
        batch: "M",
        training: "Flexibility",
        totalAmount: "900",
        remainingAmount: "100",
        paidAmount: "800",
        paymentMode: "Cash",
        active: "Y",
        createdAt: "2025-04-04T19:24:33.530Z",
        updatedAt: "2025-04-04T19:24:33.530Z",
        __v: 0,
        custId: "67f031f17d17412745c588b6",
      },
      {
        _id: "67f032757d17412745c588ba",
        photo: "/uploads/1743794805840-381005556-15620878_835_programmer.jpg",
        firstName: "Yugant",
        lastName: "More",
        mobileNo: "3333333333",
        email: "yugant@gmail.com",
        gender: "male",
        address: "Somvar peth",
        joiningDate: "2025-04-04T00:00:00.000Z",
        paymentDate: "2025-04-04T00:00:00.000Z",
        memberships: "2",
        batch: "M",
        training: "Strength",
        totalAmount: "700",
        remainingAmount: "250",
        paidAmount: "450",
        paymentMode: "Cash",
        active: "Y",
        createdAt: "2025-04-04T19:26:45.898Z",
        updatedAt: "2025-04-04T19:26:45.898Z",
        __v: 0,
        custId: "67f032757d17412745c588ba",
      },
      {
        _id: "67f03c937d17412745c588c9",
        photo: "/uploads/1743797395491-660533472-output-onlinepngtools.png",
        firstName: "Prathamesh",
        lastName: "Kumbhar",
        mobileNo: "6598578798",
        email: "prathamesh@gmail.com",
        gender: "male",
        address: "Somvar peth",
        joiningDate: "2025-04-03T00:00:00.000Z",
        paymentDate: "2025-03-14T00:00:00.000Z",
        memberships: "2",
        batch: "M",
        training: "Core",
        totalAmount: "700",
        remainingAmount: "500",
        paidAmount: "200",
        paymentMode: "Cash",
        active: "Y",
        createdAt: "2025-04-04T20:09:55.996Z",
        updatedAt: "2025-04-04T20:09:55.996Z",
        __v: 0,
        custId: "67f03c937d17412745c588c9",
      },
      {
        _id: "67f03ced7d17412745c588cd",
        photo: "/uploads/1743797485570-747921403-CK_ID_Photo.jpeg",
        firstName: "ashish",
        lastName: "shinde",
        mobileNo: "9878548925",
        email: "ashish@gmail.com",
        gender: "male",
        address: "Hujur galli kolhapur Hujur galli kolhapur Hujur ga",
        joiningDate: "2025-03-12T00:00:00.000Z",
        paymentDate: "2025-03-14T00:00:00.000Z",
        memberships: "1",
        batch: "E",
        training: "Strength",
        totalAmount: "800",
        remainingAmount: "500",
        paidAmount: "300",
        paymentMode: "Cash",
        active: "Y",
        createdAt: "2025-04-04T20:11:25.581Z",
        updatedAt: "2025-04-04T20:11:25.581Z",
        __v: 0,
        custId: "67f03ced7d17412745c588cd",
      },
      {
        _id: "67f2abea1e7d86c49066a80d",
        photo: "/uploads/1743956970609-976889434-O3_White.PNG",
        firstName: "FristName",
        lastName: "LastName",
        mobileNo: "9513589775",
        email: "example@gmail.com",
        gender: "male",
        address: "Address",
        joiningDate: "2025-03-06T00:00:00.000Z",
        paymentDate: "2025-03-06T00:00:00.000Z",
        memberships: "1",
        batch: "E",
        training: "Core",
        totalAmount: "1000",
        remainingAmount: "310",
        paidAmount: "690",
        paymentMode: "Cash",
        active: "Y",
        createdAt: "2025-04-06T16:29:30.943Z",
        updatedAt: "2025-04-06T16:29:30.943Z",
        __v: 0,
        custId: "67f2abea1e7d86c49066a80d",
      },
    ],
  });

  const onSeachChange = (e) => setSearchQuery(e.target.value);
  const toggleView = (view) => setViewType(view);

  const location = useLocation();
  const navigate = useNavigate();

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

    setDisabled(false);

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
      setDisabled(false);
    } catch (err) {
      console.error(err);
      CatchFunction(err, navigate, location?.state);
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
              <Button
                disabled={disabled}
                style={{
                  cursor: "pointer",
                  color: disabled === true ? "#b1b4b9" : "#eb3c5a",
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
              {viewType === "card" && (
                <CustCard filteredRows={filteredRows} op="reports" />
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
