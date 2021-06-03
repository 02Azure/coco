import ok from "../images/002.png";
import "./wishlist.css";
import WishlistForm from "../components/form.wishlist";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readWishlist, deleteWishlist, findOneUser } from "../store/action";
import { useHistory } from "react-router-dom";
import WishListCard from "./WishListCard";

export default function WishList() {
  const [showForm, setShowForm] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const wishlists = useSelector((state) => state.wishlists);
  const user = useSelector((state) => state.oneUser);
  const test = JSON.parse(localStorage.getItem("userLog"));
  useEffect(() => {
    dispatch(readWishlist(user.id));
  }, [wishlists]);
  useEffect(() => {
    dispatch(findOneUser(test.id));
  }, []);
  function addWishlist() {
    setShowForm(true);
  }
  function removeWishlist(id) {
    dispatch(deleteWishlist(id));
  }
  function detailWishlist(id) {
    // console.log(id);
    // dispatch(seeDetail(id));
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
            return <WishListCard w={e} r={(id) => removeWishlist(id)} d={(id) => detailWishlist(id)} />;
          })}
        </div>
        <WishlistForm show={showForm} onHide={() => setShowForm(false)}></WishlistForm>
      </div>
    </>
  );
}
