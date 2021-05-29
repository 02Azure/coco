import React from "react";
import "./itemCard.css";
import Detail from "../views/Detail";

const ItemCard = ({ discovery }) => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className="col-md-4 align-items-stretch">
      <Detail discovery={discovery} show={modalShow} onHide={() => setModalShow(false)} />
      <div className="card__item">
        <div onClick={() => setModalShow(true)} className="card text-white bg-dark p-2">
          <img src={discovery.image} alt="" />
          <div className="card-body">
            <h5 className="card-title">{discovery.name}</h5>

            <div className="d-flex content__card my-1 justify-content-between">
              <strong className="card-text">Price</strong>
              <p className="card-text">{discovery.price}</p>
            </div>
            <div className="d-flex content__card my-1 justify-content-between">
              <strong className="card-text"> Tag</strong>
              <p className="card-text">Yugioh-TCG</p>
            </div>

            {/* <a href="#" className="btn item btn-primary ">
              Go somewhere
            </a> */}
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

export default ItemCard;
