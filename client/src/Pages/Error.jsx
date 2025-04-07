import React from "react";
import errorImg from "../assets/gym401.jpg";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="error">
      <div className="container text-center">
        <img className="error-img" src={errorImg} alt="404 Error Page" />
        <p className="error-message my-5">
          Oops! The page you were looking for couldn't be found.
        </p>
        <div className="text-center my-5">
          <Button variant="contained" size="large">
            <Link to="/login">Back To Login Page </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error;
