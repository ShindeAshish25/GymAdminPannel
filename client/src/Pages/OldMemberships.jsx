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
import { baseURL } from "./config";
import axios from "axios";
import CatchFunction from "./CatchFunction";
import { useLocation, useNavigate } from "react-router-dom";

const OldMemberships = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState("list");
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [dialogComp, setDialogComp] = React.useState();
  const [OldMember, setOldMember] = React.useState([]);
  const [addData, setAddData] = React.useState({
    firstName: "",
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

  const location = useLocation();
  const navigate = useNavigate();

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
  const filteredRows = OldMember?.filter((row) => {
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

  const onHadelClick = (data, operation) => {
    setIsOpenDialog((isOpenDialog) => !isOpenDialog);
    setDialogComp(<Form data={data} op={operation} />);
    console.log(data + operation);
  };
  const onHadelDelete = (row) => {
    console.log(row);
  };

  const headers = {
    "Content-Type": "application/json",
  };

  React.useEffect(() => {
    getOldMember();
  }, []);

  const getOldMember = async () => {
    try {
      const response = await axios.get(baseURL + "/getAllMember", { headers });
      console.log(response.data.data);

      let data = [];
      if (response.data.data.length > 0) {
        data = await Promise.all(
          response.data.data.map(async (ele) => {
            const imgUrl = await fetchImage(ele.photo);
            return { ...ele, photo: imgUrl };
          })
        );
      }

      setOldMember(data);
    } catch (error) {
      console.log(error);
      CatchFunction(error, navigate, location?.state);
    }
  };

  const fetchImage = async (file) => {
    const imageURL = baseURL.replace("/api/customers", "") + file;
    return imageURL;

    try {
      const response = await axios.get(imageURL, { responseType: "blob" });
      const imgURL = URL.createObjectURL(response.data);
      return imgURL;
    } catch (err) {
      console.error("Error fetching the image:", err);
      CatchFunction(err, navigate, location?.state);
    }
  };

  return (
    <>
      <div className="px-4">
        <div className="cardBox">
          <div className="CardHeader">
            <span className="cardTitle"> All Members</span>
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
            <div className="d-flex justify-content-end ">
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
                  op={"old"}
                />
              </div>
            )}

            {/* Card view */}
            {viewType === "card" && (
              <div className="cardDiv">
                <CustCard
                  filteredRows={filteredRows}
                  onHadelClick={onHadelClick}
                  onHadelDelete={onHadelDelete}
                  op={"old"}
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

export default OldMemberships;
