import { Modal, Button, Form } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { editItem} from '../store/action'
import { useHistory } from  'react-router-dom'

export default function FormEditItem(props){
    const dispatch = useDispatch()
    const history = useHistory()
    const itemdetail = useSelector((state) => state.oneItem)
    
    const [select, setSelect] = useState([true,false])
    
    const [item, setItem] = useState({
        name: itemdetail.name,
        image: itemdetail.image,
        price: itemdetail.price,
        tradeable: itemdetail.tradeable,
        tradeWith: itemdetail.tradeWith,
        tag: itemdetail.tag,
        description: itemdetail.description
    })

    useEffect(() => {
      setItem({
        name: itemdetail.name,
        image: itemdetail.image,
        price: itemdetail.price,
        tradeable: itemdetail.tradeable,
        tradeWith: itemdetail.tradeWith,
        tag: itemdetail.tag,
        description: itemdetail.description
      })
    },[itemdetail])

    function submitForm(e){
        e.preventDefault();
        // console.log(itemdetail);
        // console.log(item, "item");
        dispatch(editItem({
            updated : item,
            id: itemdetail.id
        }))
        props.onHide()
        history.push('/profile/' + itemdetail.UserId)
    }

    function selectTradeable(e){
        setItem({
            ...item,
            tradeable: e.target.value
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
                Edit this Item
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* <p>{JSON.stringify(data)}</p> */}
            <p>{JSON.stringify(item)}</p>
            <Form>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    value={item.name}
                    onChange={e => setItem({...item, name: e.target.value})}
                    type="text" placeholder="user" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>image</Form.Label>
                    <Form.Control 
                    value={item.image}
                    onChange={e => setItem({...item, image: e.target.value})}
                    type="text" placeholder="image" 
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>price</Form.Label>
                    <Form.Control 
                    value={item.price}
                    onChange={e => setItem({...item, price: e.target.value})}
                    type="text" placeholder="5000"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>tradeable</Form.Label>
                    <br/>
                    <select onChange={selectTradeable}>
                        <option>-- Trade Item ---</option>
                        {
                            select.map((choose, index) => {
                                return(
                                    <>
                                        <option
                                        key={index}
                                        value={itemdetail.tradeable}>
                                        {JSON.stringify(choose)}
                                        </option>
                                    </>
                                )
                            })
                        }
                    </select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>trade with</Form.Label>
                    <Form.Control 
                    value={item.tradeWith}
                    onChange={e => setItem({...item, tradeWith: e.target.value})}
                    type="text" placeholder="card" 
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>tag</Form.Label>
                    <Form.Control 
                    value={item.tag}
                    onChange={e => setItem({...item, tag: e.target.value})}
                    type="text" placeholder="rare"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>description</Form.Label>
                    <Form.Control 
                    value={item.description}
                    onChange={e => setItem({...item, description: e.target.value})}
                    type="text" placeholder="a simple card"
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" type="submit"
            onClick={submitForm}
            >
                Update
            </Button>
            <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
        </Modal>
    )
}