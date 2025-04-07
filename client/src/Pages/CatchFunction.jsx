import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const CatchFunction = (err, navigate, state) => {
  console.log("catch function", err);
  //   const handleLogout = () => {
  //     let usernameencode = state?.userId;
  //     let body = { userId: usernameencode };

  //     axios
  //       .post(LicensesUrl + "/sessionExpireLogOut", body)
  //       .then((response) => {
  //         navigate("/login");
  //         localStorage.clear();
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         navigate("/login");
  //         localStorage.clear();
  //       });
  //   };

  if (err?.response?.status == "401") {
    localStorage.removeItem("isLoggedIn");
    alert("Your session has been Expired.");
    navigate("/login", { state: state });
    return;
  }
  if (
    err?.response?.status == "500" ||
    err?.code == "ERR_NETWORK" ||
    err?.response?.status == "400" ||
    err?.response?.status == "404"
  ) {
    localStorage.removeItem("isLoggedIn");
    alert("Service is currently unavailable.");
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert variant="filled" severity="success">
        This is a filled success Alert.
      </Alert>
    </Stack>;
    // navigate("/login", { state: state });
    // window.location.reload();
    return;
    // navigate("/login");
    // alert("Internal Server Error");
    // navigate("/login");
    // return
  }
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert variant="filled" severity="success">
        This is a filled success Alert.
      </Alert>
    </Stack>
  );
};

export default CatchFunction;
