// ** Invoice Add Components
import AddCard from "./AddCard"

// ** Reactstrap Imports
import { Col , Row } from "reactstrap"

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/base/pages/app-invoice.scss"
import { useDispatch , useSelector } from "react-redux"
import { getDataRoles } from "@src/views/admin/store";
import { useEffect } from "react";

const AddPage = () => {
   const { dataRoles }  = useSelector(state => state.admin)
   
   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(getDataRoles())
      
   }, [dispatch])
     return (
    <div className='invoice-add-wrapper'>
      <Row className='invoice-add'>
        <Col xl={12} md={12} sm={12}>
           {
              dataRoles ? <AddCard
                   roles = {
                      dataRoles.map((data) => ({
                         label : data.title,
                         value : data.id
                 
                      }))  } /> : []
           }

        </Col>
      </Row>
    </div>
  )
}

export default AddPage
