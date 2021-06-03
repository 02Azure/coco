import { Modal, Button, Form } from 'react-bootstrap'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addWishlist } from '../store/action'
export default function WishlistForm(props){
    const [wishlist, setWishlist] = useState({
        name: '',
        image: '',
        price: '',
        tag: '',
        description: ''
    })
    const dispatch = useDispatch()
    function submitForm(){
        // console.log(wishlist);
        dispatch(addWishlist(wishlist))
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
            Add a Item
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                onChange={e => setWishlist({...wishlist, name:e.target.value})}
                type="text" placeholder="Name of the item you want" />
            </Form.Group>
            <Form.Group>
                <Form.Label>image URL</Form.Label>
                <Form.Control type="text" placeholder="ex: https://i.imgur.com/qjIemZX.png" 
                onChange={e => setWishlist({...wishlist, image:e.target.value})}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>price</Form.Label>
                <Form.Control type="text" placeholder="In Rp currency" 
                onChange={e => setWishlist({...wishlist, price:e.target.value})}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>tag</Form.Label>
                <Form.Control type="text" placeholder="example: figure, yugioh" 
                onChange={e => setWishlist({...wishlist, tag:e.target.value})}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>description</Form.Label>
                <Form.Control type="text" placeholder="a simple card"
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