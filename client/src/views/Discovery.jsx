import React from "react";
import "./discovery.css";
import poke from ".././images/002.png";
const Discovery = () => {
  return (
    <div className="discovery">
      <div className="discovery__container">
        <div className="row">
          <div className=" col-md-4">
            <div className="photos">
              <img src={"https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1155781.jpg"} alt="" />{" "}
            </div>
          </div>

          <div className=" col-md-4">
            <div className="photos">
              <img src={"https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1155781.jpg"} alt="" />{" "}
            </div>
          </div>

          <div className=" col-md-4">
            <div className="photos">
              <img src={"https://52f4e29a8321344e30ae-0f55c9129972ac85d6b1f4e703468e6b.ssl.cf2.rackcdn.com/products/pictures/1155781.jpg"} alt="" />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discovery;
