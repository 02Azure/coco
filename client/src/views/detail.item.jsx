import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { showDetailItem, deleteItem as removeItem } from '../store/action'
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
        history.push('/profile')
    }
    return (
        <>
            {/* <h1>{JSON.stringify(data)}</h1> */}
            <div>
                <img src={data.image} alt=""/>
                <h3>{data.name}</h3>
                <h3>{data.price}</h3>
                <h3>{data.tradeWith}</h3>
                <h3>{data.tag}</h3>
                <h3>{data.description}</h3>
                <button onClick={deleteItem}>delete</button>
                <button>edit</button>
            </div>
        </>
    )
}