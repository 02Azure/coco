import React from "react";
import "./profile.css";
import oke from ".././images/002.png";

export const Profile = () => {
  return (
    <section className="profile">
      {/* navbar image */}
      <div className="header__image__container">
        <a href="#" className="navbar__anchor">Home</a>
      </div>

      {/* profile side */}
      <div className="profile__container row">
        {/* user info */}
        <div className="user__container col-md-4 p-3">
          <div className="user__info__container">
            <div className="content__image" >
              <img src={oke} alt="" className="header__image" />
            </div>
            <div className="username">
              <p className="username__text">@username</p>
            </div>
            <div className="main__content">
              <p className="text">Full Stack Javascript Developer</p>
              <p className="text">location</p>
            </div>
            <button className="btn__chat">Chat</button>
          </div>
        </div>

        <div className="showcase col-md-8 p-3">
          {/* button2 */}
          <div className="buttons">
            <a className="btn">show case</a>
            <a className="btn">items</a>
            <a className="btn">wishlist</a>
          <a href="#" className="add__showCase">
            <img className="imgCase" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMSAxMXYtMTFoMXYxMWgxMXYxaC0xMXYxMWgtMXYtMTFoLTExdi0xaDExeiIvPjwvc3ZnPg=="/>
          </a>
          </div>

          {/* list shocases */}

          <div className="showcase__container">
            <div className="items__container">
              <div className="items__images">
                <h5>judul 1</h5>
                <a className="see__all">see all</a>
                <img src={oke} alt="" className="item__image" />
                <img src={oke} alt="" className="item__image" />
              </div>
              <div className="items__images">
                <h5>judul 2</h5>
                <a className="see__all">see all</a>
                <img src={oke} alt="" className="item__image" />
                <img src={oke} alt="" className="item__image" />
              </div>
              <div className="items__images">
                <h5>judul 3</h5>
                <a className="see__all">see all</a>
                <img src={oke} alt="" className="item__image" />
                <img src={oke} alt="" className="item__image" />
              </div>
              <div className="items__images">
                <h5>judul 4</h5>
                <a className="see__all">see all</a>
                <img src={oke} alt="" className="item__image" />
                <img src={oke} alt="" className="item__image" />
              </div>
              <div className="items__images">
                <h5>judul 5</h5>
                <a className="see__all">see all</a>
                <img src={oke} alt="" className="item__image" />
                <img src={oke} alt="" className="item__image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
