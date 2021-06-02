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
    console.log(isLoading, "<< is loading line 13 ");

    useEffect(() => {
        dispatch(detailWishlist(id))
    }, [])

    function editWishlist(){
        setShow(true)
    }

    // if(isLoading){
    //     return (
    //         <div className="loading__discovery">
    //             <h3 className="text-center">Please Wait...</h3>
    //         </div>
    //     );
    // }
    return(
        <section className="wishlistSection">
            <div className="wishlistColor"></div>
            <div className="wishlistColor"></div>
            <div className="wishlistColor"></div>
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
                                <h3 className="titleWishlist">{wishlist.name}</h3>
                                <hr/>
                                <br/>
                                <p>{wishlist.description}</p>
                                <br/>
                                <p>price:    {wishlist.price}</p>
                                <p>tag: {wishlist.tag}</p>
                                <button className="btnEdit" onClick={e => editWishlist(id)}>EDIT</button>
                            </div>
                        </div>
                    </div>
                </div>
                <WishlistForm show={show} onHide={() => setShow(false)} data={wishlist}/>
            </div>
        </section>
    )
}