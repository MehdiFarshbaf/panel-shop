import {Fragment, useEffect} from "react"
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import AddOrEditProduct from "@src/views/Product/AddOrEditProduct"
import {getAllCategories} from "@store/feature/categorySlice"
import Loading from "@src/views/ui-elements/Loading/Loading"
import {getProduct} from "@store/feature/ProductSlice"


const AddEditProduct = () => {

    //variable
    const {id} = useParams()
    const {product, loading} = useSelector(state => state.products)
    const dispatch = useDispatch()

    //functions
    useEffect(() => {
        if (id) {
            dispatch(getProduct(id))
        }
        dispatch(getAllCategories())
    }, [])

    return (
        <Fragment>
            {loading ? <Loading/> :
                id && product !== null && product !== undefined ?
                    <AddOrEditProduct currentData={product} isEdit={true}/> : id === undefined &&
                    <AddOrEditProduct isEdit={false}/>
            }
        </Fragment>

    )
}
export default AddEditProduct