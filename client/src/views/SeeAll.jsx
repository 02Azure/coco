import React, { useEffect } from "react";
import "./seeAll.css";
import ShowcaseCard from "../components/ShowcaseCard";
import { useDispatch, useSelector } from "react-redux";
import { oneShow } from "../store/action";
import { useParams } from "react-router";

const SeeAll = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const showcase = useSelector((state) => state.oneShow);
  const { id } = useParams();

  useEffect(() => {
    dispatch(oneShow(+id));
  }, []);

  console.log(id, "<<<<<");

  return (
    <div className="discovery">
      <div className="discovery__container">
        <div className="row row-eq-height">
          {showcase.ShowcaseItems?.map((e, i) => (
            <ShowcaseCard fromSeeAll={true} key={i} ShowcaseId={id} see={e} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeeAll;
