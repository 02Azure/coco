import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { findOneUser } from "../store/action";
import "./edit.css";

const EditProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const oneUser = useSelector((state) => state.oneUser);

  const [u, setInitialUser] = useState({ username: "", bio: "", location: "" });

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setInitialUser({
      ...u,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(findOneUser(id));
  }, []);

  useEffect(() => {
    setInitialUser({
      username: oneUser.username,
      location: oneUser.location,
      bio: oneUser.userDesc,
    });
  }, []);

  console.log(u);

  if (loading) {
    return (
      <div className="loading__discovery">
        <h3 className="text-center">Please Wait...</h3>
      </div>
    );
  }

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
              <input type="text" className="form-control py-1 px-2" onChange={handleChange} name="username" value={u.username} />
            </div>
            <div className="form-group first mb-2">
              <label htmlFor="username">Location</label>
              <input type="text" className="form-control py-1 px-2" onChange={handleChange} name="location" value={u.location} />
            </div>
            <div className="form-group first mb-2 d-flex flex-column">
              <label htmlFor="username">Bio</label>
              <textarea onChange={handleChange} name="bio" value={u.bio} />
            </div>

            <div className="">
              <a className="btn mb-2 py-2 btn-facebook">
                {" "}
                <span className="icon-facebook me-3"></span> UPDATE
              </a>
              <a className="btn py-2 btn-google">
                <span className="icon-google me-3"></span> cancel
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
