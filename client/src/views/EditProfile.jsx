import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { findOneUser, updateUserInfo } from "../store/action";
import "./edit.css";

const EditProfile = () => {
  const { id } = useParams();
  const [isSubmitted, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.loading);

  const oneUser = useSelector((state) => state.oneUser);

  const [u, setInitialUser] = useState({ userImage: "", bio: "", location: "" });

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
  }, [dispatch, id]);

  useEffect(() => {
    console.log("MASOOK");
    console.log(isSubmitted, "<<<<<");
    if (isSubmitted) {
      history.push("/profile/" + id);
    }
  }, [isSubmitted]);

  useEffect(() => {
    setInitialUser({
      userImage: oneUser.userImage,
      location: oneUser.location,
      bio: oneUser.userDesc,
    });
  }, [oneUser]);

  // console.log(u);

  if (loading) {
    return (
      <div className="loading__discovery">
        <h3 className="text-center">Please Wait...</h3>
      </div>
    );
  }

  const cancelEdit = () => {
    history.push("/profile/" + id);
  };

  const updateInfo = () => {
    dispatch(updateUserInfo(u));
    setSubmit(true);
  };

  return (
    <div className="edit__profile">
      <div className="edit__container mt-5">
        <div className="form-block mx-auto">
          <div className="mb-4">
            <img src={u.userImage} className="mx-auto  edit__profile__image" />
          </div>
          {/* login form */}
          <form>
            <div className="form-group first mb-2">
              <input type="text" className="form-control py-1 px-2" onChange={handleChange} name="userImage" value={u.userImage} />
            </div>
            <div className="form-group first mb-2">
              <label htmlFor="loc">Location</label>
              <input type="text" className="form-control py-1 px-2" onChange={handleChange} name="location" value={u.location} />
            </div>
            <div className="form-group first mb-2 d-flex flex-column">
              <label htmlFor="bio">Bio</label>
              <textarea className="py-1 px-2" onChange={handleChange} name="bio" value={u.bio} />
            </div>

            <div className="">
              <a onClick={updateInfo} className="btn mb-2 py-2 btn-facebook">
                {" "}
                <span className="icon-facebook me-3"></span> UPDATE
              </a>
              <a onClick={cancelEdit} className="btn py-2 btn-google">
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
