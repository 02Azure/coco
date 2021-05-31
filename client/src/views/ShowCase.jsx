import React, { useState } from "react";
import oke from ".././images/002.png";
import { useDispatch } from "react-redux";
import { oneShow, removeShowcase } from "../store/action";
import EditShowName from "../components/EditShowName";

const ShowCase = (ShowId) => {
  const dispatch = useDispatch();

  const deleteShowcase = () => {
    dispatch(removeShowcase(1));
  };

  const getOneShow = () => {
    dispatch(oneShow(ShowId));
  };

  const [sModal, setSModal] = useState(false);

  const [all, setAll] = useState(false);
  return (
    <div className="items__images m-1 d-flex flex-column">
      <div className="d-flex justify-content-between p-2 align-items-start">
        <div className="d-flex">
          <h5>judul 1</h5>
          <i
            onClick={() => {
              // getOneShow();
              setSModal(true);
            }}
            class="far fa-edit p-2"
          ></i>
        </div>

        <a onClick={() => setAll(!all)}>see all</a>
      </div>

      <EditShowName show={sModal} onHide={() => setSModal(false)} />

      <div className="row justify-content-center">
        <div className="col-md-4 mx-auto">
          <img src={oke} alt="" className="item__image" />
        </div>
        <div className="col-md-4">
          <img src={oke} alt="" className="item__image" />
        </div>
        <div className="col-md-4">
          <img src={oke} alt="" className="item__image" />
        </div>
      </div>
    </div>
  );
};

export default ShowCase;
