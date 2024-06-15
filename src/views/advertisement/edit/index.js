// ** React Imports
import { useEffect , useState } from "react"
import { Link , useParams } from "react-router-dom"

// ** Third Party Components
// ** Reactstrap Imports
import { Alert , Col , Row } from "reactstrap"

// ** Invoice Edit Components
import EditCard from "./EditCard"
import axios from "axios";

const EditPage = () => {
  // ** Hooks
  const [data, setData] = useState(null)
     const { id,slug } = useParams()
     
     
     useEffect(() => {
          axios.get(`/Ads/product/${slug}/${id}`).then(response => {
               setData(response.data)
          })
     }, [])
  
     
     
     return data !== null && data !== undefined ? (
    <div className='invoice-edit-wrapper'>
      <Row className='invoice-edit'>
        <Col xl={12} md={12} sm={12}>
             <EditCard currentData={data}/>
        
        </Col>
      </Row>
      
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>آگهی</h4>
      <div className='alert-body'>
      چنین آگهی وجود ندارد لطفا به لیست مراجعه کنید.
        <Link to='/ads/list'>لیست آگهی ها</Link>
      </div>
    </Alert>
  )
}

export default EditPage
