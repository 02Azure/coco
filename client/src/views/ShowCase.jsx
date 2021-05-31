import React, { useState } from "react";
import oke from ".././images/002.png";
import { useDispatch } from "react-redux";
import { oneShow, removeShowcase, updateShowName } from "../store/action";
import EditShowName from "../components/EditShowName";
import ListItemModal from "../components/ListItemModal";

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

  const itemToShow = () => {
    setIModal(true);
  };

  const [sModal, setSModal] = useState(false);
  const [IModal, setIModal] = useState(false);

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
        <div>
          <i onClick={itemToShow} class="fas fa-plus mx-2"></i>
          <a onClick={() => setAll(!all)}>see all</a>
        </div>
      </div>

      <EditShowName updateFrom={(name) => handleUpdate({ id: show.id, name })} deleteFrom={() => deleteShowcase(show.id)} show={sModal} onHide={() => setSModal(false)} />
      <ListItemModal ShowcaseId={show.id} show={IModal} onHide={() => setIModal(false)} />

      <div className="row justify-content-center">
        {show.ShowcaseItems.map((e, i) => {
          // console.log(e);
          return (
            <div key={i} className="col-md-4 p-2 text-center">
              <img src={e.Item.image} alt="" className="item__image " />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowCase;
