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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  const [addUpdateViewRecord, setAddUpdateViewRecord] = React.useState({
    ...props.data,
  });

  console.log(addUpdateViewRecord);
  console.log(props.op);

  useEffect(() => {
    handleClickOpen();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onInputChange = (e) => {
    setAddUpdateViewRecord({
      ...addUpdateViewRecord,
      [e.target.name]: e.target.value,
    });
  };
  const onHanddelSave = (e) => {
    console.log(addUpdateViewRecord);
    alert(JSON.stringify(addUpdateViewRecord));
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
              color: theme.palette.grey[500],
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
                  name="fristName"
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
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                />
              </div>
              {/* <div className="col-md-3">
                <TextField
                  id="outlined-basic"
                  label="Joing Date"
                  variant="outlined"
                  name="joingDate"
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                />
              </div> */}

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
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                />
              </div>

              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  label="Addresses"
                  variant="outlined"
                  name="addresses"
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
            <Button autoFocus onClick={onHanddelSave}>
              Save changes
            </Button>
          </DialogActions>
        </BootstrapDialog>
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
              color: theme.palette.grey[500],
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
                  name="fristName"
                  value={addUpdateViewRecord.fristName || ""}
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
              <div className="col-md-3">
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker label="Basic date picker" />
                  </DemoContainer>
                </LocalizationProvider> */}
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
                />
              </div>

              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  label="Addresses"
                  variant="outlined"
                  name="addresses"
                  value={addUpdateViewRecord.addresses || ""}
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
            <Button autoFocus onClick={onHanddelSave}>
              Save changes
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
              color: theme.palette.grey[500],
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
                  name="fristName"
                  value={addUpdateViewRecord.fristName || ""}
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
              <div className="col-md-3">
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker label="Basic date picker" />
                  </DemoContainer>
                </LocalizationProvider> */}
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
                />
              </div>

              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  label="Addresses"
                  variant="outlined"
                  name="addresses"
                  value={addUpdateViewRecord.addresses || ""}
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
            <Button autoFocus onClick={onHanddelSave}>
              Save changes
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </>
    );
  }
};

export default Form;
