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
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  let [addUpdateViewRecord, setAddUpdateViewRecord] = React.useState({
    ...props.data,
  });
  const [alertMsg, setAlertMsg] = React.useState(false);
  const [warningMessage, setWarningMessage] = React.useState("");
  const [transition, setTransition] = React.useState(undefined);
  const [image, setImage] = React.useState(
    "https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-622.jpg?semt=ais_hybrid"
  );

  // console.log(addUpdateViewRecord);
  // console.log(props.op);

  const headers = {
    "Content-Type": "application/json",
  };

  useEffect(() => {
    handleClickOpen();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onInputChanges = (e) => {
    const { name, value } = e.target;

    // Update the specific field in the state
    setAddUpdateViewRecord((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Calculate the remaining amount based on the updated values
    const total =
      name === "totalAmount"
        ? parseFloat(value) || 0
        : parseFloat(addUpdateViewRecord.totalAmount) || 0;
    const payable =
      name === "payableAmount"
        ? parseFloat(value) || 0
        : parseFloat(addUpdateViewRecord.payableAmount) || 0;
    const remaining = total - payable;

    if (total > payable && remaining >= 0) {
      setAddUpdateViewRecord((prevState) => ({
        ...prevState,
        remainingAmount: remaining.toString(),
      }));
    } else {
      // Optional: Show an alert or reset invalid input
      if (total <= payable) {
        alert("Total Amount must be greater than Payable Amount.");
        return;
      } else if (remaining < 0) {
        alert("Remaining Amount cannot be negative.");
      }
      // setAddUpdateViewRecord((prevState) => ({
      //   ...prevState,
      //   remainingAmount: "0",
      // }));
    }

    // Update the remainingAmount field
    setAddUpdateViewRecord((prevState) => ({
      ...prevState,
      remainingAmount: remaining.toString(),
    }));
  };

  // const onInputChange = (value, field) => {
  //   let newsearchData = { ...addUpdateViewRecord };

  //   if (field === "paymentDate") {
  //     newsearchData.paymentDate = value ? value.format("DD-MM-YYYY") : null;
  //   } else {
  //     const trimmedValue = value?.target?.value;
  //     newsearchData = {
  //       ...addUpdateViewRecord,
  //       [value?.target?.name]: trimmedValue,
  //     };
  //   }

  //   console.log(newsearchData);
  //   setAddUpdateViewRecord(newsearchData);
  // };

  const onInputChange = (e, field) => {
    let newsearchData = { ...addUpdateViewRecord };

    if (field === "paymentDate") {
      // Handle payment date change
      newsearchData.paymentDate = e ? e.format("DD-MM-YYYY") : null;
    } else if (field === "joiningDate") {
      // Handle joiningDate date change
      newsearchData.joiningDate = e ? e.format("DD-MM-YYYY") : null;
    } else if (field === "photo" && e?.target?.files && e.target.files[0]) {
      // Handle image upload
      const reader = new FileReader();
      reader.onload = (fileEvent) => {
        newsearchData.photo = fileEvent.target.result; // Save the base64 image data
        setImage(newsearchData.photo);
        setAddUpdateViewRecord(newsearchData);
        // console.log(newsearchData); // Log the updated object
      };
      reader.readAsDataURL(e.target.files[0]); // Read the selected file as base64
    } else {
      // Handle other input fields
      const trimmedValue = e?.target?.value;
      newsearchData = {
        ...addUpdateViewRecord,
        [e?.target?.name]: trimmedValue,
      };
    }

    // console.log(newsearchData);
    setAddUpdateViewRecord(newsearchData);
  };

  const onHanddelSave = async (e) => {
    if (
      addUpdateViewRecord.firstName === "" ||
      addUpdateViewRecord.firstName === null ||
      addUpdateViewRecord.firstName === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "First Name' is missing");
      return;
      return;
    } else if (
      addUpdateViewRecord.lastName === "" ||
      addUpdateViewRecord.lastName === null ||
      addUpdateViewRecord.lastName === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Last Name' is missing");
      return;
      return;
    } else if (
      addUpdateViewRecord.mobileNo === "" ||
      addUpdateViewRecord.mobileNo === null ||
      addUpdateViewRecord.mobileNo === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Mobile No' is missing");
      return;
    } else if (
      addUpdateViewRecord.email === "" ||
      addUpdateViewRecord.email === null ||
      addUpdateViewRecord.email === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Email' is missing");
      return;
    } else if (
      addUpdateViewRecord.batch === "" ||
      addUpdateViewRecord.batch === null ||
      addUpdateViewRecord.batch === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Batch' is missing");
      return;
    } else if (
      addUpdateViewRecord.memberships === "" ||
      addUpdateViewRecord.memberships === null ||
      addUpdateViewRecord.memberships === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Memberships' is missing");
      return;
    } else if (
      addUpdateViewRecord.training === "" ||
      addUpdateViewRecord.training === null ||
      addUpdateViewRecord.training === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Training' is missing");
      return;
    } else if (
      addUpdateViewRecord.totalAmount === "" ||
      addUpdateViewRecord.totalAmount === null ||
      addUpdateViewRecord.totalAmount === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Total Amount' is missing");
      return;
    } else if (
      addUpdateViewRecord.payableAmount === "" ||
      addUpdateViewRecord.payableAmount === null ||
      addUpdateViewRecord.payableAmount === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Payable Amount' is missing");
      return;
    } else if (
      addUpdateViewRecord.paymentDate === "" ||
      addUpdateViewRecord.paymentDate === null ||
      addUpdateViewRecord.paymentDate === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Payment Date' is missing");
      return;
    } else if (
      addUpdateViewRecord.joiningDate === "" ||
      addUpdateViewRecord.joiningDate === null ||
      addUpdateViewRecord.joiningDate === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Joining  Date' is missing");
      return;
    } else if (
      addUpdateViewRecord.address === "" ||
      addUpdateViewRecord.address === null ||
      addUpdateViewRecord.address === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Addresses' is missing");
      return;
    } else if (
      addUpdateViewRecord.paymentMode === "" ||
      addUpdateViewRecord.paymentMode === null ||
      addUpdateViewRecord.paymentMode === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Payment Mode' is missing");
      return;
    } else if (
      addUpdateViewRecord.gender === "" ||
      addUpdateViewRecord.gender === null ||
      addUpdateViewRecord.gender === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Gender' is missing");
      return;
    }

    // console.log(addUpdateViewRecord);

    await axios
      .post(baseURL + "/addCust", addUpdateViewRecord, {
        headers,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === true) {
          handleClickAlertMsg(TransitionTop, response.data.message);
          setOpen(false);
          props.getActiveCustomer();
        } else if (response.data.status === false) {
          handleClickAlertMsg(TransitionTop, response.data.message);
          setOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onHanddelUpdate = async (e) => {
    if (
      addUpdateViewRecord.firstName === "" ||
      addUpdateViewRecord.firstName === null ||
      addUpdateViewRecord.firstName === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "First Name' is missing");
      return;
    } else if (
      addUpdateViewRecord.lastName === "" ||
      addUpdateViewRecord.lastName === null ||
      addUpdateViewRecord.lastName === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Last Name' is missing");
      return;
    } else if (
      addUpdateViewRecord.mobileNo === "" ||
      addUpdateViewRecord.mobileNo === null ||
      addUpdateViewRecord.mobileNo === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Mobile No' is missing");
      return;
    } else if (
      addUpdateViewRecord.email === "" ||
      addUpdateViewRecord.email === null ||
      addUpdateViewRecord.email === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Email' is missing");
      return;
    } else if (
      addUpdateViewRecord.batch === "" ||
      addUpdateViewRecord.batch === null ||
      addUpdateViewRecord.batch === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Batch' is missing");
      return;
    } else if (
      addUpdateViewRecord.memberships === "" ||
      addUpdateViewRecord.memberships === null ||
      addUpdateViewRecord.memberships === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Memberships' is missing");
      return;
    } else if (
      addUpdateViewRecord.training === "" ||
      addUpdateViewRecord.training === null ||
      addUpdateViewRecord.training === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Training' is missing");
      return;
    } else if (
      addUpdateViewRecord.totalAmount === "" ||
      addUpdateViewRecord.totalAmount === null ||
      addUpdateViewRecord.totalAmount === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Total Amount' is missing");
      return;
    } else if (
      addUpdateViewRecord.payableAmount === "" ||
      addUpdateViewRecord.payableAmount === null ||
      addUpdateViewRecord.payableAmount === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Payable Amount' is missing");
      return;
    } else if (
      addUpdateViewRecord.paymentDate === "" ||
      addUpdateViewRecord.paymentDate === null ||
      addUpdateViewRecord.paymentDate === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Payment Date' is missing");
      return;
    } else if (
      addUpdateViewRecord.joiningDate === "" ||
      addUpdateViewRecord.joiningDate === null ||
      addUpdateViewRecord.joiningDate === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Joining  Date' is missing");
      return;
    } else if (
      addUpdateViewRecord.address === "" ||
      addUpdateViewRecord.address === null ||
      addUpdateViewRecord.address === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Addresses' is missing");
      return;
    } else if (
      addUpdateViewRecord.paymentMode === "" ||
      addUpdateViewRecord.paymentMode === null ||
      addUpdateViewRecord.paymentMode === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Payment Mode' is missing");
      return;
    } else if (
      addUpdateViewRecord.gender === "" ||
      addUpdateViewRecord.gender === null ||
      addUpdateViewRecord.gender === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Gender' is missing");
      return;
    }

    console.log(addUpdateViewRecord);

    await axios
      .post(baseURL + "/updateCust", addUpdateViewRecord, {
        headers,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === true) {
          handleClickAlertMsg(TransitionTop, response.data.message);
          setOpen(false);
        } else if (response.data.status === false) {
          handleClickAlertMsg(TransitionTop, response.data.message);
          setOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onHanddelRenew = async (e) => {
    if (
      addUpdateViewRecord.batch === "" ||
      addUpdateViewRecord.batch === null ||
      addUpdateViewRecord.batch === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Batch' is missing");
      return;
    } else if (
      addUpdateViewRecord.memberships === "" ||
      addUpdateViewRecord.memberships === null ||
      addUpdateViewRecord.memberships === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Memberships' is missing");
      return;
    } else if (
      addUpdateViewRecord.totalAmount === "" ||
      addUpdateViewRecord.totalAmount === null ||
      addUpdateViewRecord.totalAmount === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Total Amount' is missing");
      return;
    } else if (
      addUpdateViewRecord.payableAmount === "" ||
      addUpdateViewRecord.payableAmount === null ||
      addUpdateViewRecord.payableAmount === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Payable Amount' is missing");
      return;
    } else if (
      addUpdateViewRecord.paymentDate === "" ||
      addUpdateViewRecord.paymentDate === null ||
      addUpdateViewRecord.paymentDate === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Payment Date' is missing");
      return;
    } else if (
      addUpdateViewRecord.joiningDate === "" ||
      addUpdateViewRecord.joiningDate === null ||
      addUpdateViewRecord.joiningDate === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Joining  Date' is missing");
      return;
    } else if (
      addUpdateViewRecord.paymentMode === "" ||
      addUpdateViewRecord.paymentMode === null ||
      addUpdateViewRecord.paymentMode === undefined
    ) {
      handleClickAlertMsg(TransitionTop, "Payment Mode' is missing");
      return;
    }

    const renewMembership = {
      custId: addUpdateViewRecord.custId,
      paymentDate: "27-12-2024",
      payableAmpunt: addUpdateViewRecord.payableAmpunt,
      totalAmount: addUpdateViewRecord.totalAmount,
      remainingAmount: addUpdateViewRecord.remainingAmount,
      memberships: addUpdateViewRecord.memberships,
      batch: addUpdateViewRecord.batch,
    };

    console.log(addUpdateViewRecord);

    await axios
      .post(baseURL + "/renewMemberShip", renewMembership, {
        headers,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === true) {
          handleClickAlertMsg(TransitionTop, response.data.message);
          setOpen(false);
        } else if (response.data.status === false) {
          handleClickAlertMsg(TransitionTop, response.data.message);
          setOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const startCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          setIsCameraActive(true);
        })
        .catch((err) => {
          console.error("Error accessing the camera: ", err);
        });
    }
  };

  // Capture the photo
  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current frame of the video onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to image
    const photoData = canvas.toDataURL("image/png");
    setImageSrc(photoData);
    stopCamera();
  };

  // Stop the camera stream
  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setIsCameraActive(false);
  };

  // Save the photo (for demonstration, just log it)
  const savePhoto = () => {
    if (imageSrc) {
      console.log("Saving photo: ", imageSrc);
      // Implement your photo saving logic here (e.g., upload to server or save locally)
    }
  };

  const handleClickAlertMsg = (Transition, warnMsg) => {
    console.log("handleClickAlertMsg");
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

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

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
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
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
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <div className="row g-4 p-3">
              {/* <div className="col-md-3">
                {!isCameraActive && (
                  <button onClick={startCamera}>Open Camera</button>
                )}
                {isCameraActive && (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      style={{ width: "100%", border: "1px solid #ddd" }}
                    />
                    <button onClick={capturePhoto}>Capture Photo</button>
                  </>
                )}
                {imageSrc && (
                  <> 
                    <img
                      src={imageSrc}
                      alt="Captured"
                      style={{ width: "100%" }}
                    />
                    <button onClick={savePhoto}>Save Photo</button>
                  </>
                )}
                <canvas ref={canvasRef} style={{ display: "none" }} />
              </div> */}

              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Frist Name"
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
                  inputProps={{
                    maxLength: 25,
                  }}
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
                      label="Payment Date"
                      name="paymentDate"
                      value={dayjs(addUpdateViewRecord?.paymentDate || null)}
                      slotProps={{
                        textField: {
                          error: false,
                        },
                      }}
                      format="DD/MM/YYYY"
                      onChange={(value) => onInputChange(value, "paymentDate")}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              <div className="datepickerClassForBlackColor d-flex col-md-3 pe-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      className="w-100"
                      label="joining Date"
                      name="joiningDate"
                      value={dayjs(addUpdateViewRecord?.joiningDate || null)}
                      slotProps={{
                        textField: {
                          error: false,
                        },
                      }}
                      format="DD/MM/YYYY"
                      onChange={(value) => onInputChange(value, "joiningDate")}
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
                    <MenuItem value="E">Evenning</MenuItem>
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
                    <MenuItem value={"Core"}>Core Workouts</MenuItem>
                    <MenuItem value={"Flexibility"}>
                      Flexibility and Mobility
                    </MenuItem>
                    <MenuItem value={"HIIT"}>
                      HIIT (High-Intensity Interval Training)
                    </MenuItem>
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
                  label="Payable Amount"
                  variant="outlined"
                  name="payableAmount"
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

              <div className="col-md-2">
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
                      <PersonAddAlt1Icon />
                    </label>
                  </div>
                  <div className="avatar-preview">
                    <div
                      id="imagePreview"
                      style={{ backgroundImage: `url(${image})` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={onHanddelSave}
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
        ;
      </>
    );
  } else if (props.op == "Update") {
    return (
      <>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          TransitionComponent={Transition}
          maxWidth="lg"
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Update Customer
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
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <div className="row g-4 p-3">
              <div className="col-md-3">
                {!isCameraActive && (
                  <button onClick={startCamera}>Open Camera</button>
                )}
                {isCameraActive && (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      style={{ width: "100%", border: "1px solid #ddd" }}
                    />
                    <button onClick={capturePhoto}>Capture Photo</button>
                  </>
                )}
                {imageSrc && (
                  <>
                    {/* <h3>Preview</h3> */}
                    <img
                      src={imageSrc}
                      alt="Captured"
                      style={{ width: "100%" }}
                    />
                    <button onClick={savePhoto}>Save Photo</button>
                  </>
                )}
                <canvas ref={canvasRef} style={{ display: "none" }} />
              </div>
              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Frist Name"
                  variant="outlined"
                  name="firstName"
                  value={addUpdateViewRecord.firstName || ""}
                  onKeyPress={(e) => {
                    if (!/^[a-zA-Z]$/.test(e.key)) {
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
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  value={addUpdateViewRecord.lastName || ""}
                  onKeyPress={(e) => {
                    if (!/^[a-zA-Z]$/.test(e.key)) {
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
                  label="Mobile No"
                  variant="outlined"
                  name="mobileNo"
                  value={addUpdateViewRecord.mobileNo || ""}
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
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                />
              </div>
              <div className="datepickerClassForBlackColor d-flex col-md-3 pe-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      className="w-100"
                      label="Payment Date"
                      name="paymentDate"
                      value={dayjs(addUpdateViewRecord?.paymentDate || null)}
                      slotProps={{
                        textField: {
                          error: false,
                        },
                      }}
                      format="DD/MM/YYYY"
                      onChange={(e) => onInputChange(e, "paymentDate")}
                      // // minDate={dayjs(addData?.startDate)}
                      // minDate={
                      //   addData?.startDate ? dayjs(addData?.startDate) : null
                      // }
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              <div className="datepickerClassForBlackColor d-flex col-md-3 pe-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      className="w-100"
                      label="joining Date"
                      name="joiningDate"
                      value={dayjs(addUpdateViewRecord?.joiningDate || null)}
                      slotProps={{
                        textField: {
                          error: false,
                        },
                      }}
                      format="DD/MM/YYYY"
                      onChange={(value) => onInputChange(value, "joiningDate")}
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
                    // value={addData || ""}
                    value={addUpdateViewRecord.batch || ""}
                    label="Batch"
                    onChange={(e) => onInputChange(e)}
                  >
                    <MenuItem value="M">Morning</MenuItem>
                    <MenuItem value="E">Evenning</MenuItem>
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
                    name="Memberships"
                    value={addUpdateViewRecord.memberships || ""}
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
                    value={addUpdateViewRecord.training || ""}
                    onChange={(e) => onInputChange(e)}
                  >
                    <MenuItem value={"Cardio"}>Cardio</MenuItem>
                    <MenuItem value={"Strength"}>Strength Training</MenuItem>
                    <MenuItem value={"Core"}>Core Workouts</MenuItem>
                    <MenuItem value={"Flexibility"}>
                      Flexibility and Mobility
                    </MenuItem>
                    <MenuItem value={"HIIT"}>
                      HIIT (High-Intensity Interval Training)
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Total Amount"
                  variant="outlined"
                  name="totalAmount"
                  value={addUpdateViewRecord.totalAmount || " "}
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
                  label="Payable Amount"
                  variant="outlined"
                  name="payableAmount"
                  value={addUpdateViewRecord.payableAmount || " "}
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
                  value={addUpdateViewRecord.remainingAmount || ""}
                  name="remainingAmount"
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
                    value={addUpdateViewRecord.paymentMode || ""}
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
              onClick={onHanddelUpdate}
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
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          TransitionComponent={Transition}
          maxWidth="lg"
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Renewal Memberships
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
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <div className="row g-4 p-3">
              <div className="col-md-3">
                {!isCameraActive && (
                  <button onClick={startCamera}>Open Camera</button>
                )}
                {isCameraActive && (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      style={{ width: "100%", border: "1px solid #ddd" }}
                    />
                    <button onClick={capturePhoto}>Capture Photo</button>
                  </>
                )}
                {imageSrc && (
                  <>
                    {/* <h3>Preview</h3> */}
                    <img
                      src={imageSrc}
                      alt="Captured"
                      style={{ width: "100%" }}
                    />
                    <button onClick={savePhoto}>Save Photo</button>
                  </>
                )}
                <canvas ref={canvasRef} style={{ display: "none" }} />
              </div>
              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Frist Name"
                  variant="outlined"
                  name="firstName"
                  value={addUpdateViewRecord.firstName || ""}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                  disabled
                />
              </div>
              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  value={addUpdateViewRecord.lastName || ""}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                  disabled
                />
              </div>
              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Mobile No"
                  variant="outlined"
                  name="mobileNo"
                  value={addUpdateViewRecord.mobileNo || ""}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                  disabled
                />
              </div>
              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={addUpdateViewRecord.email || ""}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                  disabled
                />
              </div>
              <div className="datepickerClassForBlackColor d-flex col-md-3 pe-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      className="w-100"
                      label="Payment Date"
                      name="paymentDate"
                      value={dayjs(addUpdateViewRecord?.paymentDate || null)}
                      slotProps={{
                        textField: {
                          error: false,
                        },
                      }}
                      format="DD/MM/YYYY"
                      onChange={(e) => onInputChange(e, "paymentDate")}
                      // // minDate={dayjs(addData?.startDate)}
                      // minDate={
                      //   addData?.startDate ? dayjs(addData?.startDate) : null
                      // }
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              <div className="datepickerClassForBlackColor d-flex col-md-3 pe-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      className="w-100"
                      label="joining Date"
                      name="joiningDate"
                      value={dayjs(addUpdateViewRecord?.joiningDate || null)}
                      slotProps={{
                        textField: {
                          error: false,
                        },
                      }}
                      format="DD/MM/YYYY"
                      onChange={(value) => onInputChange(value, "joiningDate")}
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
                    // value={addData || ""}
                    value={addUpdateViewRecord.batch || ""}
                    label="Batch"
                    onChange={(e) => onInputChange(e)}
                  >
                    <MenuItem value="M">Morning</MenuItem>
                    <MenuItem value="E">Evenning</MenuItem>
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
                    name="Memberships"
                    value={addUpdateViewRecord.memberships || ""}
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
                <FormControl disabled fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Training
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="training"
                    // value={addData}
                    label="Training"
                    value={addUpdateViewRecord.training || ""}
                    onChange={(e) => onInputChange(e)}
                  >
                    <MenuItem value={"Cardio"}>Cardio</MenuItem>
                    <MenuItem value={"Strength"}>Strength Training</MenuItem>
                    <MenuItem value={"Core"}>Core Workouts</MenuItem>
                    <MenuItem value={"Flexibility"}>
                      Flexibility and Mobility
                    </MenuItem>
                    <MenuItem value={"HIIT"}>
                      HIIT (High-Intensity Interval Training)
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Total Amount"
                  variant="outlined"
                  name="totalAmount"
                  value={addUpdateViewRecord.totalAmount || " "}
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
                  label="Payable Amount"
                  variant="outlined"
                  name="payableAmount"
                  value={addUpdateViewRecord.payableAmount || " "}
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
                  value={addUpdateViewRecord.remainingAmount || ""}
                  name="remainingAmount"
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
                <FormControl disabled>
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
              onClick={onHanddelRenew}
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
