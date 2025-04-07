import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Form from "./Form";
import { baseURL } from "./config";
import axios from "axios";
import Swal from "sweetalert2";

const CustTable = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [dialogComp, setDialogComp] = React.useState(false);
  const [data, setData] = useState({});
  const [operation, setOperation] = useState("");
  dayjs.extend(utc);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onHandleClick = (data, operation) => {
    // console.log("data", data);
    // console.log(data + "---" + operation + "---" + "clicked");
    setIsOpenDialog(true);
    setDialogComp(true);
    setData(data);
    setOperation(operation);
  };

  const headers = {
    "Content-Type": "application/json",
  };

  const onHandleDelete = async (row) => {
    axios
      .post(baseURL + "/deleteCust", row, {
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
          props.getActiveCustomer();
          // setPrintBill(true);
        } else if (response.data.status === false) {
          Swal.fire({
            title: "error",
            icon: "Oppss..",
            text: response.data.message,
            draggable: true,
            timer: 2000,
          });
          handleClickAlertMsg(TransitionTop, response.data.message);
        }
      })
      .catch((err) => {
        // Explicitly handle 409 Conflict
        console.log(err);
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

  // Calculate the rows to display based on the current page and rows per page
  const rowsToDisplay = props?.filteredRows?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return (
    <>
      <Paper className="tableDiv" sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer
          component={Paper}
          sx={{ minWidth: 650, maxHeight: 250 }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Joining Date</TableCell>
                <TableCell>Payment Date</TableCell>
                <TableCell>Remaining Amt</TableCell>
                <TableCell>Memberships</TableCell>
                <TableCell>Batch</TableCell> 
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsToDisplay?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    Record not found
                  </TableCell>
                </TableRow>
              ) : (
                rowsToDisplay?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell  style={{ width: '12%' }} className="tableImg">
                      <img className="me-2" src={row?.photo} alt="IMG" />
                      {row?.firstName + " " + row?.lastName}
                    </TableCell>
                    <TableCell style={{ width: '3%' }} className="text-start">{row?.mobileNo}</TableCell>
                    <TableCell style={{ width: '15%' }}>{row?.address}</TableCell>
                    <TableCell style={{ width: '5%' }} className="text-center">
                      {dayjs.utc(row?.joiningDate).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell style={{ width: '5%' }} className="text-center">
                      {dayjs.utc(row?.paymentDate).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell style={{ width: '5%' }} className="text-end">{row?.remainingAmount}</TableCell>
                    <TableCell style={{ width: '1%' }} className="text-center">
                      {row?.memberships == 1
                        ? "1 Month"
                        : row?.memberships == 2
                        ? "2 Months"
                        : row?.memberships == 3
                        ? "3 Months"
                        : row?.memberships == 4
                        ? "4 Months"
                        : row?.memberships == 5
                        ? "5 Months"
                        : row?.memberships == 6
                        ? "6 Months"
                        : row?.memberships == 7
                        ? "7 Months"
                        : row?.memberships == 8
                        ? "8 Months"
                        : row?.memberships == 9
                        ? "9 Months"
                        : row?.memberships == 10
                        ? "10 Months"
                        : row?.memberships == 11
                        ? "11 Months"
                        : row?.memberships == 12
                        ? "12 Months"
                        : "-"}
                    </TableCell>
                    <TableCell style={{ width: '1%' }} className="text-center">
                      {row?.batch === "M"
                        ? "Morning"
                        : row?.batch === "E"
                        ? "Evening"
                        : "-"}
                    </TableCell>
                    <TableCell style={{ width: '1%' }} className="text-end">
                      {props.op === "customer" ? (
                        <>
                          <EditIcon
                            sx={{ color: "#eb3c5a" }}
                            className="me-1"
                            onClick={() => onHandleClick(row, "Update")}
                          />
                          <DeleteIcon
                            sx={{ color: "#eb3c5a" }}
                            className="me-1"
                            onClick={() => onHandleDelete(row, "Delete")}
                          />
                        </>
                      ) : props.op === "overdue" ? (
                        <>
                          <AutorenewIcon
                            sx={{ color: "#eb3c5a" }}
                            className="me-1"
                            onClick={() => onHandleClick(row, "Renewal")}
                          />
                          <DeleteIcon
                            sx={{ color: "#eb3c5a" }}
                            className="me-1"
                            onClick={() => onHandleDelete(row, "Delete")}
                          />
                        </>
                      ) 
                      : props.op === "old" ? (
                        <>
                          <AutorenewIcon
                            sx={{ color: "#eb3c5a" }}
                            className="me-1"
                            onClick={() => onHandleClick(row, "Renewal")}
                          />
                          {/* <DeleteIcon
                            sx={{ color: "#eb3c5a" }}
                            className="me-1"
                            onClick={() => onHandleDelete(row, "Delete")}
                          /> */}
                        </>
                      ) :
                       null}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={props?.filteredRows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {isOpenDialog ? (
        <Form
          data={data}
          setIsOpenDialog={setIsOpenDialog}
          isOpenDialog={isOpenDialog}
          op={operation}
          getActiveCustomer={props.getActiveCustomer}
        />
      ) : (
        ""
      )}

      {/* {isOpenDialog ? dialogComp : ""} */}
    </>
  );
};

export default CustTable;
