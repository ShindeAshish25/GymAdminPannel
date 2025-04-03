import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TablePagination from "@mui/material/TablePagination";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { baseURL } from "./config";
import Form from "./Form";

import axios from "axios";
import Swal from "sweetalert2";

const CustCard = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [dialogComp, setDialogComp] = React.useState(false);
  const [data, setData] = useState({});
  const [operation, setOperation] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const headers = {
    "Content-Type": "application/json",
  };

  const onHandleClick = (data, operation) => {
    // console.log("data", data);
    // console.log(data + "---" + operation + "---" + "clicked");
    setIsOpenDialog(true);
    setDialogComp(true);
    setData(data);
    setOperation(operation);
  };

  const onHadelDelete = async (row) => {
    await axios
      .post(baseURL + "/delCust", row, {
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
      <div className="CardDiv my-5">
        <div className="row g-4">
          {rowsToDisplay?.length === 0 ? (
            <p> Record not found </p>
          ) : (
            rowsToDisplay?.map((row, index) => (
              <div className="col-md-4 col-sm-12 col-lg-4 col-xl-3" key={index}>
                <div className="card" style={{ width: "100%" }}>
                  <img
                    src={row?.photo}
                    className="card-img-top"
                    alt="Photo not found"
                    style={
                      row.active === "Y"
                        ? { border: "4px solid green" }
                        : { border: "4px solid red" }
                    }
                  />
                  <div className="d-flex justify-content-center p-2">
                    {props.op === "customer" ? (
                      <>
                        <EditIcon
                          sx={{ color: "#eb3c5a" }}
                          className="me-2"
                          onClick={() => onHandleClick(row, "Update")}
                        />
                        <DeleteIcon
                          sx={{ color: "#eb3c5a" }}
                          className="me-2"
                          onClick={() => onHadelDelete(row, "Delete")}
                        />
                      </>
                    ) : props.op === "overdue" ? (
                      <>
                        <AutorenewIcon
                          sx={{ color: "#eb3c5a" }}
                          className="me-2"
                          onClick={() => onHandleClick?.(row, "Renewal")}
                        />
                        <DeleteIcon
                          sx={{ color: "#eb3c5a" }}
                          className="me-2"
                          onClick={() => onHadelDelete(row, "Delete")}
                        />
                      </>
                    ) : null}
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {row?.firstName + " " + row?.lastName}
                    </h5>
                    <p className="card-text">{row?.mobileNo}</p>
                    <div className="d-flex  flex-column">
                      <p className="card-text">
                        <b>Remaining Amount :</b> ₹ {row?.remainingAmount}
                      </p>
                      <p className="card-text">
                        <b>Memberships :</b> {row?.memberships}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <TablePagination
          rowsPerPageOptions={[4, 8, 12, 16]}
          component="div"
          count={props?.filteredRows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

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
    </>
  );
};

export default CustCard;
