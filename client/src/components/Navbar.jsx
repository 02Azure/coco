import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { NavLink } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { checkLogin, searchBy, setSearch } from "../store/action";
import { useSelector } from "react-redux";
import applogo from "../images/coco.png"
import "./navbar.css";
const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isLogin = useSelector((state) => state.isLogin);

  function logout() {
    localStorage.clear();
    dispatch(checkLogin(false));
    history.push("/");
  }
  let u = "";

  useEffect(() => {
    if (localStorage.getItem("userLog")) {
      dispatch(checkLogin(true));
    }
  }, []);

  if (localStorage.getItem("userLog")) {
    u = JSON.parse(localStorage.getItem("userLog"));
  }

  return (
    <nav style={{ background: "#5eaaa8" }} className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <a className="navbar-brand">
          <div className="brand-logo-container">
            <img src={ applogo } alt="co&co logo"/>
          </div>
          <span className="app-name">Co&Co</span>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item navText">
              <Link to="/discovery" className="nav-link">
                Discovery
              </Link>
            </li>
            <li className="nav-item navText d-flex align-items-center">
              <Link className="" to="/wishmarket" className="nav-link hot">
                Wish Market
              </Link>
              {/* <i style={{ color: "rgba(255,255,255,.55)" }} className="fas fa-fire-alt  m-0"></i> */}
            </li>
            {isLogin && (
              <>
                <li className="nav-item navText">
                  <Link to={`/chat`} className="nav-link navLink">
                    Chat
                  </Link>
                </li>
                <li className="nav-item navText">
                  <Link to={`/profile/${u.id}`} className="nav-link navLink">
                    Profile
                  </Link>
                </li>
                <li className="nav-item navText">
                  <a onClick={logout} style={{ cursor: "pointer" }} className="nav-link navLink ">
                    Logout
                  </a>
                </li>
              </>
            )}
            {!isLogin && (
              <li className="nav-item navText">
                <Link className="nav-link navLinkLogin" to="/">
                  <span className="login">Login</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
