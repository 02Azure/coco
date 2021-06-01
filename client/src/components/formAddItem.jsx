import { Modal, Button, Form } from 'react-bootstrap'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addItem, editItem} from '../store/action'
export default function FormAdd(props){
    const dispatch = useDispatch()
    const { pathname } = props
    const [select, setSelect] = useState([true,false])
    const [itemAdd, setItemAdd] = useState({
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
        dispatch(addItem(itemAdd))
    }
    function test(e){
        // console.log(e.target.value," <<<<");
        const choosen = e.target.value
        setItemAdd({
            ...itemAdd,
            tradeable: choosen
        })
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
            {pathname === 'profile' ? 'Add a Item' : 'Edit a Item'}
            
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {pathname === 'profile' &&
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                        onChange={e => setItemAdd({...itemAdd, name:e.target.value})}
                        type="text" placeholder="user" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>image</Form.Label>
                        <Form.Control type="text" placeholder="image" 
                        onChange={e => setItemAdd({...itemAdd, image:e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>price</Form.Label>
                        <Form.Control type="text" placeholder="5000" 
                        onChange={e => setItemAdd({...itemAdd, price:e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>tradeable</Form.Label> <br/>
                        <select onChange={test}>
                            <option>--- Trade Item ---</option>
                            {
                                select.map((choose, index) => {
                                    return (
                                        <>
                                            <option
                                            key={index}
                                            value={choose}
                                            >{JSON.stringify(choose)}</option>
                                        </>
                                    )
                                })
                            }
                        </select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>trade with</Form.Label>
                        <Form.Control type="text" placeholder="card" 
                        onChange={e => setItemAdd({...itemAdd, tradeWith:e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>tag</Form.Label>
                        <Form.Control type="text" placeholder="rare" 
                        onChange={e => setItemAdd({...itemAdd, tag:e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>description</Form.Label>
                        <Form.Control type="text" placeholder="a simple card"
                        onChange={e => setItemAdd({...itemAdd, description:e.target.value})}
                        />
                    </Form.Group>
                </Form>
            }
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" type="submit"
            onClick={submitForm}
            >
                {pathname === 'profile' ? 'Submit' : 'Update'}
            </Button>
            <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
        </Modal>
    )
}