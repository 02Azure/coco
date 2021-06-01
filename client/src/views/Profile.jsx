import React from "react";
import "./profile.css";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { CardColumns } from "react-bootstrap";
import ModalWishList from "../components/Modal.jsx";
import FormAdd from "../components/formAddItem";
import { useDispatch, useSelector } from "react-redux";
import { readItems, findOneUser, getAllShow, setLogin, setNotFound } from "../store/action";
import ShowcaseModal from "../components/AddShowCaseModal.jsx";
import ShowCase from "./ShowCase";
const Profile = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [showItem, setShowItem] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showFormAdd, setShowFormAdd] = useState(false);
  const [sModal, setSModal] = useState(false);
  const user = useSelector((state) => state.oneUser);
  const items = useSelector((state) => state.items);
  // const users = useSelector((state) => state.user);
  const userLogged = JSON.parse(localStorage.getItem("userLog"));
  // console.log(id, 'use params');
  const allShow = useSelector((state) => state.allShow);

  const [all, setAll] = useState(false);
  // console.log(allShow);

  // const isLogin = useSelector((state) => state.isLogin)
  function hideItems() {
    setShowItem(false);
  }
  useEffect(() => {
    dispatch(getAllShow(id));
  }, [allShow, id]); //!PASANG ALL SHOW DI SINI

  // console.log(userLogged);
  useEffect(() => {
    dispatch(readItems());
  }, []);
  useEffect(() => {
    console.log("masuk find one user");
    dispatch(findOneUser(id));
  }, [id]);

  useEffect(() => {
    dispatch(findOneUser(id));
    dispatch(readItems());
  }, []);

  function hideItems() {
    setShowItem(false);
  }
  function itemsShow() {
    setShowItem(true);
  }
  function pageWishList() {
    // setShowModal(!showModal);
    history.push("/wishlist");
  }
  function showChat() {
    history.push("/chat");
  }

  function editUserInfo() {
    history.push("/editProfile/" + userLogged.id);
  }
  function goDiscovery() {
    // history.push("/discovery")
    localStorage.getItem("data");
  }
  function showModalForm() {
    setShowFormAdd(true);
    // localStorage.getItem();
  }

  function addToShowcase() {
    setSModal(true);
  }

  function detailItem(id) {
    console.log(id, "<<<");
    history.push(`/editItem/${id}`);
  }

  console.log(allShow);

  return (
    <section className="profile">
      {/* profile side */}
      <div className="profile__container row">
        {/* user info */}
        <div className="user__container col-md-4 p-3">
          <div className="user__info__container mx-auto d-flex flex-column ">
            <div className="content__image ">
              <img
                src={user.userImage}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://www.mugi.co.id/assets/images/img_def.png";
                }}
                alt=""
                className="header__image mx-auto"
              />
            </div>
            <div className="username d-flex align-items-center p-1 justify-content-between">
              <p className="username__text">@{user.username}</p>
            </div>
            <div className="main__content p-1">
              <p className="text">{user.userDesc}</p>
            </div>
            <div className="main__content p-1 d-flex align-items-center">
              <i className="fas fa-map-marker-alt"></i>
              <p style={{ color: "#9d9d9d" }} className="text mx-2">
                {user.location ? user.location : "unknown"}
              </p>
            </div>
            {userLogged.id !== +id && (
              <button onClick={showChat} className="btn__chat">
                Chat
              </button>
            )}
          </div>
        </div>
        {/* navigation anchor */}
        <div className="showcase pt-0 col-md-8 p-3">
          <div className="buttons d-flex justify-content-start">
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center">
                <a onClick={hideItems} className="btn p-0">
                  Showcases
                </a>
                {userLogged.id == id ? (
                  <div>
                    <i onClick={addToShowcase} style={{ cursor: "pointer" }} class="fas fa-folder-plus"></i>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            {userLogged.id == id ? (
              <div className="d-flex align-items-center">
                <a onClick={itemsShow} className="btn pe-0">
                  My Items
                </a>
                <i onClick={showModalForm} style={{ cursor: "pointer" }} class="far fa-plus-square"></i>
              </div>
            ) : (
              ""
            )}

            <div>
              <a onClick={pageWishList} className="btn">
                Wishlists
              </a>
            </div>
          </div>
          {/* show modal */}
          <ModalWishList show={showModal} onHide={() => setShowModal(false)} />
          <ShowcaseModal show={sModal} onHide={() => setSModal(false)} />
          <FormAdd show={showFormAdd} onHide={() => setShowFormAdd(false)} pathname="profile" />
          {/* end of show modal */}

          {/* list shocases */}
          {!showItem && (
            <div className="showcase__container">
              <div className="items__container pt-0">
                {all ? allShow.map((e, i) => <ShowCase key={i} show={e} />) : allShow.slice(0, 3).map((e, i) => <ShowCase key={i} show={e} />)}

                <div>
                  <button onClick={() => setAll(!all)} style={{ width: "99%" }} className="btn btn-outline-light text-center">
                    {all ? "Show less" : "Show All"}
                  </button>
                </div>
              </div>
            </div>
          )}
          {showItem && (
            <div className="items__container">
              {/* <h5>My Item</h5> */}
              {/* <a className="see__all">see all</a> */}
              <div className="items__image">
                {/* <CardColumns> */}
                {items.map((item) => {
                  return (
                    <>
                      <div key={item.id}>
                        {/* <p>Click To See Detail</p> */}
                        <img onClick={(e) => detailItem(item.id)} src={item.image} alt="" className="item__image" />
                      </div>
                    </>
                  );
                })}
                {/* </CardColumns> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default withRouter(Profile);
