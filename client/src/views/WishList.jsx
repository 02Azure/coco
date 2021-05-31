import ok from '../images/002.png'
import './wishlist.css'
import WishlistForm from '../components/form.wishlist'
import { useState } from 'react'
export default function WishList(){
    const [showForm, setShowForm] = useState(false)
    function addWishlist(){
        setShowForm(true)
    }
    return(
        <>
            {/* <h1>page wish list</h1> */}
            <div className="container">
                <div className="row rowImg">
                    <div className="col gridImg">
                        <div>
                            <img 
                            className="imgWishlist"
                            src={ok}></img>
                            <button>delete</button>
                            <button>edit</button>
                        </div>
                        <div>
                            <img 
                            className="imgWishlist"
                            src={ok}></img>
                        </div>
                        <div>
                            <img 
                            className="imgWishlist"
                            src={ok}></img>
                        </div>
                        <div>
                            <img 
                            className="imgWishlist"
                            src={ok}></img>
                        </div>
                        <div>
                            <img 
                            className="imgWishlist"
                            src={ok}></img>
                        </div>
                    </div>
                    <button 
                    onClick={addWishlist}
                    className="btnAdd">Create Wishlist</button>
                </div>
            </div>
            <WishlistForm
            show={showForm}
            onHide={() => setShowForm(false)}
            ></WishlistForm>
        </>
    )
}