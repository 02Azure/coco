import React from "react";
import oke from ".././images/002.png";

const ShowCase = () => {
  return (
    <div className="items__images m-1 d-flex flex-column">
      <div className="d-flex justify-content-between p-2 align-items-start">
        <h5>judul 1</h5>
        <a className="">see all</a>
      </div>

      <div className="d-flex">
        <div className="items__showcase p-2 m-1">
          <img src={oke} alt="" className="item__image" />
        </div>
        <div className="items__showcase p-2 m-1">
          <img src={oke} alt="" className="item__image" />
        </div>
      </div>
    </div>
  );
};

export default ShowCase;
