import React from "react";
import ItemCard from "../components/ItemCard";
import "./trending.css";

const Trending = () => {
  return (
    <div className="trending">
      <div className="trending__container">
        <div className="row">
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </div>
      </div>
    </div>
  );
};

export default Trending;
