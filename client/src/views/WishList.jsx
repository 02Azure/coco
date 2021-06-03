import ok from "../images/002.png";
import "./wishlist.css";
import WishlistForm from "../components/form.wishlist";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readWishlist, deleteWishlist, findOneUser } from "../store/action";
import { useHistory, useParams } from "react-router-dom";
import WishListCard from "./WishListCard";

export default function WishList() {
  const userId = useParams().id

  const [showForm, setShowForm] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const wishlists = useSelector((state) => state.wishlists);
  const user = useSelector((state) => state.oneUser);
  const loggedUser = JSON.parse(localStorage.getItem("userLog"));

  useEffect(() => {
    dispatch(readWishlist(userId));
  }, [wishlists]);

  useEffect(() => {
    dispatch(findOneUser(userId));
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
        <h2 className="wishlist-title">{user.username}'s  Wishlist</h2>
        { loggedUser?.id === userId &&
          <button onClick={addWishlist} className="btn-outline-primary btn mt-2">
            Add a New Item
          </button>
        }

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
