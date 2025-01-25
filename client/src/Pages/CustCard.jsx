import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TablePagination from "@mui/material/TablePagination";

const CustCard = (props) => {
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
      <div className="CardDiv my-5">
        <div className="row g-4">
          {rowsToDisplay.length === 0 ? (
            <p> Record not found </p>
          ) : (
            rowsToDisplay.map((row, index) => (
              <div className="col-md-4 col-sm-12 col-lg-4 col-xl-3" key={index}>
                <div className="card" style={{ width: "100%" }}>
                  <img
                    src={row.img}
                    className="card-img-top"
                    alt="..."
                    style={row.active === "Y" ? { border: "4px solid green" } : { border: "4px solid red" }} 
                     />
                  <div className="d-flex justify-content-center p-2">
                    <EditIcon className="me-2" />
                    <DeleteIcon />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {row.fristName + row.lastName}
                    </h5>
                    <p className="card-text">{row.mobileNo}</p>
                    <div className="d-flex justify-content-between">
                      <p className="card-text">
                        Remaining Amount : {row.remainingAmount}
                      </p>
                      <p className="card-text">
                        Memberships : {row.memberships}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={props.filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default CustCard;
