import React, { useEffect, useState } from "react";
import { getWish } from "../store/action";
import "./trending.css";

import { useSelector, useDispatch } from "react-redux";
import TrendingCard from "../components/TrendingCard";

const Trending = () => {
  const wish = useSelector((state) => state.wish);
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(getWish());
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="trending">
      <div className="trending__container">
        <h1 className="discovery-title">In Demand</h1>
        <h4 className="discovery-sub">Find out what other collectors want</h4>
        <form style={{ width: "32%" }} className="d-flex mx-auto">
          <input className="form-control " type="search" placeholder="Search..." onChange={(e) => handleChange(e)}></input>
        </form>
        <div className="row">
          {wish
            .filter((e) => {
              if (input == "") {
                return e;
              } else if (e.name.toLowerCase().includes(input.toLowerCase()) || e.tag.toLowerCase().includes(input.toLowerCase())) {
                return e;
              }
            })
            .map((e, i) => (
              <TrendingCard data={e} key={i}></TrendingCard>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;
