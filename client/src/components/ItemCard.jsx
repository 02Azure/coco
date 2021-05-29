import React from "react";
import "./itemCard.css";
const ItemCard = () => {
  return (
    <div className=" col-md-4">
      <div className="card__item">
        <div class="card text-white bg-dark p-2">
          <img src={"https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1155781.jpg"} alt="" />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn item btn-primary ">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
