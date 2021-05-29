import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { register } from "../store/action";

import { setRegister } from "../store/action";
import "./regis.css";

const Register = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const regist = useSelector((state) => state.register);

  useEffect(() => {
    if (regist) {
      history.push("/login");
      dispatch(setRegister(false));
    }
  }, [regist]);

  console.log(regist);

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

  return (
    <div class="d-md-flex half">
      <div class="bg"></div>

      <div className="contents">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-12">
              <div class="form-block mx-auto">
                {/* heading regis */}
                <div class="text-center mb-4">
                  <h1 class="text-uppercase">
                    <strong>Co&Co</strong>
                  </h1>
                </div>
                {/* regis form */}
                <form>
                  <div class="form-group first mb-2">
                    <label for="username">Username</label>
                    <input type="text" class="form-control py-1 px-2" name="username" autoComplete="off" onChange={handleChange} value={reg.username} placeholder="Username" />
                  </div>
                  <div class="form-group first mb-2">
                    <label for="username">Email</label>
                    <input type="email" class="form-control py-1 px-2" name="email" autoComplete="off" onChange={handleChange} value={reg.email} placeholder="your-email@gmail.com" />
                  </div>
                  <div class="form-group last mb-3">
                    <label for="password">Password</label>
                    <input type="password" class="form-control py-1 px-2" name="password" onChange={handleChange} value={reg.password} placeholder="Your Password" />
                  </div>

                  <div class="">
                    <a class="btn mb-2 py-2 btn-facebook" onClick={submit}>
                      {" "}
                      <span class="icon-facebook me-3"></span> submit
                    </a>
                    <a class="btn py-2 btn-google">
                      <span class="icon-google me-3"></span> cancel
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
