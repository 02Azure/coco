import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { showDetailItem, deleteItem as removeItem } from '../store/action'
import  FormEditItem from '../components/formEditItem'
import Swal from 'sweetalert2'
import './detail.item.css'
export default function DetailItemPage(){
    const history = useHistory();
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const data = useSelector((state) => state.oneItem)
    const isLoading = useSelector((state) => state.loading)
    const { id } = useParams()
    useEffect(() => {
        dispatch(showDetailItem(id))
    }, [id])

    function deleteItem(){
        dispatch(removeItem(id))
        history.push('/profile/' + data.UserId)
    }

    function editItem(){
        setShow(true)
    }

    if(isLoading){
        return(
            <div className="loading__discovery">
                <h3 className="text-center">Please Wait...</h3>
            </div>
        )
    }
    return (
        <section className="wishlistSection">
            <div className="wishlistColor"></div>
            <div className="wishlistColor"></div>
            <div className="wishlistColor"></div>
            <div className="box">
                <div className="wishlistContainer">
                    <div className="row test">
                        <div className="col-6 p-3">
                            <img 
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://www.mugi.co.id/assets/images/img_def.png";
                            }}
                            src={data.image} 
                            className="wishlistImage"></img>
                        </div>
                        <div className="col-6 p-3 contentDesc">
                            <div className="wishlistDesc">
                                <h3 className="titleWishlist">
                                    {data.name}
                                </h3>
                                <hr/>
                                <br/>
                                <p>
                                    {data.description}
                                </p>
                                <br/>
                                <p>
                                    price:{data.price}
                                </p>
                                <p>
                                    tag: {data.tag}
                                </p>
                                <button 
                                onClick={editItem}
                                className="btnEdit">EDIT</button>
                                <button 
                                onClick={deleteItem}
                                className="btnEdit">DELETE</button>
                            </div>
                        </div>
                    </div>
                </div>
                <FormEditItem show={show} onHide={() => setShow(false)} 
                data={data}
                />
            </div>
        </section>
    )
}