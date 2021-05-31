import { Modal, Button, Form } from 'react-bootstrap'
import { useState } from 'react'
export default function FormAdd(props){

    function submitForm(e){
        e.preventDefault();
        // console.log('hsai');
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
                <Form.Control type="text" placeholder="user" />
            </Form.Group>
            <Form.Group>
                <Form.Label>image</Form.Label>
                <Form.Control type="text" placeholder="image" />
            </Form.Group>
            <Form.Group>
                <Form.Label>price</Form.Label>
                <Form.Control type="text" placeholder="5000" />
            </Form.Group>
            <Form.Group>
                <Form.Label>tradeable</Form.Label>
                <Form.Control type="text" placeholder="tradeable" />
            </Form.Group>
            <Form.Group>
                <Form.Label>trade with</Form.Label>
                <Form.Control type="text" placeholder="card" />
            </Form.Group>
            <Form.Group>
                <Form.Label>tag</Form.Label>
                <Form.Control type="text" placeholder="rare" />
            </Form.Group>
            <Form.Group>
                <Form.Label>description</Form.Label>
                <Form.Control type="text" placeholder="a simple card" />
            </Form.Group>
            <Button variant="primary" type="submit"
            onClick={submitForm}
            >
                Submit
            </Button>
        </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
        </Modal>
    )
}