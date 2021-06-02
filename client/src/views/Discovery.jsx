import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import "./discovery.css";

import { useDispatch, useSelector } from "react-redux";
import { getDisco } from "../store/action";
// import { fetchItems } from "../store/action";

const Discovery = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const items = useSelector((state) => state.items);
  const discovery = useSelector((state) => state.discovery);
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(getDisco());
  }, []);

  if (loading) {
    return (
      <div className="loading__discovery">
        <h3 className="text-center">Please Wait...</h3>
      </div>
    );
  }

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // const a = discovery.filter((e) => e.Item.id == 3);

  // console.log(a, "<<<");

  return (
    <div className="discovery">
      <div className="discovery__container pt-2">
        <form style={{ width: "32%" }} className="d-flex mx-auto">
          <input className="form-control " type="search" placeholder="Search..." onChange={(e) => handleChange(e)}></input>
        </form>
        <div className="row row-eq-height">
          {discovery
            .filter((e) => {
              if (input == "") {
                return e;
              } else if (e.Item.name.toLowerCase().includes(input.toLowerCase()) || e.Item.tag.toLowerCase().includes(input.toLowerCase())) {
                return e;
              }
            })
            .map((e, i) => (
              <ItemCard key={i} discovery={e.Item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Discovery;
