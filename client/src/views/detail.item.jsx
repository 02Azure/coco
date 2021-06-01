import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { showDetailItem, deleteItem as removeItem } from '../store/action'
import './detail.item.css'
export default function DetailItemPage(){
    const history = useHistory();
    const dispatch = useDispatch()
    const data = useSelector((state) => state.oneItem)
    const { id } = useParams()
    useEffect(() => {
        dispatch(showDetailItem(id))
    }, [id])

    function deleteItem(){
        dispatch(removeItem(id))
        // history.push('/profile/' + JSON.parse(localStorage.getItem('userLog')).id)
    }
    return (
        <>
            {/* <h1>{JSON.stringify(data)}</h1> */}
            <div className="container">
                <div className="row">
                    <div className="col-md-4 detail__item">
                        qw
                    </div>
                    <div className="col-md-8 img__item">
                        qwssd
                    </div>
                </div>
                
            </div>
        </>
    )
}