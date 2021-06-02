import { Modal, Button, Form } from 'react-bootstrap'
import { useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { editWishlist, detailWishlist } from '../store/action'
export default function WishlistForm(props){
    const { data } = props
    const [wishlist, setWishlist] = useState({
        name: data.name,
        image: data.image,
        price: data.price,
        tag: data.tag,
        description: data.description
    })
    useEffect(() => {
        dispatch(detailWishlist(data.id))
    }, [data.id])
    const dispatch = useDispatch()
    function submitForm(){
        console.log(data);
        const updated = {
            data : {...wishlist},
            id: data.id
        }
        dispatch(editWishlist(updated))
        props.onHide()
    }
    return(
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
            Edit Wishlist
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                value={wishlist.name}
                onChange={e => setWishlist({...wishlist, name:e.target.value})}
                type="text" placeholder="user" />
            </Form.Group>
            <Form.Group>
                <Form.Label>image</Form.Label>
                <Form.Control 
                value={wishlist.image}
                onChange={e => setWishlist({...wishlist, image:e.target.value})}
                type="text" placeholder="image" 
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>price</Form.Label>
                <Form.Control value={wishlist.price} type="text" placeholder="5000" 
                onChange={e => setWishlist({...wishlist, price:e.target.value})}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>tag</Form.Label>
                <Form.Control value={wishlist.tag} type="text" placeholder="rare" 
                onChange={e => setWishlist({...wishlist, tag:e.target.value})}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>description</Form.Label>
                <Form.Control value={wishlist.description} type="text" placeholder="a simple card"
                onChange={e => setWishlist({...wishlist, description:e.target.value})}
                />
            </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" type="submit"
            onClick={submitForm}
            >
                Submit
            </Button>
            <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
        </Modal>
    )
}