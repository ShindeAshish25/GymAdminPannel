import * as React from "react";
import { useState, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Alert,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Form from "./Form";
import CustTable from "./Table";
import CustCard from "./CustCard";
import { baseURL } from "./config";
import axios from "axios";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
const Report = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState("list");
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [dialogComp, setDialogComp] = React.useState();
  const [activeCust, setActiveCust] = React.useState([]);
  const [transition, setTransition] = React.useState(undefined);
  const [warningMessage, setWarningMessage] = React.useState("");

  const [addUpdateViewRecord, setAddUpdateViewRecord] = React.useState({});
  const [alertMsg, setAlertMsg] = React.useState(false);

  const [addData, setAddData] = React.useState({
    startDate: "",
    endDate: "",
  });

  const onSeachChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  function TransitionTop(props) {
    return <Slide {...props} direction="center" />;
  }

  const toggleView = (view) => {
    setViewType(view);
  };

  const onSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter rows based on search query
  const filteredRows = activeCust?.filter((row) => {
    return (
      row.firstName.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      row.lastName.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      row.mobileNo.startsWith(searchQuery) ||
      row.address.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      row.paymentDate.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      row.remainingAmount.toString().startsWith(searchQuery) ||
      row.memberships.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      row.batch.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  });

  const onInputChange = (e, field) => {
    let newsearchData = { ...addUpdateViewRecord };

    if (field === "startDate") {
      // Handle payment date change
      newsearchData.startDate = e ? e.format("DD-MM-YYYY") : null;
    } else if (field === "endDate") {
      // Handle joiningDate date change
      newsearchData.endDate = e ? e.format("DD-MM-YYYY") : null;
    } else {
      // Handle other input fields
      const trimmedValue = e?.target?.value;
      newsearchData = {
        ...addUpdateViewRecord,
        [e?.target?.name]: trimmedValue,
      };
    }

    console.log(newsearchData);
    setAddUpdateViewRecord(newsearchData);
  };

  const onHandleSearch = async (data, operation) => {
    if (
      addUpdateViewRecord.startDate === "" ||
      addUpdateViewRecord.startDate === null ||
      addUpdateViewRecord.startDate === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Start Date is missing");
      return;
    } else if (
      addUpdateViewRecord.endDate === "" ||
      addUpdateViewRecord.endDate === null ||
      addUpdateViewRecord.endDate === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "End Date is missing");
      return;
    }
    await axios
      .post(baseURL + "/report", addUpdateViewRecord, {
        headers,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === true) {
          // handleClickAlertMsg(TransitionTop, response.data.message);
          Swal.fire({
            title: "Success",
            icon: "success",
            text: response.data.message,
            draggable: true,
            timer: 2000,
          });
          setOpen(false);
          props.getActiveCustomer();
        } else if (response.data.status === false) {
          Swal.fire({
            title: "error",
            icon: "Oppss..",
            text: response.data.message,
            draggable: true,
            timer: 2000,
          });
          handleClickAlertMsg(TransitionTop, response.data.message);
          setOpen(false);
        }
      })
      .catch((err) => {
        // Explicitly handle 409 Conflict
        if (err.response && err.response.status === 409) {
          console.log("Conflict: The customer might already exist.");
          handleClickAlertMsg(
            TransitionTop,
            "Conflict: Customer already exists."
          );
        } else {
          console.log(err);
        }
      });
  };

  const handleClickAlertMsg = (Transition, warnMsg) => {
    setAlertMsg(true);
    setWarningMessage(warnMsg);
    setTransition(() => Transition);
  };

  const handleClickAlertMsgClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertMsg(false);
  };

  const headers = {
    "Content-Type": "application/json",
  };

  return (
    <>
      <div className="px-4">
        <div className="cardBox">
          <div className="CardHeaderReports">
            <span className="cardTitle">Reports</span>
            <div className="d-flex align-items-center ">
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                className="w-100 LocalizationProvider"
                fullWidth
              >
                <DemoContainer
                  components={["DatePicker"]}
                  className="w-100 me-3"
                  fullWidth
                >
                  <DatePicker
                    className="w-100 me-3"
                    label="Start Date"
                    name="joiningDate"
                    value={
                      dayjs(addUpdateViewRecord?.joiningDate || null).isValid()
                        ? dayjs(addUpdateViewRecord?.joiningDate, "DD-MM-YYYY")
                        : null
                    } // Ensure the value is properly formatted
                    slotProps={{
                      textField: {
                        error: false,
                      },
                    }}
                    format="DD-MM-YYYY" // Ensuring the DatePicker uses this format
                    onChange={(value) => onInputChange(value, "startDate")}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    className="w-100 me-3"
                    label="End Date"
                    name="endDate"
                    value={
                      dayjs(addUpdateViewRecord?.joiningDate || null).isValid()
                        ? dayjs(addUpdateViewRecord?.joiningDate, "DD-MM-YYYY")
                        : null
                    } // Ensure the value is properly formatted
                    slotProps={{
                      textField: {
                        error: false,
                      },
                    }}
                    format="DD-MM-YYYY" // Ensuring the DatePicker uses this format
                    onChange={(value) => onInputChange(value, "endDate")}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <Button
                className="me-3 "
                variant="contained"
                onClick={() => onHandleSearch()}
              >
                Search
              </Button>
            </div>
            <div>
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
            <div className="row justify-content-end align-items-center">
              <div className="col-md-4">
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  name="search"
                  placeholder="search..."
                  onChange={(e) => onSeachChange(e)}
                  fullWidth
                  className="my-3"
                />
              </div>
            </div>

            {viewType === "list" && (
              <div className="listDiv">
                <CustTable filteredRows={filteredRows} op={"customer"} />
              </div>
            )}

            {/* Card view */}
            {viewType === "card" && <CustCard filteredRows={filteredRows} />}
          </div>
        </div>
      </div>
      <Snackbar
        open={alertMsg}
        autoHideDuration={3000}
        onClose={handleClickAlertMsgClose}
        TransitionComponent={transition}
        key={transition ? transition.name : ""}
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
      {isOpenDialog ? dialogComp : ""}
    </>
  );
};

export default Report;
