import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLogin } from "../store/action";
import { useSelector } from "react-redux";
import "./navbar.css";
const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  function logout() {
    localStorage.clear();
    dispatch(checkLogin(false));
    history.push("/");
  }

  const u = JSON.parse(localStorage.getItem("userLog"));

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand">Co&Co</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/discovery" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/trending" className="nav-link">
                Trending
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/profile/${u.id}`} className="nav-link">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <a onClick={logout} style={{ cursor: "pointer" }} className="nav-link ">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
