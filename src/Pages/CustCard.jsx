import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const CustCard = (props) => {
  return (
    <>
      <div className="CardDiv my-5">
        <div className="row g-4">
          {props.filteredRows.length === 0 ? (
            <p> Record not found </p>
          ) : (
            props.filteredRows.map((row, index) => (
              <div className="col-md-2" key={index}>
                <div className="card" style={{ width: "100%" }}>
                  <img src={row.img} className="card-img-top" alt="..." />
                  <div className="d-flex justify-content-center p-2">
                    <EditIcon className="me-2" />
                    <DeleteIcon />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {" "}
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
      </div>
    </>
  );
};

export default CustCard;
