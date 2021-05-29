import { Modal, Button } from 'react-bootstrap'

export default function ChatModalBox(props){
    return(
        <Modal
        {...props}
        // size=""
        fullscreen={true}
        >
            <Modal.Header closeButton>
                <Modal.Title>Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>Modal body content</Modal.Body>
        </Modal>
    )
}