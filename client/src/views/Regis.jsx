import React from "react";
import "./regis.css";
import { useHistory } from 'react-router-dom'

const Register = () => {
  let history = useHistory()
  const goLogin = () => {
    // console.log("regist");
    history.push('/login')
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
                    <input type="text" class="form-control py-1 px-2" placeholder="Username" id="username" />
                  </div>
                  <div class="form-group first mb-2">
                    <label for="username">Email</label>
                    <input type="email" class="form-control py-1 px-2" placeholder="your-email@gmail.com" id="username" />
                  </div>
                  <div class="form-group last mb-3">
                    <label for="password">Password</label>
                    <input type="password" class="form-control py-1 px-2" placeholder="Your Password" id="password" />
                  </div>

                  <div class="">
                    <a class="btn mb-2 py-2 btn-facebook">
                      {" "}
                      <span class="icon-facebook me-3"></span> submit
                    </a>
                    <a onClick={goLogin} class="btn py-2 btn-google">
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
