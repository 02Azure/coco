import React, { useEffect } from "react";
import "./seeAll.css";
import ShowcaseCard from "../components/ShowcaseCard";
import { useDispatch, useSelector } from "react-redux";
import { oneShow } from "../store/action";
import { useParams, useHistory } from "react-router";

const SeeAll = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const loading = useSelector((state) => state.loading);
  const showcase = useSelector((state) => state.oneShow);
  const { id } = useParams();

  useEffect(() => {
    dispatch(oneShow(+id));
  }, []);

  return (
    <div className="discovery showcase-container">
      <div className="showcase-header">
        <h2 className="wishlist-title">{showcase.name} Showcase</h2>
        <button className="btn btn-primary return-button" onClick={() => { history.push(`/profile/${showcase.UserId}`) } }>Back to User</button>
      </div>

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
