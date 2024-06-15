// ** React Imports
import { Fragment , useState } from "react"

// ** Custom Components
// ** Third Party Components
// ** Reactstrap Imports
import { Button , Card , CardBody , Col , Form , Input , Label , Row } from "reactstrap"

// ** Styles
import "react-slidedown/lib/slidedown.css"
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/base/pages/app-invoice.scss"
import { Controller , useForm } from "react-hook-form"
import "cleave.js/dist/addons/cleave-phone.us"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import Select from "react-select";

const EditCard = ({ currentData,roles}) => {
     
     // ** State
     const [selectedBank, setSelectedBank] = useState({})
     const [query, setQuery] = useState({})
     const [isLoading, setIsLoading] = useState(false)
     
     
     const navigate = useNavigate()
     
     // ** Hooks
     const defaultValues = {
          role: {label : currentData.role.title ,value:currentData.role.id},
          
     }
     const {
                control,
                handleSubmit,
                formState: { errors }
           } = useForm({ defaultValues })
     
     
     const onSubmit = data => {
          setIsLoading(true)
          const dataInfo = new FormData()
          dataInfo.append(`role_id`, data.role?.value)
          
          axios.post(`/admin/change-role/${currentData.id}`, dataInfo).then(res => {
               if (res.status === 200) {
                    
                    toast.success("با موفقیت عملیات انجام شد")
                    navigate("/admin/list")
               }
          }).catch((e) => setIsLoading(false))
          
     }
     
     return (
          <Fragment>
               <Card className='invoice-preview-card'>
                    <CardBody className='invoice-padding pt-0'>
                         <Form className='mt-2 pt-50' onSubmit={handleSubmit(onSubmit)}>
                              <Row>
                                   <Col sm = "6" className = "mb-1" >
          
                                        <Label className = "form-label" >
                                             نقش </Label >
          
                                        <Controller
                                             control = { control }
                                             // name="options"
                                             name = { `role` }
               
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
                                                       onChange = { val => {
                                                            onChange(val)
                                                       } }
                                                       options = { roles }
                                                       placeholder = "نقش کاربر"
                                                       noOptionsMessage = { () => "پیدا نشد" }
                                                       loadingMessage = { () => "..." }   //minor type-O here
                                                  />
                                             ) }
                                        />
                                   </Col >
                               
                                   <Col className='mt-2' sm='12'>
                                        <Button type='submit' className='me-1' color='primary'>
                                             {isLoading ? "در حال بارگذاری" : "ذخیره تغییرات"}
                                        
                                        </Button>
                                        <Button onClick={() => navigate(-1)}  color='secondary' outline>
                                             لغو
                                        </Button>
                                   </Col>
                              </Row>
                         </Form>
                    
                    </CardBody>
               
               
               </Card>
          
          
          </Fragment>
     )
}

export default EditCard
