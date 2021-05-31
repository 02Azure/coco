import React, { useEffect } from "react";
import "./profile.css";
import oke from ".././images/002.png";
import ok from "../images/bg_1.jpg";
import { useHistory, withRouter } from "react-router-dom";
import { useState } from "react";
import ModalWishList from "../components/Modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllShow, setLogin } from "../store/action";
import ShowcaseModal from "../components/AddShowCaseModal.jsx";
import ShowCase from "./ShowCase";
const Profile = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [showItem, setShowItem] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sModal, setSModal] = useState(false);

  const allShow = useSelector((state) => state.allShow);

  // console.log(allShow);

  useEffect(() => {
    dispatch(getAllShow(3));
  }, []);

  const users = useSelector((state) => state.user);
  // const isLogin = useSelector((state) => state.isLogin)
  function hideItems() {
    setShowItem(false);
  }
  function itemsShow() {
    setShowItem(true);
  }
  function showModalWishlist() {
    setShowModal(!showModal);
  }
  function showChat() {
    history.push("/chat");
    // const temp = localStorage.getItem('data')
    // console.log(temp, "temp");
    // const www = JSON.parse(temp)
    // console.log(www, "<<<");
  }

  function editUserInfo() {
    history.push("/editProfile/1");
  }
  function goDiscovery() {
    // history.push("/discovery")
    localStorage.getItem();
  }

  function addToShowcase() {
    setSModal(true);
  }
  return (
    <section className="profile">
      {/* navbar image */}
      <div className="header__image__container">
        <a onClick={goDiscovery} className="navbar__anchor">
          Home
        </a>
        <p>{JSON.stringify(users)}</p>
      </div>

      {/* profile side */}
      <div className="profile__container row">
        {/* user info */}
        <div className="user__container col-md-4 p-3">
          <div className="user__info__container">
            <div className="content__image">
              <img src={oke} alt="" className="header__image" />
            </div>
            <div className="username d-flex align-items-center justify-content-between">
              <p className="username__text">@username</p>
              <i onClick={editUserInfo} class="far fa-edit"></i>
            </div>
            <div className="main__content">
              <p className="text">Full Stack Javascript Developer</p>
              <p className="text">location</p>
            </div>
            <button onClick={showChat} className="btn__chat">
              Chat
            </button>
          </div>
        </div>
        {/* navigation anchor */}
        <div className="showcase col-md-8 p-3">
          <div className="buttons d-flex">
            <div className="d-flex align-items-center">
              <div>
                <a onClick={hideItems} className="btn">
                  show case
                </a>
              </div>
              <div>
                <i onClick={addToShowcase} class="far fa-plus-square"></i>
              </div>
            </div>
            <div>
              <a onClick={itemsShow} className="btn">
                items
              </a>
            </div>

            <div>
              <a onClick={showModalWishlist} className="btn">
                wishlist
              </a>
            </div>

            <div>
              <a href="#" className="add__showCase">
                <img
                  className="imgCase"
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMSAxMXYtMTFoMXYxMWgxMXYxaC0xMXYxMWgtMXYtMTFoLTExdi0xaDExeiIvPjwvc3ZnPg=="
                />
              </a>
            </div>
          </div>
          {/* show modal */}
          <ModalWishList show={showModal} onHide={() => setShowModal(false)} />
          <ShowcaseModal show={sModal} onHide={() => setSModal(false)} />
          {/* end of show modal */}
          {/* list shocases */}
          {!showItem && (
            <div className="showcase__container">
              <div className="items__container">
                {allShow.map((e, i) => (
                  <ShowCase key={i} show={e} />
                ))}
              </div>
            </div>
          )}
          {showItem && (
            <div className="showcase__container">
              <div className="items__container pt-1">
                <div className="items__images">
                  <h5>judul 1</h5>
                  <a className="see__all">see all</a>
                  <img src={ok} alt="" className="item__image" />
                  <img src={ok} alt="" className="item__image" />
                </div>
                <div className="items__images">
                  <h5>judul 2</h5>
                  <a className="see__all">see all</a>
                  <img src={ok} alt="" className="item__image" />
                  <img src={ok} alt="" className="item__image" />
                </div>
                <div className="items__images">
                  <h5>judul 3</h5>
                  <a className="see__all">see all</a>
                  <img src={ok} alt="" className="item__image" />
                  <img src={ok} alt="" className="item__image" />
                </div>
                <div className="items__images">
                  <h5>judul 4</h5>
                  <a className="see__all">see all</a>
                  <img src={ok} alt="" className="item__image" />
                  <img src={ok} alt="" className="item__image" />
                </div>
                <div className="items__images">
                  <h5>judul 5</h5>
                  <a className="see__all">see all</a>
                  <img src={ok} alt="" className="item__image" />
                  <img src={ok} alt="" className="item__image" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default withRouter(Profile);
