import { Modal, Button, Form } from 'react-bootstrap'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../store/action'
export default function FormAdd(props){
    const dispatch = useDispatch()
    const [item, setItem] = useState({
        name: '',
        image: '',
        price: '',
        tradeable: '',
        tradeWith: '',
        tag: '',
        description: ''
    })
    function submitForm(e){
        e.preventDefault();
        dispatch(addItem(item))
    }
    return (
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
                onChange={e => setItem({...item, name:e.target.value})}
                type="text" placeholder="user" />
            </Form.Group>
            <Form.Group>
                <Form.Label>image</Form.Label>
                <Form.Control type="text" placeholder="image" 
                onChange={e => setItem({...item, image:e.target.value})}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>price</Form.Label>
                <Form.Control type="text" placeholder="5000" 
                onChange={e => setItem({...item, price:e.target.value})}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>tradeable</Form.Label>
                <Form.Control type="text" placeholder="tradeable" 
                onChange={e => setItem({...item, tradeable:e.target.value})}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>trade with</Form.Label>
                <Form.Control type="text" placeholder="card" 
                onChange={e => setItem({...item, tradeWith:e.target.value})}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>tag</Form.Label>
                <Form.Control type="text" placeholder="rare" 
                onChange={e => setItem({...item, tag:e.target.value})}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>description</Form.Label>
                <Form.Control type="text" placeholder="a simple card"
                onChange={e => setItem({...item, description:e.target.value})}
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