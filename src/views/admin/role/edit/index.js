// ** React Imports
import { useEffect , useState } from "react"
import { Link , useParams } from "react-router-dom"

// ** Third Party Components
// ** Reactstrap Imports
import { Alert , Col , Row } from "reactstrap"

// ** Invoice Edit Components
import EditCard from "./EditCard"
import axios from "axios";
import { getDataPermissions } from "@src/views/admin/store";
import { useDispatch , useSelector } from "react-redux";


const EditPage = () => {
  // ** Hooks
  const [data, setData] = useState(null)
     const { id } = useParams();
   
   
   const {dataPermissions}  = useSelector(state => state.admin)
   const dispatch = useDispatch()
   
     useEffect(() => {
          axios.get(`/admin/role/${id}`).then(response => {
               setData(response.data)
          })
        dispatch(getDataPermissions())
        
     }, [])
   
     
     return data !== null && data !== undefined && dataPermissions.length >=1 ? (
    <div className='invoice-edit-wrapper'>
      <Row className='invoice-edit'>
        <Col xl={12} md={12} sm={12}>
             <EditCard currentData={data}
                  permissionsData = {
                     dataPermissions.map((data) => ({
                        label : data.title,
                        value : data.id
           
                     })) }
             />
        
        </Col>
      </Row>
      
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>نقش</h4>
      <div className='alert-body'>
      چنین نقشی وجود ندارد لطفا به لیست مراجعه کنید.
        <Link to='/admin/role/list'>لیست نقش ها</Link>
      </div>
    </Alert>
  )
}

export default EditPage
