// ** React Imports
import { useEffect, useState } from "react"

import { Col, Row } from "reactstrap"

import AddCard from "./AddCard"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { getData as getDataCategory } from "@src/views/categories/store"
import { getData as getDataAdvertisement } from "@src/views/advertisement/store"
import { getData as getDataShop } from "@src/views/shop/store"

const AddPage = () => {
     // ** Hooks
     const [country, setCountry] = useState(null)
     const dispatch = useDispatch()
     
     useEffect(() => {
          axios.get(`/countries`).then(response => {
               setCountry(response.data.data)
          })
          
     }, [dispatch])
   
     return <div className = "invoice-edit-wrapper" >
               <Row className = "invoice-edit" >
                    <Col xl = { 12 } md = { 12 } sm = { 12 } >
                       {
                          country  &&
                            <AddCard listCountriesBlank={country}
                                 countries = { country?.length >= 1 ? country?.map((data) => ({
                                    label : data.name,
                                    value : data.id
                                 })) : [{ value : '', label : ""}] }
                                 
                            />
   
   
                       }
                       
                    </Col >
               </Row >
          
          </div >
     
}

export default AddPage
