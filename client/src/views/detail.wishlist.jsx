import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { detailWishlist } from '../store/action'
import WishlistForm from '../components/edit.wishlist'
import './detail.wishlist.css'
export default function DetailWishlist(){
    const [show, setShow] = useState(false)
    const wishlist = useSelector((state) => state.wishlist)
    const isLoading = useSelector((state) => state.loading)
    const dispatch = useDispatch()
    const { id } = useParams()
    const userLogged = JSON.parse(localStorage.getItem("userLog"));

    useEffect(() => {
        dispatch(detailWishlist(id))
    }, [])

    function editWishlist(){
        setShow(true)
    }

    const x = wishlist.price;

    var formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  
    const uang = formatter.format(+x);

    return(
        <section className="wishlistSection">
            <h2 className="wishlist-title">Wishlist Item Detail</h2>
            <div className="box">
                <div className="wishlistContainer">
                    <div className="row test">
                        <div className="col-6 p-3">
                            <img 
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://www.mugi.co.id/assets/images/img_def.png";
                            }}
                            src={wishlist.image} className="wishlistImage"></img>
                        </div>
                        <div className="col-6 p-3 contentDesc">
                          <div className="wishlistDesc">
                          <div>
                            <p className="fst-italic fw-bold">Name</p>
                            {wishlist.name}
                          </div>
                          <div>
                            <p className="fst-italic fw-bold">Description</p>
                            {wishlist.description}
                          </div>
                          <div>
                            <p className="fst-italic fw-bold">Tag</p>
                            {wishlist.tag}
                          </div>
                        
                          <div>
                            <p className="fst-italic fw-bold">Price</p>
                            {uang}
                          </div>
                          { userLogged?.id == wishlist.UserId &&
                            <button onClick={e => editWishlist(id)} className="btn btn-outline-primary">Edit</button>
                          }
                            </div>
                        </div>
                    </div>
                </div>
                <WishlistForm show={show} onHide={() => setShow(false)} data={wishlist}/>
            </div>
        </section>
    )
}
