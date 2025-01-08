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

const CustTable = (props) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Joing Date</TableCell>
              <TableCell>Remaining Amount</TableCell>
              <TableCell>Memberships</TableCell>
              <TableCell>Batch</TableCell>
              <TableCell>Renew Memberships</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.filteredRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  Record not found
                </TableCell>
              </TableRow>
            ) : (
              props.filteredRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="tableImg">
                    <img className="me-3" src={row.img} alt="img" />
                    {row.fristName + row.lastName}
                  </TableCell>
                  <TableCell>{row.mobileNo}</TableCell>
                  <TableCell>{row.addresses}</TableCell>
                  <TableCell>{row.joingDate}</TableCell>
                  <TableCell>{row.remainingAmount}</TableCell>
                  <TableCell>{row.memberships}</TableCell>
                  <TableCell>{row.batch}</TableCell>
                  <TableCell>{row.renew}</TableCell>
                  <TableCell>
                    {props.op === "customer" ? (
                      <>
                        <EditIcon
                          className="me-2"
                          onClick={() => props.onHadelClick(row, "Update")}
                        />
                        <DeleteIcon
                          className="me-2"
                          onClick={(e) => {
                            onHadelDelete(row, "Delete");
                          }}
                        />
                      </>
                    ) : props.op === "overdue" ? (
                      <>
                        <AutorenewIcon
                          className="me-2"
                          onClick={(e) => {
                            onHadelDelete(row, "Renewal");
                          }}
                        />
                        <DeleteIcon
                          className="me-2"
                          onClick={(e) => {
                            onHadelDelete(row, "Delete");
                          }}
                        />
                      </>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustTable;
