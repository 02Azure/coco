import React from "react";

const WishListCard = ({ w, r, d }) => {
  console.log(w, "<<<<<<<<<<<<");
  return (
    <div className="col-md-4 align-items-stretch">
      <div className="card__item">
        <div className="card  bg-light p-2">
          <img
            src={w.image}
            alt=""
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://www.mugi.co.id/assets/images/img_def.png";
            }}
          />

          <div className="d-flex content__card mb-0 justify-content-end">
            <button onClick={() => d(w.id)} className="btn-sm btn btn-outline-success mt-2">
              Details
            </button>
            <button onClick={() => r(w.id)} className="btn-sm btn btn-outline-danger mt-2">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishListCard;
