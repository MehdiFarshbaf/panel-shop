import {Fragment, useEffect} from "react"
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import Loading from "@src/views/ui-elements/Loading/Loading"
import {getFAQ} from "@store/feature/faqSlice"
import AddOrEditFAQ from "@src/views/faqs/AddOrEditFAQ"

const AddEditFAQ = () => {

    //variable
    const {id} = useParams()
    const {faq, loading} = useSelector(state => state.faqs)
    const dispatch = useDispatch()

    //functions
    useEffect(() => {
        if (id) {
            dispatch(getFAQ(id))
        }
    }, [])

    return (
        <Fragment>
            {loading ? <Loading/> :
                id && faq !== null && faq !== undefined ?
                    <AddOrEditFAQ currentData={faq} isEdit={true}/> : id === undefined &&
                    <AddOrEditFAQ isEdit={false}/>
            }
        </Fragment>
    )
}
export default AddEditFAQ