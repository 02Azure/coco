import React, { useState } from "react";
import oke from ".././images/002.png";
import { useDispatch } from "react-redux";
import { oneShow, removeShowcase, updateShowName } from "../store/action";
import EditShowName from "../components/EditShowName";
import ListItemModal from "../components/ListItemModal";
import CardProfile from "../components/CardProfile";
import { useHistory } from "react-router";

const ShowCase = ({ show }) => {
  const dispatch = useDispatch();
  const userLogged = JSON.parse(localStorage.getItem("userLog"));

  const history = useHistory();

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

  const toPageSeeAll = () => {
    history.push("/seeall/" + show.id);
  };

  const starredItems = show.ShowcaseItems.filter((e) => e.isStarred == true);

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
        {userLogged.id == show.UserId ? (
          <div>
            <i onClick={itemToShow} class="fas fa-plus mx-2"></i>
            <a onClick={() => toPageSeeAll()}>see all</a>
          </div>
        ) : (
          ""
        )}
      </div>

      <EditShowName updateFrom={(name) => handleUpdate({ id: show.id, name })} deleteFrom={() => deleteShowcase(show.id)} show={sModal} onHide={() => setSModal(false)} />
      <ListItemModal ShowcaseId={show.id} show={IModal} onHide={() => setIModal(false)} />

      <div className="row">
        {starredItems.map((e, i) => {
          return <CardProfile key={i} discovery={e}></CardProfile>;
        })}
      </div>
    </div>
  );
};

export default ShowCase;
