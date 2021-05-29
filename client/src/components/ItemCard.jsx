import React from "react";
import "./itemCard.css";
const ItemCard = () => {
  return (
    <div className=" col-md-4">
      <div className="card__item">
        <div class="card text-white bg-dark p-2">
          <img src={"https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1155781.jpg"} alt="" />
          <div class="card-body">
            <h5 class="card-title">Right Leg of the Forbidden One UR LOB</h5>

            <div className="d-flex content__card my-1 justify-content-between">
              <strong class="card-text">Price</strong>
              <p class="card-text">200</p>
            </div>
            <div className="d-flex content__card my-1 justify-content-between">
              <strong class="card-text"> Tag</strong>
              <p class="card-text">Yugioh-TCG</p>
            </div>

            {/* <a href="#" class="btn item btn-primary ">
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
