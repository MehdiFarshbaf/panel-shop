// ** React Imports
import { Fragment , useState } from "react"

// ** Custom Components
// ** Third Party Components
// ** Reactstrap Imports
import { Button , Card , CardBody , Col , Form , Input , Label , Row } from "reactstrap"

// ** Styles
import Select from "react-select"
import "react-slidedown/lib/slidedown.css"
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/base/pages/app-invoice.scss"
import { Controller , useForm } from "react-hook-form"
import "cleave.js/dist/addons/cleave-phone.us"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const AddCard = ({ permissionsData }) => {
   
   // ** State
   const [isLoading, setIsLoading] = useState(false)
   
   
   const navigate = useNavigate()
   
   const defaultValues = {
      title         : "",
      permissions         : permissionsData
   }
   
   const {
            control,
            handleSubmit,
            formState : { errors }
         } = useForm({ defaultValues })
   
   
   const onSubmit = data => {
      setIsLoading(true)
      const {title, permissions} = data
   
      const dataInfo = new FormData()
   
      dataInfo.append(`name`, title)
      for (let i = 0; i < permissions.length; i++) {
         dataInfo.append(`permissions[${i}]`, permissions[i].value)
      }
      axios.post(`/admin/role`, dataInfo).then(res => {
              if (res.status === 200) {
                 toast.success("با موفقیت عملیات انجام شد")
                 navigate("/admin/role/list")
              }
           }
      ).catch((e) => setIsLoading(false))
      
   }
   
   
   return (
        <Fragment >
           <Card className = "invoice-preview-card" >
              <CardBody className = "invoice-padding pt-0" >
                 <Form className = "mt-2 pt-50" onSubmit = { handleSubmit(onSubmit) } >
                    
                    <Row >
                       
                       <Col sm = "6" className = "mb-1" >
                          
                          <Label className = "form-label" for = "title" >
                             عنوان
                          
                          </Label >
                          <Controller
                               name = "title"
                               control = { control }
                               render = { ({ field }) => (
                                    <Input id = "title" placeholder = "عنوان"
                                         invalid = { errors.title && true } { ...field } />
                               ) }
                          />
                       </Col >
                       
                       <Col sm = "6" className = "mb-1" >
                          
                          <Label className = "form-label" >
                             مجوزها </Label >
                          
                          <Controller
                               control = { control }
                               name = { `permissions` }
                               
                               render = { ({
                                              field : {
                                                 onChange,
                                                 value,
                                                 ref
                                              }
                                           }) => (
                                    <Select
                                         inputRef = { ref }
                                         className = "react-select"
                                         classNamePrefix = "select"
                                         value = { value }
                                         isMulti
                                         onChange = { val => {
                                            onChange(val)
                                         } }
                                         options = { permissionsData }
                                         placeholder = "مجوزها"
                                         noOptionsMessage = { () => "پیدا نشد" }
                                         loadingMessage = { () => "..." }   //minor type-O here
                                    />
                               ) }
                          />
                       </Col >
                       
                       <Col className = "mt-2" sm = "12" >
                          <Button type = "submit" className = "me-1" color = "primary" >
                             { isLoading ? "در حال بارگذاری" : "ذخیره تغییرات" }
                          
                          </Button >
                          <Button onClick={() => navigate(-1)} type='reset' color = "secondary" outline >
                             لغو
                          </Button >
                       </Col >
                    </Row >
                 </Form >
              
              </CardBody >
           
           </Card >
        
        </Fragment >
   )
}

export default AddCard
