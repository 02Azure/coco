import React from "react";
import ItemCard from "../components/ItemCard";
import "./discovery.css";

const Discovery = () => {
  return (
    <div className="discovery">
      <div className="discovery__container">
        <div className="row">
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </div>
      </div>
    </div>
  );
};

export default Discovery;
