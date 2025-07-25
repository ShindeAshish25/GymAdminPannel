import React from "react";
import { useState, useRef } from "react";
import { useEffect } from "react";
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { baseURL } from "./config";
import axios from "axios";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DemoUser from "../assets/demoUser.png";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TransitionTop(props) {
  return <Slide {...props} direction="center" />;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Form = (props) => {
  const [open, setOpen] = React.useState(false);
  const [addUpdateViewRecord, setAddUpdateViewRecord] = React.useState(
    props.data
  );
  const [alertMsg, setAlertMsg] = React.useState(false);
  const [warningMessage, setWarningMessage] = React.useState("");
  const [transition, setTransition] = React.useState(undefined);
  const [image, setImage] = React.useState(DemoUser);
  const [printBill, setPrintBill] = React.useState(false);
  const [updateRecord, setUpdateRecord] = React.useState(props.data);

  const [images, setImages] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const headers = {
    "Content-Type": "multipart/form-data",
  };

  useEffect(() => {
    handleClickOpen();
    setImage(props.data.photo);
    // console.log(props.data);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    // setOpen(false);
    props.setIsOpenDialog(false);
  };
  const handleClickOpenBill = () => {
    setPrintBill(true);
  };
  const handleCloseBill = () => {
    setPrintBill(false);
  };

  const onInputChange = (e, field) => {
    let newsearchData = { ...addUpdateViewRecord };

    if (field === "paymentDate") {
      newsearchData.paymentDate = e ? e.format("YYYY-MM-DD") : null; // Handle payment date change
    } else if (field === "joiningDate") {
      newsearchData.joiningDate = e ? e.format("YYYY-MM-DD") : null; // Handle joiningDate date change
    } else if (field === "photo" && e?.target?.files && e.target.files[0]) {
      newsearchData.photo = e.target.files[0];
      const preview = URL.createObjectURL(e.target.files[0]);
      setImage(preview);
      setAddUpdateViewRecord(newsearchData);

      // // Handle image upload
      // const reader = new FileReader();
      // reader.onload = (fileEvent) => {
      //   newsearchData.photo = fileEvent.target.result; // Save the base64 image data
      //   setImage(newsearchData.photo);
      //   setAddUpdateViewRecord(newsearchData);
      //   // console.log(newsearchData); // Log the updated object
      // };
      // reader.readAsDataURL(e.target.files[0]); // Read the selected file as base64
    } else {
      const { name, value } = e.target;
      newsearchData[name] = value; // Preserve all input values

      // Calculate remainingAmount when totalAmount or paidAmount is updated
      if (name === "totalAmount" || name === "paidAmount") {
        const total = parseInt(newsearchData.totalAmount || 0, 10);
        const paid = parseInt(newsearchData.paidAmount || 0, 10);
        newsearchData.remainingAmount = (total - paid).toString();
      }
    }

    // console.log(newsearchData);
    setAddUpdateViewRecord(newsearchData);
  };

  const isNotValid = (field) => {
    return field === "" || field === null || field === undefined;
  };

  const onHandleSave = async (e) => {
    if (isNotValid(addUpdateViewRecord.firstName)) {
      handleClickAlertMsg(TransitionTop, "First Name' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.lastName)) {
      handleClickAlertMsg(TransitionTop, "Last Name' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.mobileNo)) {
      handleClickAlertMsg(TransitionTop, "Mobile No' is missing");
      return;
    }
    //  if (isNotValid(addUpdateViewRecord.email)) {
    //   handleClickAlertMsg(TransitionTop, "Email' is missing");
    //   return;
    // } else
    else if (isNotValid(addUpdateViewRecord.batch)) {
      handleClickAlertMsg(TransitionTop, "Batch' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.memberships)) {
      handleClickAlertMsg(TransitionTop, "Memberships' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.training)) {
      handleClickAlertMsg(TransitionTop, "Training' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.totalAmount)) {
      handleClickAlertMsg(TransitionTop, "Total Amount' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.paidAmount)) {
      handleClickAlertMsg(TransitionTop, "Paid Amount' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.paymentDate)) {
      handleClickAlertMsg(TransitionTop, "Payment Date' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.joiningDate)) {
      handleClickAlertMsg(TransitionTop, "Joining  Date' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.address)) {
      handleClickAlertMsg(TransitionTop, "Addresses' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.paymentMode)) {
      handleClickAlertMsg(TransitionTop, "Payment Mode' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.gender)) {
      handleClickAlertMsg(TransitionTop, "Gender' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.photo)) {
      handleClickAlertMsg(TransitionTop, "Photo' is missing");
      return;
    }

    //Api call - add

    const data = new FormData();
    for (const key in addUpdateViewRecord) {
      data.append(key, addUpdateViewRecord[key]);
    }

    await axios
      .post(baseURL + "/addCust", data)
      .then((response) => {
        // console.log(response.data);
        if (response.data.status == true) {
          // handleClickAlertMsg(TransitionTop, response.data.message);
          Swal.fire({
            title: "Success",
            icon: "success",
            text: response.data.message,
            draggable: true,
            timer: 2000,
          });
          setOpen(false);
          props.setIsOpenDialog(false);
          props.getActiveCustomer();
          // setPrintBill(true);
        } else if (response.data.status == false) {
          Swal.fire({
            title: "error",
            icon: "Oppss..",
            text: response.data.message,
            draggable: true,
            timer: 2000,
          });
          handleClickAlertMsg(TransitionTop, response.data.message);
          setOpen(false);
          props.setIsOpenDialog(false);
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
          handleClickAlertMsg(TransitionTop, err.message);
        }
      });
  };

  const onHandleUpdate = async (e) => {
    if (isNotValid(addUpdateViewRecord.firstName)) {
      handleClickAlertMsg(TransitionTop, "First Name' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.lastName)) {
      handleClickAlertMsg(TransitionTop, "Last Name' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.mobileNo)) {
      handleClickAlertMsg(TransitionTop, "Mobile No' is missing");
      return;
    }
    // if (isNotValid(addUpdateViewRecord.email)) {
    //   handleClickAlertMsg(TransitionTop, "Email' is missing");
    //   return;
    // } else
    else if (isNotValid(addUpdateViewRecord.batch)) {
      handleClickAlertMsg(TransitionTop, "Batch' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.memberships)) {
      handleClickAlertMsg(TransitionTop, "Memberships' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.training)) {
      handleClickAlertMsg(TransitionTop, "Training' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.totalAmount)) {
      handleClickAlertMsg(TransitionTop, "Total Amount' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.paidAmount)) {
      handleClickAlertMsg(TransitionTop, "Paid Amount' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.paymentDate)) {
      handleClickAlertMsg(TransitionTop, "Payment Date' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.joiningDate)) {
      handleClickAlertMsg(TransitionTop, "Joining  Date' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.address)) {
      handleClickAlertMsg(TransitionTop, "Addresses' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.paymentMode)) {
      handleClickAlertMsg(TransitionTop, "Payment Mode' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.gender)) {
      handleClickAlertMsg(TransitionTop, "Gender' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.photo)) {
      handleClickAlertMsg(TransitionTop, "Photo' is missing");
      return;
    }
    //Api call - update

    const data = new FormData();
    for (const key in addUpdateViewRecord) {
      if (key !== "photo") {
        data.append(key, addUpdateViewRecord[key]);
      } else if (key === "photo" && addUpdateViewRecord[key] instanceof File) {
        data.append(key, addUpdateViewRecord[key]);
      }
    }

    await axios
      .post(baseURL + "/updateCust", data, { headers })
      .then((response) => {
        // console.log(response.data);
        if (response.data.status) {
          // handleClickAlertMsg(TransitionTop, response.data.message);
          Swal.fire({
            title: "Success",
            icon: "success",
            text: response.data.message,
            draggable: true,
            timer: 2000,
          });
          setOpen(false);
          props.setIsOpenDialog(false);
          // console.log(
          //   "*****************************************555555555555555555555555555555"
          // );
          props.getActiveCustomer();
          // console.log(
          //   "*****************************************7777777777777777777777777777"
          // );
          // setPrintBill(true);
        } else {
          Swal.fire({
            title: "Oppss...",
            icon: "error",
            text: response.data.message,
            draggable: true,
            timer: 2000,
          });
          // handleClickAlertMsg(TransitionTop, response.data.message);
          setOpen(false);
          props.setIsOpenDialog(false);
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          console.log("Conflict: The customer might already exist.");
          handleClickAlertMsg(
            TransitionTop,
            "Conflict: Customer already exists."
          );
        } else if (err.response.status === 413) {
          console.log("Conflict: The customer might already exist.");
          alert("Conflict: Photo size large.");
          w;
          handleClickAlertMsg(TransitionTop, "Conflict: Photo size large.");
        } else {
          console.log(err);
          handleClickAlertMsg(TransitionTop, err.message);
        }
      });
  };

  const onHandleRenew = async (e) => {
    if (isNotValid(addUpdateViewRecord.batch)) {
      handleClickAlertMsg(TransitionTop, "Batch' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.memberships)) {
      handleClickAlertMsg(TransitionTop, "Memberships' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.totalAmount)) {
      handleClickAlertMsg(TransitionTop, "Total Amount' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.paidAmount)) {
      handleClickAlertMsg(TransitionTop, "Total Amount' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.totalAmount)) {
      handleClickAlertMsg(TransitionTop, "Paid Amount' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.paymentDate)) {
      handleClickAlertMsg(TransitionTop, "Payment Date' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.joiningDate)) {
      handleClickAlertMsg(TransitionTop, "Joining Date' is missing");
      return;
    } else if (isNotValid(addUpdateViewRecord.paymentMode)) {
      handleClickAlertMsg(TransitionTop, "Payment Mode' is missing");
      return;
    }

    //Api call - ReNew

    const renewMembership = {
      custId: addUpdateViewRecord.custId,
      paymentDate: addUpdateViewRecord.paymentDate,
      payableAmpunt: addUpdateViewRecord.payableAmpunt,
      totalAmount: addUpdateViewRecord.totalAmount,
      remainingAmount: addUpdateViewRecord.remainingAmount,
      memberships: addUpdateViewRecord.memberships,
      batch: addUpdateViewRecord.batch,
    };

    // const data = new FormData();
    // for (const key in addUpdateViewRecord) {
    //   if (key !== "photo") {
    //     data.append(key, addUpdateViewRecord[key]);
    //   } else if (key === 'photo' && (addUpdateViewRecord[key] instanceof File)) {
    //     data.append(key, addUpdateViewRecord[key]);
    //   }
    // }

    await axios
      .post(baseURL + "/renewMemberShip", renewMembership)
      .then((response) => {
        console.log(response.data);
        if (response.data.status == true) {
          // handleClickAlertMsg(TransitionTop, response.data.message);
          Swal.fire({
            title: "Success",
            icon: "success",
            text: response.data.message,
            draggable: true,
            timer: 2000,
          });
          setOpen(false);
          props.getAllMembers();
          props.getActiveCustomer();
          props.setIsOpenDialog(false);
        } else {
          Swal.fire({
            title: "Oops...",
            icon: "error",
            text: response.data.message,
            draggable: true,
            timer: 2000,
          });
          // handleClickAlertMsg(TransitionTop, response.data.message);
          setOpen(false);
          props.setIsOpenDialog(false);
        }
      })
      .catch((err) => {
        console.log(err);
        handleClickAlertMsg(TransitionTop, err.message);
      });
  };

  const handleClickAlertMsg = (Transition, warnMsg) => {
    setAlertMsg(true);
    setWarningMessage(warnMsg);
    setTransition(() => Transition);
  };

  const handleClickAlertMsgClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertMsg(false);
  };

  // -------------------------------------------------------

  const openCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      handleClickAlertMsg(
        TransitionTop,
        "Camera is not supported on this device or browser."
      );
      // alert("Camera is not supported on this device or browser.");
      return;
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
      setShowCamera(true); // The videoRef will be available after this re-render
    } catch (err) {
      console.error("Error accessing camera:", err);
      // alert(`Camera access failed: ${err.name} - ${err.message}`);
      handleClickAlertMsg(
        TransitionTop,
        `Camera access failed: ${err.name} - ${err.message}`
      );
    }
  };

  useEffect(() => {
    if (showCamera && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [showCamera, stream]);

  useEffect(() => {
    if (showCamera && stream) {
      console.log("Assigning stream to video");
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      } else {
        console.warn("videoRef.current is null");
      }
    }
  }, [showCamera, stream]);

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");

    ctx.translate(canvas.width, 0); // move to right edge
    ctx.scale(-1, 1); // flip horizontally
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataURL = canvas.toDataURL("image/jpeg");

    // Convert base64 to file object if needed
    fetch(imageDataURL)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "captured.jpg", { type: "image/jpeg" });
        const newsearchData = { ...addUpdateViewRecord, photo: file };
        setAddUpdateViewRecord(newsearchData);
        setImage(imageDataURL);
      });

    closeCamera();
  };

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setShowCamera(false);
  };
  // -------------------------------------------------------

  if (props.op == "New") {
    return (
      <>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          TransitionComponent={Transition}
          maxWidth="lg"
        >
          <DialogTitle
            sx={{ m: 0, p: 2 }}
            className="modalHeader"
            id="customized-dialog-title"
          >
            Add New Customer
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: "#ffff",
            })}
            className="closeIcon"
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <div className="row g-4 p-3">
              {/* <div className="col-md-12">
                <div className="avatar-upload">
                  <div className="avatar-edit">
                    <input
                      type="file"
                      id="imageUpload"
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => onInputChange(e, "photo")}
                    />
                    <label htmlFor="imageUpload">
                      {" "}
                      <EditIcon />
                    </label>
                  </div>
                  <div className="avatar-preview">
                    <div
                      id="imagePreview"
                      style={{ backgroundImage: `url(${image})` }}
                    ></div>
                  </div>
                </div>
              </div> */}

              <div className="col-md-12">
                <div className="avatar-upload">
                  <div className="avatar-edit">
                    {/* Upload button */}
                    <input
                      type="file"
                      id="imageUpload"
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => onInputChange(e, "photo")}
                      style={{ display: "none" }}
                    />
                    <label htmlFor="imageUpload" title="Upload Photo">
                      <EditIcon />
                    </label>

                    {/* Camera button */}
                    <button
                      type="button"
                      title="Capture Photo"
                      className="camera-icon"
                      onClick={openCamera}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        marginLeft: "10px",
                      }}
                    >
                      📷
                    </button>
                  </div>

                  <div className="avatar-preview">
                    <div
                      id="imagePreview"
                      style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    {/* Video for camera stream */}
                    {showCamera && (
                      <div className="camera-modal-overlay">
                        <div className="camera-modal-content">
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="camera-video"
                          />
                          <div className="camera-btns">
                            <button
                              className="btn capture-btn"
                              onClick={capturePhoto}
                            >
                              📸 Capture
                            </button>
                            <button
                              className="btn cancel-btn"
                              onClick={closeCamera}
                            >
                              ❌ Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  name="firstName"
                  fullWidth
                  inputProps={{
                    maxLength: 15,
                  }}
                  onKeyPress={(e) => {
                    if (!/^[a-zA-Z]$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  fullWidth
                  inputProps={{
                    maxLength: 15,
                  }}
                  onKeyPress={(e) => {
                    if (!/^[a-zA-Z]$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Mobile No"
                  variant="outlined"
                  name="mobileNo"
                  inputProps={{
                    maxLength: 10,
                  }}
                  onKeyPress={(e) => {
                    if (!/^\d$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                />
              </div>
              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name="email"
                  // inputProps={{
                  //   maxLength: 25,
                  // }}
                  fullWidth
                  onChange={(e) => {
                    const email = e.target.value;
                    const emailRegex =
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    if (emailRegex.test(email)) {
                      onInputChange(e); // Valid email
                    }
                  }}
                />
              </div>
              <div className="datepickerClassForBlackColor d-flex col-md-3 pe-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      className="w-100"
                      label="Joining Date"
                      name="joiningDate"
                      value={dayjs(
                        addUpdateViewRecord?.joiningDate,
                        "YYYY-MM-DD"
                      )}
                      slotProps={{
                        textField: {
                          error: false,
                        },
                      }}
                      format="DD-MM-YYYY" // Ensuring the DatePicker uses this format
                      onChange={(value) => onInputChange(value, "joiningDate")}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="datepickerClassForBlackColor d-flex col-md-3 pe-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      className="w-100"
                      label="Payment Date"
                      name="paymentDate"
                      value={dayjs(
                        addUpdateViewRecord?.paymentDate,
                        "YYYY-MM-DD"
                      )}
                      slotProps={{
                        textField: {
                          error: false,
                          // Ensure the date format is explicitly set here
                          inputProps: {
                            format: "DD-MM-YYYY",
                          },
                        },
                      }}
                      format="DD-MM-YYYY" // Ensuring the DatePicker uses this format
                      onChange={(value) => onInputChange(value, "paymentDate")}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              <div className="col-md-3">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Batch</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    name="batch"
                    id="demo-simple-select"
                    // value={addData}
                    label="Batch"
                    onChange={(e) => onInputChange(e)}
                  >
                    <MenuItem value="M">Morning</MenuItem>
                    <MenuItem value="E">Evening</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="col-md-3">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Memberships
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="memberships"
                    // value={addData}
                    label="Memberships"
                    onChange={(e) => onInputChange(e)}
                  >
                    <MenuItem value={"1"}>1 Month</MenuItem>
                    <MenuItem value={"2"}>2 Month</MenuItem>
                    <MenuItem value={"3"}>3 Month</MenuItem>
                    <MenuItem value={"4"}>4 Month</MenuItem>
                    <MenuItem value={"5"}>5 Month</MenuItem>
                    <MenuItem value={"6"}>6 Month</MenuItem>
                    <MenuItem value={"7"}>7 Month</MenuItem>
                    <MenuItem value={"8"}>8 Month</MenuItem>
                    <MenuItem value={"9"}>9 Month</MenuItem>
                    <MenuItem value={"10"}>10 Month</MenuItem>
                    <MenuItem value={"11"}>11 Month</MenuItem>
                    <MenuItem value={"12"}>12 Month</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-3">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Training
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="training"
                    // value={addData}
                    label="Training"
                    onChange={(e) => onInputChange(e)}
                  >
                    <MenuItem value={"Cardio"}>Cardio</MenuItem>
                    <MenuItem value={"Strength"}>Strength Training</MenuItem>
                    <MenuItem value={"Personal"}>Personal Training</MenuItem>
                    <MenuItem value={"Core"}>Core Workouts</MenuItem>
                    <MenuItem value={"WeightLoss"}>Weight Loss</MenuItem>
                    <MenuItem value={"Flexibility"}>
                      Flexibility and Mobility
                    </MenuItem>
                    <MenuItem value={"HIIT"}>
                      HIIT (High-Intensity Interval Training)
                    </MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Total Amount"
                  variant="outlined"
                  name="totalAmount"
                  inputProps={{
                    maxLength: 5,
                  }}
                  onKeyPress={(e) => {
                    if (!/^\d$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                />
              </div>
              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Paid Amount"
                  variant="outlined"
                  name="paidAmount"
                  inputProps={{
                    maxLength: 5,
                  }}
                  onKeyPress={(e) => {
                    if (!/^\d$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                />
              </div>
              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Remaining Amount"
                  variant="outlined"
                  name="remainingAmount"
                  value={addUpdateViewRecord.remainingAmount || "0"}
                  onKeyPress={(e) => {
                    if (!/^\d$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                  disabled
                />
              </div>

              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  label="Addresses"
                  variant="outlined"
                  name="address"
                  inputProps={{
                    maxLength: 50,
                  }}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                />
              </div>

              <div className="col-md-3">
                <FormControl>
                  <FormLabel id="payment-mode">Payment Mode</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="payment-mode"
                    name="paymentMode"
                    onChange={(e) => onInputChange(e)}
                  >
                    <FormControlLabel
                      value="UPI"
                      control={<Radio />}
                      label="UPI"
                    />
                    <FormControlLabel
                      value="Cash"
                      control={<Radio />}
                      label="Cash"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="col-md-3">
                <FormControl>
                  <FormLabel id="gender">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="gender"
                    name="gender"
                    onChange={(e) => onInputChange(e)}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={onHandleSave}
              variant="outlined"
              startIcon={<PersonAddAlt1Icon />}
            >
              Save Record
            </Button>
          </DialogActions>
        </BootstrapDialog>
        <Snackbar
          open={alertMsg}
          autoHideDuration={3000}
          onClose={handleClickAlertMsgClose}
          TransitionComponent={transition}
          key={transition ? transition.name : ""}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClickAlertMsgClose}
            severity="warning"
            sx={{ width: "100%", marginTop: "8px", fontWeight: "bold" }}
          >
            {warningMessage}
          </Alert>
        </Snackbar>

        <Modal
          open={printBill}
          maxWidth="lg"
          onClose={handleCloseBill}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="alertCard"
        >
          <Box sx={style}>
            <Typography id="modal-modal-description">
              <div className="row">
                <div className="col-md-12 ">
                  <img src={addUpdateViewRecord.image} alt="" />
                </div>
                <div className="col-md-12">
                  <Typography className="mb-3" id="modal-modal-title">
                    <b>Name : </b> {addUpdateViewRecord.firstName}
                    {addUpdateViewRecord.lastName} <br />
                    <b>Mobile No : </b> {addUpdateViewRecord.mobileNo}
                    <br />
                    <b>Email ID : </b> {addUpdateViewRecord.email}
                    <br />
                    <b>Joining Date : </b> {addUpdateViewRecord.joiningDate}
                    <br />
                    <b>Batch : </b> {addUpdateViewRecord.batch}
                    <br />
                    <b>Address : </b> {addUpdateViewRecord.address}
                    <br />
                    <b>Memberships : </b> {addUpdateViewRecord.memberships}
                    <br />
                    <b>Training : </b> {addUpdateViewRecord.training}
                    <br />
                    <b>Total Amount: </b> {addUpdateViewRecord.totalAmount}
                    <br />
                    <b>Remaining Amount: </b>{" "}
                    {addUpdateViewRecord.remainingAmount}
                    <br />
                    <b>Pament Mode: </b> {addUpdateViewRecord.paymentMode}
                    <br />
                    <b>Pament Date: </b> {addUpdateViewRecord.paymentDate}
                    <br />
                  </Typography>

                  <div className="text-end mt-3">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleCloseBill}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </Typography>
          </Box>
        </Modal>
      </>
    );
  } else if (props.op == "Update") {
    return (
      <>
        <Snackbar
          open={alertMsg}
          autoHideDuration={3000}
          onClose={handleClickAlertMsgClose}
          TransitionComponent={transition}
          key={transition ? transition.name : ""}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClickAlertMsgClose}
            severity="warning"
            sx={{ width: "100%", marginTop: "8px", fontWeight: "bold" }}
          >
            {warningMessage}
          </Alert>
        </Snackbar>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={props.isOpenDialog}
          TransitionComponent={Transition}
          maxWidth="lg"
        >
          <DialogTitle
            sx={{ m: 0, p: 2 }}
            className="modalHeader"
            id="customized-dialog-title"
          >
            Update Customer
          </DialogTitle>
          <IconButton
            className="closeIcon"
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: "#ffff",
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <div className="row g-4 p-3">
              {/* <div className="col-md-12">
                <div className="avatar-upload">
                  <div className="avatar-edit">
                    <input
                      type="file"
                      id="imageUpload"
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => onInputChange(e, "photo")}
                    />
                    <label htmlFor="imageUpload">
                      {" "}
                      <EditIcon />
                    </label>
                  </div>
                  <div className="avatar-preview">
                    <div
                      id="imagePreview"
                      style={{
                        backgroundImage: image
                          ? `url(${image})`
                          : addUpdateViewRecord.photo
                            ? `url(${addUpdateViewRecord.photo})`
                            : "none",
                      }}
                    ></div>
                  </div>
                </div>
              </div> */}

              <div className="col-md-12">
                <div className="avatar-upload">
                  <div className="avatar-edit">
                    {/* Upload button */}
                    <input
                      type="file"
                      id="imageUpload"
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => onInputChange(e, "photo")}
                      style={{ display: "none" }}
                    />
                    <label htmlFor="imageUpload" title="Upload Photo">
                      <EditIcon />
                    </label>

                    {/* Camera button */}
                    <button
                      type="button"
                      title="Capture Photo"
                      className="camera-icon"
                      onClick={openCamera}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        marginLeft: "10px",
                      }}
                    >
                      📷
                    </button>
                  </div>

                  <div className="avatar-preview">
                    <div
                      id="imagePreview"
                      style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    {/* Video for camera stream */}
                    {showCamera && (
                      <div className="camera-modal-overlay">
                        <div className="camera-modal-content">
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="camera-video"
                          />
                          <div className="camera-btns">
                            <button
                              className="btn capture-btn"
                              onClick={capturePhoto}
                            >
                              📸 Capture
                            </button>
                            <button
                              className="btn cancel-btn"
                              onClick={closeCamera}
                            >
                              ❌ Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  name="firstName"
                  value={addUpdateViewRecord.firstName || ""}
                  fullWidth
                  inputProps={{
                    maxLength: 15,
                  }}
                  onKeyPress={(e) => {
                    if (!/^[a-zA-Z]$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  value={addUpdateViewRecord.lastName || ""}
                  fullWidth
                  inputProps={{
                    maxLength: 15,
                  }}
                  onKeyPress={(e) => {
                    if (!/^[a-zA-Z]$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Mobile No"
                  variant="outlined"
                  name="mobileNo"
                  value={addUpdateViewRecord.mobileNo || ""}
                  inputProps={{
                    maxLength: 12,
                  }}
                  onKeyPress={(e) => {
                    if (!/^\d$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                />
              </div>
              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={addUpdateViewRecord.email || ""}
                  // inputProps={{
                  //   maxLength: 25,
                  // }}
                  fullWidth
                  onChange={(e) => {
                    const email = e.target.value;
                    const emailRegex =
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    if (emailRegex.test(email)) {
                      e.preventDefault();
                    }
                    onInputChange(e); // Valid email
                  }}
                />
              </div>
              <div className="datepickerClassForBlackColor d-flex col-md-3 pe-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      className="w-100"
                      label="Joining Date"
                      name="joiningDate"
                      value={
                        dayjs(addUpdateViewRecord?.joiningDate, "YYYY-MM-DD")
                        // dayjs(
                        //   addUpdateViewRecord?.joiningDate || null
                        // ).isValid()
                        //   ? dayjs(
                        //       addUpdateViewRecord?.joiningDate,
                        //       "DD-MM-YYYY"
                        //     )
                        //   : null
                      } // Ensure the value is properly formatted
                      slotProps={{
                        textField: {
                          error: false,
                        },
                      }}
                      format="DD-MM-YYYY" // Ensuring the DatePicker uses this format
                      onChange={(value) => onInputChange(value, "joiningDate")}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="datepickerClassForBlackColor d-flex col-md-3 pe-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      className="w-100"
                      label="Payment Date"
                      name="paymentDate"
                      value={dayjs(
                        addUpdateViewRecord?.paymentDate,
                        "YYYY-MM-DD"
                      )}
                      slotProps={{
                        textField: {
                          error: false,
                          // Ensure the date format is explicitly set here
                          inputProps: {
                            format: "DD-MM-YYYY",
                          },
                        },
                      }}
                      format="DD-MM-YYYY" // Ensuring the DatePicker uses this format
                      onChange={(value) => onInputChange(value, "paymentDate")}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="col-md-3">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Batch</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    name="batch"
                    id="demo-simple-select"
                    value={addUpdateViewRecord.batch || ""}
                    label="Batch"
                    onChange={(e) => onInputChange(e)}
                  >
                    <MenuItem value="M">Morning</MenuItem>
                    <MenuItem value="E">Evening</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-3">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Memberships
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="memberships"
                    value={addUpdateViewRecord.memberships || ""}
                    label="Memberships"
                    onChange={(e) => onInputChange(e)}
                  >
                    <MenuItem value={"1"}>1 Month</MenuItem>
                    <MenuItem value={"2"}>2 Month</MenuItem>
                    <MenuItem value={"3"}>3 Month</MenuItem>
                    <MenuItem value={"4"}>4 Month</MenuItem>
                    <MenuItem value={"5"}>5 Month</MenuItem>
                    <MenuItem value={"6"}>6 Month</MenuItem>
                    <MenuItem value={"7"}>7 Month</MenuItem>
                    <MenuItem value={"8"}>8 Month</MenuItem>
                    <MenuItem value={"9"}>9 Month</MenuItem>
                    <MenuItem value={"10"}>10 Month</MenuItem>
                    <MenuItem value={"11"}>11 Month</MenuItem>
                    <MenuItem value={"12"}>12 Month</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-3">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Training
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="training"
                    value={addUpdateViewRecord.training || ""}
                    label="Training"
                    onChange={(e) => onInputChange(e)}
                  >
                    <MenuItem value={"Cardio"}>Cardio</MenuItem>
                    <MenuItem value={"Strength"}>Strength Training</MenuItem>
                    <MenuItem value={"Personal"}>Personal Training</MenuItem>
                    <MenuItem value={"Core"}>Core Workouts</MenuItem>
                    <MenuItem value={"WeightLoss"}>Weight Loss</MenuItem>
                    <MenuItem value={"Flexibility"}>
                      Flexibility and Mobility
                    </MenuItem>
                    <MenuItem value={"HIIT"}>
                      HIIT (High-Intensity Interval Training)
                    </MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Total Amount"
                  variant="outlined"
                  name="totalAmount"
                  value={addUpdateViewRecord.totalAmount || ""}
                  inputProps={{
                    maxLength: 5,
                  }}
                  onKeyPress={(e) => {
                    if (!/^\d$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                />
              </div>
              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Paid Amount"
                  variant="outlined"
                  name="paidAmount"
                  value={addUpdateViewRecord.paidAmount || ""}
                  inputProps={{
                    maxLength: 5,
                  }}
                  onKeyPress={(e) => {
                    if (!/^\d$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                />
              </div>
              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Remaining Amount"
                  variant="outlined"
                  name="remainingAmount"
                  value={addUpdateViewRecord.remainingAmount || ""}
                  onKeyPress={(e) => {
                    if (!/^\d$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                  disabled
                />
              </div>
              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  label="Addresses"
                  variant="outlined"
                  name="address"
                  value={addUpdateViewRecord.address || ""}
                  inputProps={{
                    maxLength: 50,
                  }}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                />
              </div>
              <div className="col-md-3">
                <FormControl>
                  <FormLabel id="payment-mode">Payment Mode</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="payment-mode"
                    name="paymentMode"
                    onChange={(e) => onInputChange(e)}
                    value={addUpdateViewRecord.paymentMode || ""}
                  >
                    <FormControlLabel
                      value="UPI"
                      control={<Radio />}
                      label="UPI"
                    />
                    <FormControlLabel
                      value="Cash"
                      control={<Radio />}
                      label="Cash"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="col-md-3">
                <FormControl>
                  <FormLabel id="gender">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="gender"
                    name="gender"
                    onChange={(e) => onInputChange(e)}
                    value={addUpdateViewRecord.gender || ""}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={onHandleUpdate}
              variant="outlined"
              startIcon={<AutoFixHighIcon />}
            >
              Update Record
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </>
    );
  } else if (props.op == "Renewal") {
    return (
      <>
        <Snackbar
          open={alertMsg}
          autoHideDuration={3000}
          onClose={handleClickAlertMsgClose}
          TransitionComponent={transition}
          key={transition ? transition.name : ""}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClickAlertMsgClose}
            severity="warning"
            sx={{ width: "100%", marginTop: "8px", fontWeight: "bold" }}
          >
            {warningMessage}
          </Alert>
        </Snackbar>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          TransitionComponent={Transition}
          maxWidth="lg"
        >
          <DialogTitle
            sx={{ m: 0, p: 2 }}
            className="modalHeader"
            id="customized-dialog-title"
          >
            Renewal Memberships
          </DialogTitle>
          <IconButton
            className="closeIcon"
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: "#ffff",
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <div className="row g-4 p-3">
              <div className="col-md-12">
                <div className="avatar-upload">
                  <div className="avatar-edit">
                    <input
                      type="file"
                      id="imageUpload"
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => onInputChange(e, "photo")}
                      disabled
                    />
                    <label htmlFor="imageUpload">
                      {" "}
                      <EditIcon disabled />
                    </label>
                  </div>
                  <div className="avatar-preview">
                    <div
                      id="imagePreview"
                      style={{
                        backgroundImage: addUpdateViewRecord.photo
                          ? `url(${addUpdateViewRecord.photo})`
                          : "none",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Frist Name"
                  variant="outlined"
                  name="firstName"
                  value={addUpdateViewRecord.firstName || ""}
                  disabled
                  fullWidth
                  inputProps={{
                    maxLength: 15,
                  }}
                  onKeyPress={(e) => {
                    if (!/^[a-zA-Z]$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  value={addUpdateViewRecord.lastName || ""}
                  disabled
                  fullWidth
                  inputProps={{
                    maxLength: 15,
                  }}
                  onKeyPress={(e) => {
                    if (!/^[a-zA-Z]$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Mobile No"
                  variant="outlined"
                  name="mobileNo"
                  value={addUpdateViewRecord.mobileNo || ""}
                  disabled
                  inputProps={{
                    maxLength: 10,
                  }}
                  onKeyPress={(e) => {
                    if (!/^\d$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                />
              </div>
              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={addUpdateViewRecord.email || ""}
                  disabled
                  // inputProps={{
                  //   maxLength: 25,
                  // }}
                  fullWidth
                  onChange={(e) => {
                    const email = e.target.value;
                    const emailRegex =
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    if (emailRegex.test(email)) {
                      onInputChange(e); // Valid email
                    }
                  }}
                />
              </div>
              <div className="datepickerClassForBlackColor d-flex col-md-3 pe-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      className="w-100"
                      label="Joining Date"
                      name="joiningDate"
                      disabled
                      value={dayjs(
                        addUpdateViewRecord?.joiningDate,
                        "YYYY-MM-DD"
                      )}
                      slotProps={{
                        textField: {
                          error: false,
                        },
                      }}
                      format="DD-MM-YYYY" // Ensuring the DatePicker uses this format
                      onChange={(value) => onInputChange(value, "joiningDate")}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="datepickerClassForBlackColor d-flex col-md-3 pe-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      className="w-100"
                      label="Payment Date"
                      name="paymentDate"
                      value={dayjs(
                        addUpdateViewRecord?.paymentDate,
                        "YYYY-MM-DD"
                      )}
                      slotProps={{
                        textField: {
                          error: false,
                          // Ensure the date format is explicitly set here
                          inputProps: {
                            format: "DD-MM-YYYY",
                          },
                        },
                      }}
                      format="DD-MM-YYYY" // Ensuring the DatePicker uses this format
                      onChange={(value) => onInputChange(value, "paymentDate")}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="col-md-3">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Batch</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    name="batch"
                    id="demo-simple-select"
                    value={addUpdateViewRecord.batch || ""}
                    label="Batch"
                    onChange={(e) => onInputChange(e)}
                  >
                    <MenuItem value="M">Morning</MenuItem>
                    <MenuItem value="E">Evening</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-3">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Memberships
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="memberships"
                    value={addUpdateViewRecord.memberships || ""}
                    label="Memberships"
                    onChange={(e) => onInputChange(e)}
                  >
                    <MenuItem value={"1"}>1 Month</MenuItem>
                    <MenuItem value={"2"}>2 Month</MenuItem>
                    <MenuItem value={"3"}>3 Month</MenuItem>
                    <MenuItem value={"4"}>4 Month</MenuItem>
                    <MenuItem value={"5"}>5 Month</MenuItem>
                    <MenuItem value={"6"}>6 Month</MenuItem>
                    <MenuItem value={"7"}>7 Month</MenuItem>
                    <MenuItem value={"8"}>8 Month</MenuItem>
                    <MenuItem value={"9"}>9 Month</MenuItem>
                    <MenuItem value={"10"}>10 Month</MenuItem>
                    <MenuItem value={"11"}>11 Month</MenuItem>
                    <MenuItem value={"12"}>12 Month</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-3">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Training
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="training"
                    value={addUpdateViewRecord.training || ""}
                    label="Training"
                    onChange={(e) => onInputChange(e)}
                  >
                    <MenuItem value={"Cardio"}>Cardio</MenuItem>
                    <MenuItem value={"Strength"}>Strength Training</MenuItem>
                    <MenuItem value={"Personal"}>Personal Training</MenuItem>
                    <MenuItem value={"Core"}>Core Workouts</MenuItem>
                    <MenuItem value={"WeightLoss"}>Weight Loss</MenuItem>
                    <MenuItem value={"Flexibility"}>
                      Flexibility and Mobility
                    </MenuItem>
                    <MenuItem value={"HIIT"}>
                      HIIT (High-Intensity Interval Training)
                    </MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Total Amount"
                  variant="outlined"
                  name="totalAmount"
                  value={addUpdateViewRecord.totalAmount || ""}
                  inputProps={{
                    maxLength: 5,
                  }}
                  onKeyPress={(e) => {
                    if (!/^\d$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                />
              </div>
              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Paid Amount"
                  variant="outlined"
                  name="paidAmount"
                  value={addUpdateViewRecord.paidAmount || ""}
                  inputProps={{
                    maxLength: 5,
                  }}
                  onKeyPress={(e) => {
                    if (!/^\d$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                />
              </div>
              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Remaining Amount"
                  variant="outlined"
                  name="remainingAmount"
                  value={addUpdateViewRecord.remainingAmount || ""}
                  onKeyPress={(e) => {
                    if (!/^\d$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                  disabled
                />
              </div>
              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  label="Addresses"
                  variant="outlined"
                  name="address"
                  value={addUpdateViewRecord.address || ""}
                  inputProps={{
                    maxLength: 50,
                  }}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                  disabled
                />
              </div>
              <div className="col-md-3">
                <FormControl>
                  <FormLabel id="payment-mode">Payment Mode</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="payment-mode"
                    name="paymentMode"
                    onChange={(e) => onInputChange(e)}
                    value={addUpdateViewRecord.paymentMode || ""}
                  >
                    <FormControlLabel
                      value="UPI"
                      control={<Radio />}
                      label="UPI"
                    />
                    <FormControlLabel
                      value="Cash"
                      control={<Radio />}
                      label="Cash"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="col-md-3">
                <FormControl>
                  <FormLabel id="gender">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="gender"
                    name="gender"
                    onChange={(e) => onInputChange(e)}
                    value={addUpdateViewRecord.gender || ""}
                    disabled
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={onHandleRenew}
              variant="outlined"
              startIcon={<AutorenewIcon />}
            >
              Renewal Memberships
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </>
    );
  }
};

export default Form;
