import {Fragment, useEffect} from "react"
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import AddOrEditPost from "@src/views/posts/AddOrEditPost"
import {getPost} from "@store/feature/postSlice"
import {getAllCategories} from "@store/feature/categorySlice"
import Loading from "@src/views/ui-elements/Loading/Loading"


const AddEditPost = () => {

    //variable
    const {id} = useParams()
    const {post, loading} = useSelector(state => state.posts)
    const dispatch = useDispatch()

    //functions
    useEffect(() => {
        if (id) {
            dispatch(getPost(id))
        }
        dispatch(getAllCategories())
    }, [])

    return (
        <Fragment>
            {loading ? <Loading/> :
                id && post !== null && post !== undefined ?
                    <AddOrEditPost currentData={post} isEdit={true}/> : id === undefined &&
                    <AddOrEditPost isEdit={false}/>
            }
        </Fragment>
        // <Fragment>
        //     {
        //         id && post !== null && post !== undefined ?
        //             <AddOrEditPost currentData={post} isEdit={true}/> : id === undefined &&
        //             <AddOrEditPost isEdit={false}/>
        //     }
        // </Fragment>
    )
}
export default AddEditPost