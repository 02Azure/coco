import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { detailWishlist } from '../store/action'
export default function DetailWishlist(){
    const wishlist = useSelector((state) => state.wishlist)
    const userLogged = JSON.parse(localStorage.getItem('userLog'))
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        dispatch(detailWishlist(id))
    }, [id])

    function editWishlist(id){
        console.log(userLogged, 'sini');
        // console.log(id,"<<<<");if
        if(+wishlist.UserId === +userLogged.id){
            // console.log(true);
            history.push(`/editWishlist/${id}`)
        }else{
            console.log("cant edit this item");
        }
    }
    return(
        <>
            {/* <h3>{JSON.stringify(wishlist)}</h3> */}
            <img src={wishlist.image}></img>
            <button onClick={e => editWishlist(id)}>edit</button>
        </>
    )
}