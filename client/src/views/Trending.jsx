import React, { useEffect } from "react";
import { getWish } from "../store/action";
import ItemCard from "../components/ItemCard";
import "./trending.css";

import { useSelector, useDispatch } from "react-redux";

const Trending = () => {
  const wish = useSelector((state) => state.wish);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWish());
  }, []);

  console.log(wish);
  return (
    <div className="trending">
      <div className="trending__container">
        <div className="row">
          {wish.map((e, i) => (
            <ItemCard data={e} wish={true} key={i}></ItemCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;
