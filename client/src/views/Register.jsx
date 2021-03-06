import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { register } from "../store/action";
import logo from "../images/coco.png"
import { setRegister } from "../store/action";
import "./regis.css";

const Register = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const regist = useSelector((state) => state.register);

  useEffect(() => {
    if (regist) {
      history.push("/");
      dispatch(setRegister(false));
    }
  }, [regist]);

  // console.log(regist);

  const initialRegister = { username: "", email: "", password: "" };
  const [reg, setReg] = useState(initialRegister);

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setReg({
      ...reg,
      [name]: value,
    });
  };

  const submit = () => {
    dispatch(register(reg));
  };

  const cancel = () => {
    history.push("/");
  };

  return (
    <div className="d-md-flex half">
      <div className="bg"></div>

      <div className="contents">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-12">
              <p className="text-center text-uppercase descApp">show off your passion as <br/>a collector to other collectors!</p>
              <div className="form-block mx-auto">
                {/* heading regis */}
                <div className="text-center mb-4">
                  {/* <img
                  className="logo"
                  src={logo}
                  /> */}
                  <h1>
                    <strong>Join Co&Co</strong>
                  </h1>
                </div>
                {/* regis form */}
                <form>
                  <div className="form-group first mb-2">
                    <label className="usernameLabel text-uppercase">Username</label>
                    <input type="text" className="form-control py-1 px-2" name="username" autoComplete="off" onChange={handleChange} value={reg.username} placeholder="Username" />
                  </div>
                  <div className="form-group first mb-2">
                    <label className="usernameLabel text-uppercase">Email</label>
                    <input type="email" className="form-control py-1 px-2" name="email" autoComplete="off" onChange={handleChange} value={reg.email} placeholder="your-email@gmail.com" />
                  </div>
                  <div className="form-group last mb-3">
                    <label className="usernameLabel text-uppercase">Password</label>
                    <input type="password" className="form-control py-1 px-2" name="password" onChange={handleChange} value={reg.password} placeholder="Your Password" />
                  </div>

                  <div className="">
                    <a className="btn mb-2 py-2 btn-facebook" onClick={submit}>
                      {" "}
                      <span className="icon-facebook me-3"></span> SUBMIT
                    </a>
                    <a className="btn py-2 btn-google" 
                    style={{ 'background-color': '#ba1b2a'}}
                    onClick={cancel}>
                      <span className="icon-google me-3"></span> CANCEL
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

export default Register;
