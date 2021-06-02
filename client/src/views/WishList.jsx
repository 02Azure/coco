import ok from "../images/002.png";
import "./wishlist.css";
import WishlistForm from "../components/form.wishlist";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readWishlist, deleteWishlist, detailWishlist as seeDetail } from "../store/action";
import { useHistory } from "react-router-dom";
import WishListCard from "./WishListCard";

export default function WishList() {
  const [showForm, setShowForm] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const wishlists = useSelector((state) => state.wishlists);
  useEffect(() => {
    dispatch(readWishlist());
  }, [wishlists]);
  function addWishlist() {
    setShowForm(true);
  }
  function removeWishlist(id) {
    // console.log(id, "<<<");
    dispatch(deleteWishlist(id));
  }
  function detailWishlist(id) {
    console.log(id);
    dispatch(seeDetail(id));
    history.push("/detailWishlist/" + id);
  }
  return (
    <>
      <div className="container d-flex flex-column">
        <button onClick={addWishlist} className="btn-outline-primary btn mt-2">
          Create Wishlist
        </button>
        <div className="row">
          {wishlists.map((e) => {
            return (
              // <div>
              //   <img className="imgWishlist" src={wishlist.image}></img>
              //   <button onClick={(e) => removeWishlist(wishlist.id)}>delete</button>
              //   <button onClick={(e) => detailWishlist(wishlist.id)}>detail</button>
              // </div>

              <WishListCard w={e} r={(id) => removeWishlist(id)} d={(id) => detailWishlist(id)} />
            );
          })}
        </div>
      </div>
      <WishlistForm show={showForm} onHide={() => setShowForm(false)}></WishlistForm>
    </>
  );
}

{
  /* <h3>{JSON.stringify(wishlists)}</h3> */
}

{
  /* <h1>page wish list</h1> */
}
