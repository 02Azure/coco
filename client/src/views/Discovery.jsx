import React, { useEffect } from "react";
import ItemCard from "../components/ItemCard";
import "./discovery.css";

import { useDispatch, useSelector } from "react-redux";
import { getDisco } from "../store/action";

const Discovery = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const items = useSelector((state) => state.items);
  const discovery = useSelector((state) => state.discovery);
  useEffect(() => {
    dispatch(getDisco());
  }, []);

  console.log(discovery, "DISCOO");

  if (loading) {
    return (
      <div className="loading__discovery">
        <h3 className="text-center">Please Wait...</h3>
      </div>
    );
  }

  return (
    <div className="discovery">
      <div className="discovery__container">
        <div className="row row-eq-height">
          {discovery.map((e, i) => (
            <ItemCard key={i} discovery={e.Item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discovery;
