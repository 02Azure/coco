import React from "react";
import TrendingDetail from "../views/TrendingDetail";
import "./trending.css";

const TrendingCard = ({ data }) => {
  const [modalShow, setModalShow] = React.useState(false);

  console.log(data, "trending!!!!");

  console.log(data, "TRENDINGGG");

  return (
    <div className="col-md-4 align-items-stretch">
      <TrendingDetail trending={data} show={modalShow} onHide={() => setModalShow(false)} />

      <div onClick={() => setModalShow(true)} className="card__item">
        <div className="card bg-light p-2 d-flex justify-content-between">
          <div className="card-image-container"> 
            <img
              src={data.image}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://www.mugi.co.id/assets/images/img_def.png";
              }}
              alt=""
            />
          </div>

          <div className="card-body pb-0">
            <div className="d-flex content__card mb-0 justify-content-between">
              <strong className="card-text">With:</strong>
              <p className="card-text">Rp. {data.price}</p>
            </div>
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

export default TrendingCard;
