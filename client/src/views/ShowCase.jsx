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

  useEffect(() => {
    console.log(error, "============");
    if (error.err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  }, [error]);

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

  const newArr = arr.filter((e) => e.isStarred == true);

  if (newArr.length !== 0) {
    arr = newArr;
  }

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
                class="far fa-edit p-2"
              ></i>
            ) : (
              ""
            )}
          </div>
        </div>

        {userLogged.id == show.UserId ? (
          <div className="d-flex align-items-center">
            <i style={{ cursor: "pointer" }} onClick={itemToShow} class="far fa-file mx-2"></i>
            <i style={{ cursor: "pointer" }} onClick={() => toPageSeeAll()} class="fas fa-eye"></i>
            {/* <i style={{ cursor: "pointer" }} onClick={itemToShow} class="fas fa-plus mx-2"></i> */}
            {/* <a style={{ cursor: "pointer" }} onClick={() => toPageSeeAll()}>
              See All
            </a> */}
          </div>
        ) : (
          <div>
            <i style={{ cursor: "pointer" }} onClick={() => toPageSeeAll()} class="fas fa-eye"></i>
          </div>
        )}
      </div>

      <EditShowName updateFrom={(name) => handleUpdate({ id: show.id, name })} deleteFrom={() => deleteShowcase(show.id)} show={sModal} onHide={() => setSModal(false)} />
      <ListItemModal ShowcaseId={show.id} show={IModal} onHide={() => setIModal(false)} />

      <div className="row">
        {arr.slice(0, 3).map((e, i) => {
          return <CardProfile key={i} discovery={e}></CardProfile>;
        })}
      </div>
    </div>
  );
};

export default ShowCase;
