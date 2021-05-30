import React from "react";
import { Link } from "react-router-dom";
import "./notFound.css";

const NotFound = () => {
  return (
    <div className="notFound ">
      <div className="notFound__container d-flex flex-column align-items-center">
        <p>Whoops!</p>
        <p>404 Page Not Found</p>

        <img src="https://media.npr.org/assets/img/2016/03/29/ap_090911089838_sq-3271237f28995f6530d9634ff27228cae88e3440.jpg" alt="" />

        <p>
          Back to <Link to="/">Home</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default NotFound;
