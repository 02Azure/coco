import React, { useEffect } from "react";
import ItemCard from "../components/ItemCard";
import "./discovery.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../store/action";

const Discovery = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const items = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  if (loading) {
    return (
      <div className="loading__discovery">
        <h3 className="text-center">Please Wait...</h3>
      </div>
    );
  }

  console.log(items);
  return (
    <div className="discovery">
      <div className="discovery__container">
        <div className="row row-eq-height">
          {items.map((e, i) => (
            <ItemCard key={i} discovery={e} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discovery;
