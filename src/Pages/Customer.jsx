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

const Customer = () => {
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
      fristName: "John",
      lastName: "Doe",
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
      img: "https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg",
    },
    {
      fristName: "Ashish ",
      lastName: "Shinde",
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
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMjeeornJdOe6FD8JTzqih-CByVmSWpSD0g&s",
    },
    {
      fristName: "Mohsin ",
      lastName: "Sayadd",
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
      img: "https://plus.unsplash.com/premium_photo-1682089892133-556bde898f2c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3R1ZGVudCUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
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
            <Button
              className="me-3"
              variant="outlined"
              onClick={() => onHadelClick(addData, "New")}
            >
              Add New Customer
            </Button>

            <FormatListBulletedIcon
              className="me-3"
              onClick={() => toggleView("list")}
              style={{
                cursor: "pointer",
                color: viewType === "list" ? "#1b90be" : "#b1b4b9",
              }}
            />

            <GridViewIcon
              onClick={() => toggleView("card")}
              style={{
                cursor: "pointer",
                color: viewType === "card" ? "#1b90be" : "#b1b4b9",
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
              op={"customer"}
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

export default Customer;
