import "./login.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setLogin as isAuth} from "../store/action"
const Login = () => {
  const initialLogin = { email: "", password: "" };
  const [login, setLogin] = useState(initialLogin);
  const history = useHistory();
  const dispatch = useDispatch()
  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  function loginWeb(){
    console.log(login);
    dispatch(isAuth(true))
    history.push('/profile')
  }

  const registerHandle = () => {
    history.push("/register");
  };
  return (
    <div className="d-md-flex half">
      <div id="bg_login" className="bg "></div>

      <div className="contents">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-12">
              <div className="form-block mx-auto">
                {/* heading login */}
                <div className="text-center mb-5">
                  <h3 className="text-uppercase">
                    <strong>Co&Co</strong>
                  </h3>
                </div>
                {/* login form */}
                <form>
                  <div className="form-group first mb-2">
                    <label htmlFor="username">Email</label>
                    <input type="text" className="form-control py-1 px-2" name="email" value={login.email} onChange={handleChange} placeholder="your-email@gmail.com" id="username" />
                  </div>
                  <div className="form-group last mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control py-1 px-2" name="password" value={login.password} onChange={handleChange} placeholder="Your Password" id="password" />
                  </div>

                  <div className="d-sm-flex mb-5 align-items-center">
                    <span className="ms-auto">
                      <a onClick={registerHandle} className="forgot-pass">
                        Don't Have An Account? Register Here
                      </a>
                    </span>
                  </div>

                  <a onClick={loginWeb} className="btn my-1 py-2 btn-login"> Login</a>

                  <span className="text-center my-3 d-block">or</span>

                  <div className="">
                    <a className="btn my-1 py-2 btn-facebook">
                      {" "}
                      <span className="icon-facebook me-3"></span> Login with facebook{" "}
                    </a>
                    <a className="btn py-2 btn-google">
                      <span className="icon-google me-3"></span> Login with Google
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
