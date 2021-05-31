import React from "react";
import "./profile.css";
import oke from ".././images/002.png";
import ok from "../images/bg_1.jpg"
import { useHistory, withRouter } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ModalWishList from "../components/Modal.jsx"
import FormAdd from "../components/formAddItem"
import { useDispatch, useSelector } from 'react-redux'
import { readItems, findOneUser } from '../store/action'
import ShowcaseModal from "../components/AddShowCaseModal.jsx";
import ShowCase from "./ShowCase";
const Profile = () => {
  let history = useHistory()
  const dispatch = useDispatch()
  const [showItem, setShowItem] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showFormAdd, setShowFormAdd] = useState(false)
  const [sModal, setSModal] = useState(false);
  const user = useSelector((state) => state.oneUser)
  const items = useSelector((state) => state.items)
  const userLogged = JSON.parse(localStorage.getItem('userLog'))
  // console.log(userLogged);
  useEffect(() => {
    dispatch(readItems())
  }, [items])
  useEffect(() =>{
    dispatch(findOneUser(JSON.stringify(userLogged.id)))
  }, [])
  function hideItems(){
    setShowItem(false)
  }
  function itemsShow() {
    setShowItem(true);
  }
  function pageWishList() {
    // setShowModal(!showModal);
    history.push('/wishlist')
  }
  function showChat() {
    history.push("/chat");
  }

  function editUserInfo() {
    history.push("/editProfile/10");
  }
  function goDiscovery() {
    // history.push("/discovery")
    localStorage.getItem('data')
  }
  function showModalForm(){
    setShowFormAdd(true)
    // localStorage.getItem();
  }

  function addToShowcase() {
    setSModal(true);
  }

  function detailItem(id){
    // console.log(id, "<<<");
    history.push(`editItem/${id}`);
  }
  return (
    <section className="profile">
      {/* navbar image */}
      <div className="header__image__container">
        <a onClick={goDiscovery} className="navbar__anchor">
          Home
        </a>
        <p>{JSON.stringify(user)}</p>
      </div>

      {/* profile side */}
      <div className="profile__container row">
        {/* user info */}
        <div className="user__container col-md-4 p-3">
          <div className="user__info__container">
            <div className="content__image">
              {
                user.image&&
                  <img src={user.image} alt="" className="header__image" />
              }
              {
                !user.image &&
                <img src={user.image} alt="" className="header__image__test" />
              }
            </div>
            <div className="username d-flex align-items-center justify-content-between">
              <p className="username__text">@{user.username}</p>
              <i onClick={editUserInfo} class="far fa-edit"></i>
            </div>
            <div className="main__content">
              <p className="text">{user.userDesc}</p>
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
            <div>
              <a onClick={hideItems} className="btn">
                show case
              </a>
              <i onClick={addToShowcase} class="far fa-plus-square"></i>
            </div>
            <div>
              <a onClick={itemsShow} className="btn">
                items
              </a>
            </div>

            <div>
              <a onClick={pageWishList} className="btn">
                wishlist
              </a>
            </div>

            <div>
              <a onClick={showModalForm} className="add__showCase">
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
          <FormAdd show={showFormAdd} onHide={() => setShowFormAdd(false)} />
          {/* end of show modal */}
          {/* list shocases */}
          {!showItem && (
            <div className="showcase__container">
              <div className="items__container">
                <ShowCase />
                <ShowCase />
                <ShowCase />
              </div>
            </div>
          )}
          {showItem && (
            <div className="showcase__container">
              <div className="items__container">
                        {/* <h5>My Item</h5> */}
                      <a className="see__all">see all</a>
                      <div className="items__images">
                {
                  items.map(item => {
                    return (
                        <a key={item.id} onClick={e => detailItem(item.id)}>
                          <img src={item.image} alt="" className="item__image" />
                        </a>
                      )
                    })
                  }
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
