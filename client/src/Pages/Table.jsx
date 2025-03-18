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

const CustTable = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [dialogComp, setDialogComp] = React.useState();

  dayjs.extend(utc);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const onHandleClick = (data, operation) => {
  //   setIsOpenDialog((isOpenDialog) => !isOpenDialog);
  //   setDialogComp(
  //     <Form
  //       data={data}
  //       op={operation}
  //       getActiveCustomer={props.getActiveCustomer}
  //     />
  //   );
  //   console.log(data + operation + "clicked");
  // };

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
          sx={{ minWidth: 650, maxHeight: 450 }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Joining Date</TableCell>
                <TableCell>Remaining Amount</TableCell>
                <TableCell>Memberships</TableCell>
                <TableCell>Batch</TableCell>
                <TableCell>Renew Memberships</TableCell>
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
                    <TableCell className="tableImg">
                      <img className="me-3" src={row?.photo} alt="IMG" />
                      {row?.firstName + " " + row?.lastName}
                    </TableCell>
                    <TableCell>{row?.mobileNo}</TableCell>
                    <TableCell>{row?.address}</TableCell>
                    <TableCell>
                      {dayjs.utc(row?.joiningDate).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>{row?.remainingAmount}</TableCell>
                    <TableCell>
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
                    <TableCell>
                      {row?.batch === "M"
                        ? "Morning"
                        : row?.batch === "E"
                        ? "Evening"
                        : "-"}
                    </TableCell>
                    <TableCell>{row?.renew}</TableCell>
                    <TableCell>
                      {props.op === "customer" ? (
                        <>
                          <EditIcon
                            sx={{ color: "#eb3c5a" }}
                            className="me-2"
                            onClick={() => props.onHandleClick(row, "Update")}
                            // onClick={() => props.onHandlUpdate(row, "Update")}
                          />
                          <DeleteIcon
                            sx={{ color: "#eb3c5a" }}
                            className="me-2"
                            onClick={() => props.onHadelDelete(row, "Delete")}
                          />
                        </>
                      ) : props.op === "overdue" ? (
                        <>
                          <AutorenewIcon
                            sx={{ color: "#eb3c5a" }}
                            className="me-2"
                            onClick={() =>
                              props.onHandleClick?.(row, "Renewal")
                            }
                          />
                          <DeleteIcon
                            sx={{ color: "#eb3c5a" }}
                            className="me-2"
                            onClick={() => props.onHadelDelete(row, "Delete")}
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
      {isOpenDialog ? dialogComp : ""}
    </>
  );
};

export default CustTable;
