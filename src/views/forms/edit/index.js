// ** React Imports
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

// ** Third Party Components
// ** Reactstrap Imports
import { Alert, Col, Row } from "reactstrap"

// ** Invoice Edit Components
import EditCard from "./EditCard"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { getData } from "@src/views/categories/store"
import { useTranslation } from "react-i18next";


const EditPage = () => {
   // ** Hooks
   const [currentData, setCurrentData] = useState(null)
   const { name } = useParams()
   const { data :categories } = useSelector(state => state.categories)
   const [forms, setForms] = useState(null)
   const { i18n } = useTranslation()
   
   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(getData())
      setCurrentData(null)
   
      axios.get(`/Ads/forms?cat_slug=${name}`, {
         headers : {
            'X-localization' :  i18n.language
         }
      }).then(response => {
         setCurrentData(response.data)
      })
   }, [i18n.language])

   useEffect(() => {
      
      axios.get(`/Ads/all-forms`).then(response => {
         setForms(response.data.hits)
      })
   }, [dispatch])
   return currentData !== null && currentData !== undefined ? (
        <div className = "invoice-edit-wrapper" >
           <Row className = "invoice-edit" >
              <Col xl = { 12 } md = { 12 } sm = { 12 } >
                 {
                   
                      <EditCard forms={forms} currentData = { currentData }
                           categories = { categories.length >= 1 ?
                                categories.map((data) => ({
                                   label : data._source.title,
                                   value : data._source.slug,
                                   image:data._source.icon
                                })) : [{ value : '', label : "" ,image:''}] }
                           categoriesArray={categories}
                      />
                 }
              
              </Col >
           </Row >
        
        </div >
   ) : (
        <Alert color = "danger" >
           <h4 className = "alert-heading" >فرمی</h4 >
           <div className = "alert-body" >
              چنین فرمی وجود ندارد لطفا به لیست مراجعه کنید.
              <Link to='/forms/list'>لیست فرم ساز ها</Link>
              
           </div >
        </Alert >
   )
}

export default EditPage
