import ok from "../images/002.png";
import "./wishlist.css";
import WishlistForm from "../components/form.wishlist";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readWishlist, deleteWishlist, findOneUser } from "../store/action";
import { useHistory } from "react-router-dom";
export default function WishList() {
  const [showForm, setShowForm] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const wishlists = useSelector((state) => state.wishlists);
  const user = useSelector((state) => state.oneUser)
  const test = JSON.parse(localStorage.getItem('userLog'))
  useEffect(() => {
    dispatch(readWishlist());
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
        {/* <h1>page wish list</h1> */}
        <div className="container">
          {/* <h3>{JSON.stringify(wishlists)}</h3> */}
          <div className="row rowImg">
            <div className="col gridImg">
              {wishlists.map((wishlist) => {
                if(wishlist.UserId === user.id){
                  return (
                    <div>
                      <img 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://www.mugi.co.id/assets/images/img_def.png";
                      }}
                      className="imgWishlist" src={wishlist.image}></img>
                      <button onClick={(e) => removeWishlist(wishlist.id)}>delete</button>
                      <button onClick={(e) => detailWishlist(wishlist.id)}>detail</button>
                    </div>
                  );
                }
              })}
            </div>
            <button onClick={addWishlist} className="btnAdd">
              Create Wishlist
            </button>
          </div>
        </div>
        <WishlistForm show={showForm} onHide={() => setShowForm(false)}></WishlistForm>
      </>
    );
  
}
