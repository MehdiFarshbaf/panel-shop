// ** React Imports
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

// ** Third Party Components
// ** Reactstrap Imports
import { Alert, Col, Row } from "reactstrap"

// ** Invoice Edit Components
import EditCard from "./EditCard"
import axios from "axios"


const EditPage = () => {
     // ** Hooks
     const [data, setData] = useState(null)
     const { id } = useParams()
     
     
     useEffect(() => {
          axios.get(`/admin/discount_code/${id}`).then(response => {
               setData(response.data.data)
          })
     }, [])
     
     return data !== null && data !== undefined ? (
          <div className='invoice-edit-wrapper'>
               <Row className='invoice-edit'>
                    <Col xl={12} md={12} sm={12}>
                         <EditCard currentData={data} id={id }/>
                    
                    </Col>
               </Row>
          
          </div>
     ) : (
          <Alert color='danger'>
               <h4 className='alert-heading'>کد تخفیف</h4>
               <div className='alert-body'>
                    چنین کد تخفیف وجود ندارد لطفا به لیست مراجعه کنید.
                    <Link to='/discount/list'>لیست کد تخفیف ها</Link>
               </div>
          </Alert>
     )
}

export default EditPage
