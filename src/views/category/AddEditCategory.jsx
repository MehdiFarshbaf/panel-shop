import {Fragment, useEffect} from "react"
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import {getCategory} from "@store/feature/categorySlice"
import AddOrEditCategory from "@src/views/category/AddOrEditCategory";

const AddEditCategory = () => {

    //variable
    const {id} = useParams()
    const {category} = useSelector(state => state.categories)
    const dispatch = useDispatch()

    //functions
    useEffect(() => {
        if (id) {
            dispatch(getCategory(id))
        }
    }, [])

    return (
        <Fragment>
            {
                id && category !== null && category !== undefined ?
                    <AddOrEditCategory currentData={category} isEdit={true}/> : id === undefined &&
                    <AddOrEditCategory isEdit={false}/>
            }
        </Fragment>
    )
}
export default AddEditCategory