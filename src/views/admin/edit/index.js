// ** React Imports
import { useEffect , useState } from "react"
import { Link , useParams } from "react-router-dom"

// ** Third Party Components
// ** Reactstrap Imports
import { Alert , Col , Row } from "reactstrap"

// ** Invoice Edit Components
import EditCard from "./EditCard"
import { useDispatch , useSelector } from "react-redux";
import axios from "axios";
import { getDataPermissions , getDataRoles } from "@src/views/admin/store";
import AddCard from "@src/views/admin/add/AddCard";


const EditPage = () => {
  // ** Hooks
   const [data, setData] = useState(null)
   const { id } = useParams();
   
   
   const {dataRoles}  = useSelector(state => state.admin)
   const dispatch = useDispatch()

   
   useEffect(() => {
      axios.get(`/admin/${id}`).then(response => {
         setData(response.data)
      })
      dispatch(getDataRoles())
   
   
   }, [])
     
     return data !== null && data !== undefined ? (
    <div className='invoice-edit-wrapper'>
      <Row className='invoice-edit'>
        <Col xl={12} md={12} sm={12}>
           {
              dataRoles ? <EditCard currentData={data}
                   roles = {
                      dataRoles.map((data) => ({
                         label : data.title,
                         value : data.id
                 
                      }))  } /> : []
           }

        </Col>
      </Row>
      
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>ادمین</h4>
      <div className='alert-body'>
      چنین ادمینی وجود ندارد لطفا به لیست مراجعه کنید.
        <Link to='/admin/list'>لیست ادمین ها</Link>
      </div>
    </Alert>
  )
}

export default EditPage
