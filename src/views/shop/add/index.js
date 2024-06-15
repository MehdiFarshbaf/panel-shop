// ** Invoice Add Components
import AddCard from "./AddCard"

// ** Reactstrap Imports
import { Col , Row } from "reactstrap"

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/base/pages/app-invoice.scss"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

const AddPage = () => {
     const dispatch = useDispatch()

     
     useEffect(() => {
     
     }, [dispatch])
     
     return (
    <div className='invoice-add-wrapper'>
      <Row className='invoice-add'>
        <Col xl={12} md={12} sm={12}>
             
                  <AddCard />
             
        </Col>
      </Row>
    </div>
  )
}

export default AddPage
