import { Modal, Button, Form } from 'react-bootstrap'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { detailWishlist, editWishlist } from '../store/action'
export default function EditWishlist(){
    const wishlistUser = useSelector((state) => state.wishlist)
    const history = useHistory();
    const [wishlist, setWishlist] = useState({
        name: '',
        image: '',
        price: '',
        tag: '',
        description: ''
    })
    const dispatch = useDispatch()
    const id  = wishlistUser.id

    useEffect(() => {
        dispatch(detailWishlist(id))
    }, [id])
    
    function updateWishlist(e){
        e.preventDefault()
        const data = {
            ...wishlist
        }
        const updated = {
            id: id,
            data
        }
        dispatch(editWishlist(updated))
        // console.log(data);
        history.push('/wishlist')
    }
    return(
        <>
            {/* <h1>{JSON.stringify(wishlistUser)}</h1> */}
            <div className="container">
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                        // value={wishlistUser.name}
                        onChange={e => setWishlist({...wishlist, name:e.target.value})}
                        type="text" placeholder={wishlistUser.name} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>image</Form.Label>
                        <Form.Control type="text" placeholder={wishlistUser.image} 
                        onChange={e => setWishlist({...wishlist, image:e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>price</Form.Label>
                        <Form.Control type="text" placeholder={wishlistUser.price} 
                        onChange={e => setWishlist({...wishlist, price:e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>tag</Form.Label>
                        <Form.Control type="text" placeholder={wishlistUser.tag} 
                        onChange={e => setWishlist({...wishlist, tag:e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>description</Form.Label>
                        <Form.Control type="text" placeholder={wishlistUser.description}
                        onChange={e => setWishlist({...wishlist, description:e.target.value})}
                        />
                    </Form.Group>
                    <button onClick={updateWishlist}>update</button>
                </Form>
            </div>
        </>
    )
}