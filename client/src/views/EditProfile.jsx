import React from "react";
import "./edit.css";
const EditProfile = () => {
  return (
    <div className="edit__profile">
      <div className="edit__container mt-5">
        <div className="form-block mx-auto">
          {/* heading login */}
          <div className="text-center mb-5">
            <h3 className="text-uppercase">
              <strong>Profile</strong>
            </h3>
          </div>
          {/* login form */}
          <form>
            <div className="form-group first mb-2">
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control py-1 px-2" placeholder="your-email@gmail.com" id="username" />
            </div>
            <div className="form-group first mb-2">
              <label htmlFor="username">Location</label>
              <input type="text" className="form-control py-1 px-2" placeholder="your-email@gmail.com" id="username" />
            </div>
            <div className="form-group first mb-2 d-flex flex-column">
              <label htmlFor="username">Bio</label>
              <textarea />
            </div>
            <div className="form-group last mb-3">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control py-1 px-2" placeholder="Your Password" id="password" />
            </div>

            <div class="">
              <a class="btn mb-2 py-2 btn-facebook">
                {" "}
                <span class="icon-facebook me-3"></span> UPDATE
              </a>
              <a class="btn py-2 btn-google">
                <span class="icon-google me-3"></span> cancel
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
