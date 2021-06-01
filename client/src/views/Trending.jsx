import React, { useEffect } from "react";
import { getWish } from "../store/action";
import "./trending.css";

import { useSelector, useDispatch } from "react-redux";
import TrendingCard from "../components/TrendingCard";

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
            <TrendingCard data={e} key={i}></TrendingCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;
