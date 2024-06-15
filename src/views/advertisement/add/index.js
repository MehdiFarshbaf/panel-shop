// ** Invoice Add Components
import AddCard from "./AddCard"

// ** Reactstrap Imports
import { Col, Row } from "reactstrap"

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/base/pages/app-invoice.scss"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getData } from "@src/views/categories/store"

const AddPage = () => {
     const dispatch = useDispatch()
     const store = useSelector(state => state.categories)
     
     useEffect(() => {
          dispatch(
               getData()
          )
     }, [dispatch, store.data.length])
     
     return (
          <div className='invoice-add-wrapper'>
               <Row className='invoice-add'>
                    <Col xl={12} md={12} sm={12}>
                         {
                              store.data &&
                              <AddCard
                                   categories={store.data.map(cat => ({
                                        image:cat._source.icon,
                                        label: cat?._source?.cat_name, value: cat?._source?.cat_name})
                                   )}/>
     
                         }
                    
                    </Col>
               </Row>
          </div>
     )
}

export default AddPage
