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
import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Form from "./Form";
import CustTable from "./Table";
import CustCard from "./CustCard";

const OverdueMemberships = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState("list");
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [dialogComp, setDialogComp] = React.useState();
  const [addData, setAddData] = React.useState({
    fristName: "",
    lastName: "",
    mobileNo: "",
    email: "",
    joingDate: "",
    batch: "",
    memberships: "",
    training: "",
    totalAmount: "",
    remainingAmount: "",
    addresses: "",
    paymentMode: "",
    gender: "",
  });

  const rows = [
    {
      fristName: "Alex",
      lastName: "JOhne",
      custId: "1",
      mobileNo: "9049831815",
      addresses: "kolhapura",
      joingDate: "27-12-2024",
      totalAmount: "2000",
      remainingAmount: "2000",
      email: "kolhapura@gmail.com",
      memberships: "1 month",
      batch: "Morning",
      renew: "After 10 days",
      active:"N",
      img: "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2480",
    },
    {
      fristName: "Yogesh ",
      lastName: "Raut",
      mobileNo: "9049831815",
      custId: "2",
      addresses: "kolhapura",
      joingDate: "27-12-2024",
      totalAmount: "2000",
      remainingAmount: "2000",
      email: "kolhapura@gmail.com",
      memberships: "8 month",
      batch: "Morning",
      renew: "After 30 days",
      active:"N",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcg4Y51XjQ-zSf87X4nUPTQzsF83eFdZswTg&s",
    },
    {
      fristName: "Rahul ",
      lastName: "patil",
      custId: "3",
      mobileNo: "9049831815",
      addresses: "kolhapura",
      joingDate: "27-12-2024",
      totalAmount: "2000",
      remainingAmount: "2000",
      email: "kolhapura@gmail.com",
      memberships: "3 month",
      batch: "Morning",
      renew: "After 60 days",
      active:"N",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2bcBC2rxeYymW9_yJ1xbxz8tmAn--t7_NCVGlirSsgKXXCff9aCyV82uXVmTSEB8GO-A&usqp=CAU",
    },
  ];

  const onSeachChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleView = (view) => {
    setViewType(view);
  };

  const onSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter rows based on search query
  const filteredRows = rows.filter((row) => {
    return (
      row.fristName.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      row.lastName.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      row.mobileNo.startsWith(searchQuery) ||
      row.addresses.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      row.joingDate.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      row.remainingAmount.toString().startsWith(searchQuery) ||
      row.memberships.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      row.batch.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  });

  const onHadelClick = (data, operation) => {
    setIsOpenDialog((isOpenDialog) => !isOpenDialog);
    setDialogComp(<Form data={data} op={operation} />);
    console.log(data + operation);
  };
  const onHadelDelete = (row) => {
    console.log(row);
  };
  return (
    <>
      <div className="px-4">
        <div className="d-flex justify-content-between align-items-center">
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
            <CustTable
              filteredRows={filteredRows}
              onHadelClick={onHadelClick}
              onHadelDelete={onHadelDelete}
              op={"overdue"}
            />
          </div>
        )}

        {/* Card view */}
        {viewType === "card" && <CustCard filteredRows={filteredRows} />}
      </div>
      {isOpenDialog ? dialogComp : ""}
    </>
  );
};

export default OverdueMemberships;
