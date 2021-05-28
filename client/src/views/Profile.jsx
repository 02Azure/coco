import React from "react";

import "./profile.css";

import image from ".././images/bg_1.jpg";

import oke from ".././images/002.png";

export const Profile = () => {
  return (
    <section className="profile">
      <div className="header__image__container">
        <img src={image} alt="" className="header__image" />
      </div>

      <div className="profile__container row">
        {/* user info */}

        <div className="user__container col-md-4 p-3">
          <div>
            <img src={oke} alt="" className="header__image" />
          </div>

          <div className="username">
            <p>username</p>
          </div>

          <div className="bio">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo iste pariatur explicabo aperiam. Dolores, quia!</p>
          </div>

          <div className="location">
            <p>location</p>
          </div>
        </div>

        <div className="showcase col-md-8 p-3">
          {/* button2 */}
          <div className="buttons">
            <button className="btn">shocse</button>

            <button className="btn">items</button>

            <button className="btn">watchlists</button>

            <button className="btn">add shocase</button>
          </div>

          {/* list shocases */}

          <div className="showcase__container">
            <div className="showcase__buttons">
              <h4 className="showcase__name">title</h4>

              <a className="see__all">see all</a>
            </div>

            <div className="items__container">
              <div>
                <h5>name</h5>

                <img src={oke} alt="" className="item__image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
