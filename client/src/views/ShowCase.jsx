import React, { useState } from "react";
import oke from ".././images/002.png";

const ShowCase = () => {
  const [all, setAll] = useState(false);
  return (
    <div className="items__images m-1 d-flex flex-column">
      <div className="d-flex justify-content-between p-2 align-items-start">
        <h5>judul 1</h5>
        <a onClick={() => setAll(!all)}>see all</a>
      </div>

      {!all ? (
        <div className="row justify-content-center">
          <div className="col-md-4 mx-auto">
            <img src={oke} alt="" className="item__image" />
          </div>
          <div className="col-md-4">
            <img src={oke} alt="" className="item__image" />
          </div>
          <div className="col-md-4">
            <img src={oke} alt="" className="item__image" />
          </div>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-4 mx-auto">
            <img src={oke} alt="" className="item__image" />
          </div>
          <div className="col-md-4">
            <img src={oke} alt="" className="item__image" />
          </div>
          <div className="col-md-4">
            <img src={oke} alt="" className="item__image" />
          </div>
          <div className="col-md-4">
            <img src={oke} alt="" className="item__image" />
          </div>
          <div className="col-md-4">
            <img src={oke} alt="" className="item__image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowCase;
