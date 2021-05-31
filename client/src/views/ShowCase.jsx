import React, { useState } from "react";
import oke from ".././images/002.png";
import { useDispatch } from "react-redux";
import { oneShow, removeShowcase, updateShowName } from "../store/action";
import EditShowName from "../components/EditShowName";

const ShowCase = ({ show }) => {
  const dispatch = useDispatch();

  const deleteShowcase = (id) => {
    dispatch(removeShowcase(id));
  };

  const getOneShow = (id) => {
    dispatch(oneShow(id));
  };

  const handleUpdate = (payload) => {
    dispatch(updateShowName(payload));
  };

  const [sModal, setSModal] = useState(false);

  const [all, setAll] = useState(false);
  return (
    <div className="items__images m-1 d-flex flex-column">
      <div className="d-flex justify-content-between p-2 align-items-center">
        <div className="d-flex align-items-center">
          <p className="">{show.name}</p>

          <div>
            <i
              onClick={() => {
                getOneShow(show.id);
                setSModal(true);
              }}
              class="far fa-edit p-2"
            ></i>
          </div>
        </div>

        <a onClick={() => setAll(!all)}>see all</a>
      </div>

      <EditShowName updateFrom={(name) => handleUpdate({ id: show.id, name })} deleteFrom={() => deleteShowcase(show.id)} show={sModal} onHide={() => setSModal(false)} />

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
