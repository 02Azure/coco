import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import "./discovery.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { getDisco } from "../store/action";
import shuffle from "../helpers/shuffle"

const Discovery = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const items = useSelector((state) => state.items);
  const discovery = useSelector((state) => state.discovery);
  const [input, setInput] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    dispatch(getDisco());
  }, []);

  if (loading) {
    return (
      <Loader
        type="TailSpin"
        color="#00BFFF"
        className="loader"
        height={100}
        width={100}
        timeout={5000} //3 secs
      />
    );
  }

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  let shuffledDiscovery = []

  if(discovery.length) {
    shuffledDiscovery = shuffle(discovery)
  }

  return (
    <div className="discovery">
      <div className="discovery__container pt-2">
        <h1 className="discovery-title">Discovery</h1>
        <h4 className="discovery-sub">Explore what other collectors have</h4>
        <form style={{ width: "32%" }} className="d-flex mx-auto">
          <input className="form-control " type="search" placeholder="Search..." onChange={(e) => handleChange(e)}></input>
        </form>
        <div className="row row-eq-height">
          {shuffledDiscovery
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
        <div className="scroll-to-top">
          {isVisible && (
            <div onClick={scrollToTop}>
              <button className="goToTop">
                {" "}
                <img
                  className="imgTop"
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMSAyLjIwNmwtNi4yMzUgNy41MjgtLjc2NS0uNjQ1IDcuNTIxLTkgNy40NzkgOS0uNzY0LjY0Ni02LjIzNi03LjUzdjIxLjg4NGgtMXYtMjEuODgzeiIvPjwvc3ZnPg=="
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discovery;
