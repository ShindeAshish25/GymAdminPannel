import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";
import Form from "./Form";
import CustTable from "./Table";
import CustCard from "./CustCard";
import { baseURL } from "./config";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import CatchFunction from "./CatchFunction";

const Customer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState("list");
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [dialogComp, setDialogComp] = React.useState();
  const [activeCust, setActiveCust] = React.useState([]);
  const [addData, setAddData] = React.useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    email: "",
    paymentDate: "",
    joiningDate: "",
    batch: "",
    memberships: "",
    training: "",
    totalAmount: "",
    remainingAmount: "",
    payableAmount: "",
    address: "",
    paymentMode: "",
    gender: "",
    photo: "",
  });
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    getActiveCust();
  }, []);

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
  const filteredRows = activeCust?.filter((row) => {
    return (
      row.firstName.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      row.lastName.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      row.mobileNo.startsWith(searchQuery) ||
      row.address.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      row.remainingAmount.toString().startsWith(searchQuery) ||
      row.memberships.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
      row.batch.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  });

  const onHandleClick = (row, operation) => {
    console.log(row + operation + "******************clicked");
    setIsOpenDialog(true);
    setDialogComp(true);
    setDialogComp(
      <Form
        data={row}
        op={operation}
        getActiveCustomer={getActiveCust}
        setIsOpenDialog={setIsOpenDialog}
        isOpenDialog={isOpenDialog}
      />
    );
  };

  const headers = {
    "Content-Type": "application/json",
  };

  const getActiveCust = async () => {
    try {
      const response = await axios.get(baseURL + "/getActiveCust", {
        headers,
      });
      // console.log(response.data.data);

      let data = [];
      if (response.data.data.length > 0) {
        data = await Promise.all(
          response.data.data.map(async (ele) => {
            const imgUrl = await fetchImage(ele.photo);
            return { ...ele, photo: imgUrl };
          })
        );
      }

      setActiveCust(data);
    } catch (error) {
      console.log(error);
      CatchFunction(error, navigate, location?.state);
    }
  };

  const fetchImage = async (file) => {
    const imageURL = baseURL.replace("/api/customers", "") + file;
    return imageURL;
  };

  return (
    <>
      <div className="px-4">
        <div className="cardBox">
          <div className="CardHeader">
            <span className="cardTitle"> Active Members</span>
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
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex">
                <Button
                  className="me-3"
                  variant="outlined"
                  onClick={() => onHandleClick(addData, "New")}
                >
                  Add New Customer
                </Button>
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
                  onHandleClick={onHandleClick}
                  getActiveCustomer={getActiveCust}
                  op={"customer"}
                />
              </div>
            )}
            {/* Card view */}
            {viewType === "card" && (
              <div className="cardDiv">
                <CustCard
                  filteredRows={filteredRows}
                  onHandleClick={onHandleClick}
                  getActiveCustomer={getActiveCust}
                  op={"customer"}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {isOpenDialog ? dialogComp : ""}
    </>
  );
};

export default Customer;
