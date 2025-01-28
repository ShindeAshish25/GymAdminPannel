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

const CustTable = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate the rows to display based on the current page and rows per page
  const rowsToDisplay = props.filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <div className="tableDiv">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
              {rowsToDisplay.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    Record not found
                  </TableCell>
                </TableRow>
              ) : (
                rowsToDisplay.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="tableImg">
                      <img className="me-3" src={row.img} alt="img" />
                      {row.fristName + row.lastName}
                    </TableCell>
                    <TableCell>{row.mobileNo}</TableCell>
                    <TableCell>{row.addresses}</TableCell>
                    <TableCell>{row.paymentDate}</TableCell>
                    <TableCell>{row.remainingAmount}</TableCell>
                    <TableCell>{row.memberships}</TableCell>
                    <TableCell>{row.batch}</TableCell>
                    <TableCell>{row.renew}</TableCell>
                    <TableCell>
                      {props.op === "customer" ? (
                        <>
                          <EditIcon
                          sx={{color:"#eb3c5a"}}
                            className="me-2"
                            onClick={() => props.onHandleClick(row, "Update")}
                          />
                          <DeleteIcon
                           sx={{color:"#eb3c5a"}}
                            className="me-2"
                            onClick={() => props.onHadelDelete(row, "Delete")}
                          />
                        </>
                      ) : props.op === "overdue" ? (
                        <>
                          <AutorenewIcon
                           sx={{color:"#eb3c5a"}}
                            className="me-2"
                            onClick={() => props.onHandleClick(row, "Renewal")}
                          />
                          <DeleteIcon
                           sx={{color:"#eb3c5a"}}
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={props.filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    </>
  );
};

export default CustTable;
