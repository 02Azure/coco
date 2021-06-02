import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { oneShow, removeShowcase, updateShowName } from "../store/action";
import EditShowName from "../components/EditShowName";
import ListItemModal from "../components/ListItemModal";
import CardProfile from "../components/CardProfile";
import { useHistory } from "react-router";

const ShowCase = ({ show }) => {
  const dispatch = useDispatch();
  const userLogged = JSON.parse(localStorage.getItem("userLog"));
  const error = useSelector((state) => state.error);
  const [menu, setMenu] = useState(true);

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

  let arr = show.ShowcaseItems;

  // const newArr = arr.filter((e) => e.isStarred == true);

  // if (newArr.length < 3) {
  //   arr = newArr;
  // }

  console.log(arr, "ARR");
  // console.log(newArr, "newArr");

  return (
    <div className="items__show__container m-1 d-flex flex-column">
      <div className="d-flex justify-content-between p-2 align-items-center">
        <div className="d-flex align-items-center px-2">
          <h5 className="mb-0">{show.name}</h5>

          <div>
            {userLogged.id == show.UserId ? (
              <i
                onClick={() => {
                  getOneShow(show.id);
                  setSModal(true);
                }}
                className="far fa-edit p-2"
              ></i>
            ) : (
              ""
            )}
          </div>
        </div>
        {/* DI SINI */}

        {menu ? (
          <div className="d-flex align-items-center mx-2">
            <i style={{ cursor: "pointer" }} onClick={() => setMenu(false)} className="fas fa-ellipsis-h"></i>
          </div>
        ) : (
          <div className="d-flex align-items-center">
            {userLogged.id == show.UserId ? <i style={{ cursor: "pointer" }} onClick={itemToShow} className="far fa-file mx-2"></i> : ""}
            <i style={{ cursor: "pointer" }} onClick={() => toPageSeeAll()} className="fas fa-eye mx-2"></i>
            <i style={{ cursor: "pointer" }} onClick={() => setMenu(true)} className="fas fa-ellipsis-h mx-2"></i>
          </div>
        )}
      </div>

      <EditShowName updateFrom={(name) => handleUpdate({ id: show.id, name })} deleteFrom={() => deleteShowcase(show.id)} show={sModal} onHide={() => setSModal(false)} />
      <ListItemModal ShowcaseId={show.id} show={IModal} onHide={() => setIModal(false)} />

      <div style={{ background: "#a3d2ca" }} className="row">
        {arr.map((e, i) => {
          return <CardProfile key={i} discovery={e}></CardProfile>;
        })}
        {/* {show.ShowcaseItems.slice(0, 3).map((e, i) => {
          return <CardProfile key={i} discovery={e}></CardProfile>;
        })} */}
      </div>
    </div>
  );
};

export default ShowCase;
