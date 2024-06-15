// ** React Imports
import { useEffect } from "react"

// ** Third Party Components
// ** Reactstrap Imports
import { Col, Row } from "reactstrap"

// ** Invoice Edit Components
import AddCard from "./AddCard"
import { useDispatch, useSelector } from "react-redux"
import { getDataPermissions } from "@src/views/admin/store"

const AddPage = () => {
     // ** Hooks

     const {dataPermissions}  = useSelector(state => state.admin)
     
     const dispatch = useDispatch()
     useEffect(() => {
          dispatch(getDataPermissions())
        
     }, [dispatch])
     return <div className = "invoice-edit-wrapper" >
               <Row className = "invoice-edit" >
                    <Col xl = { 12 } md = { 12 } sm = { 12 } >
                         {
                            dataPermissions.length >= 1 ? <AddCard
                                   permissionsData = { 
                                        dataPermissions.map((data) => ({
                                             label : data.title,
                                             value : data.id
                                           
                                        })) }
                              /> : []
                         }
                    
                    </Col >
               </Row >
          
          </div >
     
}

export default AddPage
