// ** React Imports
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

// ** Third Party Components
// ** Reactstrap Imports
import { Alert, Col, Row } from "reactstrap"

// ** Invoice Edit Components
import AddCard from "./AddCard"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { getData } from "@src/views/categories/store"


const AddPage = () => {
     // ** Hooks

     const { data :categories } = useSelector(state => state.categories)
     const [forms, setForms] = useState(null)
     
     const dispatch = useDispatch()
     useEffect(() => {
          dispatch(getData())
        
     }, [dispatch])
     useEffect(() => {
      
          axios.get(`/Ads/all-forms`).then(response => {
               setForms(response.data.hits)
          })
     }, [dispatch])
     return <div className = "invoice-edit-wrapper" >
               <Row className = "invoice-edit" >
                    <Col xl = { 12 } md = { 12 } sm = { 12 } >
                         {
                              
                              <AddCard forms={forms}
                                   categories = { categories.length >= 1 ? categories.map((data) => ({
                                             label : data._source.title,
                                             value : data._source.slug,
                                             image:data._source.icon
                                        })) : [{ value : '', label : "", image:''}] }
                                   categoriesArray={categories}
                              />
                         }
                    
                    </Col >
               </Row >
          
          </div >
     
}

export default AddPage
