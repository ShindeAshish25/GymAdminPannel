// CatchFunction.js
import { toast } from "react-toastify";

const CatchFunction = (err, navigate, state) => {
  console.log("catch function", err);

  // if (err?.response?.status === 401) {
  //   localStorage.removeItem("isLoggedIn");

  //   toast.error("Your session has expired.", {
  //     autoClose: 3000,
  //   });

  //   navigate("/login", { state });
  //   return;
  // }

  if (
    err?.response?.status === 500 ||
    err?.code === "ERR_NETWORK" ||
    err?.response?.status === 400 ||
    err?.response?.status === 404
  ) {
    localStorage.removeItem("isLoggedIn");

    toast.error("Service is currently unavailable.", {
      autoClose: 3000,
    });

    navigate("/login", { state });
    return;
  }
};

export default CatchFunction;
