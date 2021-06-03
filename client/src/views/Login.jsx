import "./login.css";
import logo from "../images/coco.png"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { login as setUser } from "../store/action";
const Login = () => {
  const initialLogin = { email: "", password: "" };
  const [login, setLogin] = useState(initialLogin);
  const checkStatus = useSelector((state) => state.isLogin);
  const history = useHistory();
  const dispatch = useDispatch();

  const u = JSON.parse(localStorage.getItem("userLog"));

  useEffect(() => {
    if (checkStatus) {
      history.push("/profile/" + u.id);
    } else {
      history.push("/");
    }
  }, [checkStatus]);
  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  function loginWeb() {
    dispatch(setUser(login));
  }

  const registerHandle = () => {
    history.push("/register");
  };
  return (
    <div className="d-md-flex half">
      <div id="bg_login" className="bg "></div>

      <div className="contents">
        <div className="container" >
          <div className="row align-items-center justify-content-center">
            <div className="col-md-12">
              <p className="text-center descApp text-uppercase">show off your passion as <br/>a collector to other collectors!</p>
              <div className="form-block mx-auto">
                {/* heading login */}
                <div className="text-center mb-5">
                  <h1>
                    <strong>Login to Co&Co</strong>
                  </h1>
                </div>
                {/* login form */}
                <form>
                  <div className="form-group first mb-2">
                    <label className="usernameLabel text-uppercase">Email</label>
                    <input type="text" className="form-control py-1 px-2" name="email" value={login.email} onChange={handleChange} placeholder="your-email@gmail.com" id="username" />
                  </div>
                  <div className="form-group last mb-3">
                    <label className="usernameLabel text-uppercase">Password</label>
                    <input type="password" className="form-control py-1 px-2" name="password" value={login.password} onChange={handleChange} placeholder="Your Password" id="password" />
                  </div>
                  <a onClick={loginWeb} className="btn my-1 py-2 btn-login">
                    {" "}
                    SIGN IN
                  </a>

                  <span className="text-center my-0 d-block">or</span>

                  <div className="">
                    <a onClick={registerHandle} className="btn my-1 py-2 btn-facebook">
                      {" "}
                      <span className="icon-facebook me-3"></span> SIGN UP
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
