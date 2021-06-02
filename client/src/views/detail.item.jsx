import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { showDetailItem, deleteItem as removeItem } from '../store/action'
import  FormEditItem from '../components/formEditItem'
import './detail.item.css'
export default function DetailItemPage(){
    const history = useHistory();
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const data = useSelector((state) => state.oneItem)
    const { id } = useParams()
    useEffect(() => {
        dispatch(showDetailItem(id))
    }, [])

    function deleteItem(){
        dispatch(removeItem(id))
        history.push('/profile/' + data.UserId)
    }

    function editItem(){
        setShow(true)
    }
    return (
        <section className="detail">
            {/* <h1>{JSON.stringify(data)}</h1> */}
            <div className="container pt-5">
                <div className="row ">
                    <div className="col-12 detail__item">
                            <div className="row">
                                <div className="col-12 card__item">
                                    <h3 className="text__title">{data.name}</h3>
                                    <img className="imgDetail" src={data.image} alt=""/>
                                    <h3>Description</h3>
                                    <hr/>
                                    <h4>{data.description}</h4>
                                    <br/>
                                    <h3>Precedence</h3>
                                    <hr/>
                                    <h3>{data.tradeWith}</h3>
                                    <br/>
                                    <h3>Price</h3>
                                    <hr/>
                                    <h3>${data.price}</h3>
                                    <br/> 
                                    <h3>Tag</h3>
                                    <hr/> 
                                    <h4>{data.tag}</h4>
                                </div>
                                <div className="row">
                                        <div className="col-6">
                                            <button className="buttonDetail" onClick={deleteItem}>delete</button>
                                        </div>
                                        <div className="col-6">
                                            <button onClick={editItem} className="buttonDetail">edit</button>
                                        </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <FormEditItem show={show} onHide={e => setShow(false)} itemdetail={ data }/>
        </section>
    )
}