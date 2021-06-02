import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { detailWishlist } from "../store/action";

import "./detail.wislist.css";
export default function DetailWishlist() {
  const wishlist = useSelector((state) => state.wishlist);
  const userLogged = JSON.parse(localStorage.getItem("userLog"));
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(detailWishlist(id));
  }, [id]);

  function editWishlist(id) {
    console.log(userLogged, "sini");
    // console.log(id,"<<<<");if
    if (+wishlist.UserId === +userLogged.id) {
      // console.log(true);
      history.push(`/editWishlist/${id}`);
    } else {
      console.log("cant edit this item");
    }
  }
  return (
    <div className="detail__wish__fahmi">
      <div className="col-md-4 align-items-stretch mx-auto">
        <div className="card__item">
          <div className="card text-white bg-light p-2">
            <img
              src={wishlist.image}
              alt=""
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://www.mugi.co.id/assets/images/img_def.png";
              }}
            />
            <button className="btn btn-outline-success mt-2" onClick={(e) => editWishlist(id)}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
