import React, { useState } from "react";
import { switchStarItems, removeItemsFromShowcase } from "../store/action";
import "./showcaseCard.css";
import { useSelector, useDispatch } from "react-redux";
import SeeAllModal from "./SeeAllModal";

const ShowcaseCard = ({ see, ShowcaseId }) => {
  const userInfo = JSON.parse(localStorage.getItem("userLog"));

  const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();

  const star = (id) => {
    dispatch(switchStarItems({ id, ShowcaseId }));
  };
  const remove = (id) => {
    dispatch(removeItemsFromShowcase({ id, ShowcaseId }));
  };

  // console.log(see, "<<<SEE");

  const s = see.Item;

  console.log(s);

  return (
    <div className="col-md-4 align-items-stretch">
      <SeeAllModal seeAllDetail={see} show={modalShow} onHide={() => setModalShow(false)} />
      <div className="card__item">
        <div className="card  bg-light p-2">
          <img
            onClick={() => setModalShow(true)}
            src={s.image}
            alt=""
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://www.mugi.co.id/assets/images/img_def.png";
            }}
          />

          {userInfo.id == s.UserId ? (
            <div className="d-flex justify-content-start py-2">
              {see.isStarred ? (
                <div className="me-1">
                  <i style={{ color: "#FFDF00" }} onClick={() => star(see.id)} className="fas fa-star fa-lg"></i>
                </div>
              ) : (
                <div className="mx-1">
                  <i onClick={() => star(see.id)} className="far fa-star fa-lg"></i>
                </div>
              )}
              <div className="ms-1">
                <i onClick={() => remove(see.id)} className="far fa-trash-alt fa-lg"></i>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="d-flex content__card mb-0 justify-content-between">
            <strong className="card-text">Tradable</strong>
            <p className="card-text">{s.tradeable ? <i style={{ color: "green" }} className="far fa-check-circle"></i> : <i style={{ color: "red" }} className="far fa-times-circle"></i>}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 *  UserId: 1,
      name: '',
      image: 'https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1155848.jpg',
      tradeable: true,
      price: 300000,
      tradeWith: 'Playmat Yugioh San Diego Comic-Con Exclusive Yugi & Exodia Playmat',
      tag: 'Yugioh-TCG',
      description: 'Unli, NM',
 * 
 */

export default ShowcaseCard;
