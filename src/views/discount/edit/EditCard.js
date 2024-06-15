// ** React Imports
import { Fragment, useState } from "react"

// ** Custom Components
// ** Third Party Components
// ** Reactstrap Imports
import { Button, Card, CardBody, Col, Form, Input, Label, Row } from "reactstrap"

// ** Styles
import "react-slidedown/lib/slidedown.css"
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/base/pages/app-invoice.scss"
import { Controller, useForm } from "react-hook-form"
import "cleave.js/dist/addons/cleave-phone.us"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import moment from "moment-jalaali"

const EditCard = ({currentData, id}) => {
     
     // ** State
     const [isLoading, setIsLoading] = useState(false)
     
     
     const navigate = useNavigate()
     
     const defaultValues = {
          percent    : currentData.percent,
          max_price    : currentData.max_price,
          code :currentData.code,
          expires_at: moment(currentData.expires_at).format("jYYYY-jMM-jDD HH:mm:ss")
          
     }
     const {
                control,
                handleSubmit, watch,
                formState : { errors }
           } = useForm({ defaultValues })
     
     
     const onSubmit = data => {
        
          setIsLoading(true)
          const dataInfo = new FormData()
          dataInfo.append(`percent`, data.percent)
          dataInfo.append(`code`, data.code)
          dataInfo.append(`_method`, 'put')
          dataInfo.append(`max_price`, data.max_price)
          dataInfo.append(`expires_at`, data.expires_at?.unix ? moment(data.expires_at?.unix * 1000).format("YYYY-MM-DD HH:mm:ss") : currentData.expires_at)
          axios.post(`/admin/discount_code/${id}`, dataInfo).then(res => {
                    if (res.status === 200) {
                         
                         toast.success("با موفقیت عملیات انجام شد")
                         navigate("/discount/list")
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
                                        <Label className = "form-label" for = "code" >
                                             کد
                                             <span className = "text-danger" >*</span >
                                        
                                        </Label >
                                        <Controller
                                             name = "code"
                                             control = { control }
                                             render = { ({ field }) => (
                                                  <Input id = "code"
                                                       placeholder = "کد"
                                                       invalid = { errors.code && true } { ...field } />
                                             ) }
                                        />
                                   </Col >
                                   <Col sm = "6" className = "mb-1" >
                                        <Label className = "form-label" for = "max_price" >
                                             حداکثر قیمت
                                             <span className = "text-danger" >*</span >
                                        
                                        </Label >
                                        <Controller
                                             name = "max_price"
                                             control = { control }
                                             render = { ({ field }) => (
                                                  <Input id = "max_price"
                                                       type = { "number" }
                                                       
                                                       placeholder = "حداکثر قیمت"
                                                       invalid = { errors.max_price && true } { ...field } />
                                             ) }
                                        />
                                   </Col >
                                   
                                   <Col sm = "6" className = "mb-1" >
                                        <Label className = "form-label" for = "percent" >
                                             درصد
                                             <span className = "text-danger" >*</span >
                                        
                                        </Label >
                                        <Controller
                                             name = "percent"
                                             control = { control }
                                             render = { ({ field }) => (
                                                  <Input id = "percent" placeholder = "درصد"
                                                       type = { "number" }
                                                       
                                                       invalid = { errors.percent && true } { ...field } />
                                             ) }
                                        />
                                   </Col >
                                   <Col md='6' sm='12' className='mb-1'>
                                        <Label className='form-label' for='max_price'>
                                             تاریخ انقضا
                                             <span className = "text-danger" >*</span >
                                        
                                        </Label>
                                        <Controller
                                             control={control}
                                             name="expires_at"
                                             rules={{ required: true }}
                                             render={({
                                                           field: { onChange, name, value },
                                                           fieldState: { invalid, isDirty }, //optional
                                                           formState: { errors } //optional, but necessary if you want to show an error message
                                                      }) => (
                                                  <>
                                                       <DatePicker
                                                            value={value || ""}
                                                            onChange={(expires_at) => {
                                                                 onChange(expires_at?.isValid ? expires_at : "")
                                                            }}
                                                            format={"YYYY-MM-DD HH:mm:ss"}
                                                            calendar={persian}
                                                            containerStyle={{
                                                                 width: "100%"
                                                            }}
                                                            containerClassName = { "expires_at-picker" }
                                                            placeholder = { "تاریخ " }
                                                            inputClass="form-control"
                                                            
                                                            locale={persian_fa}
                                                            calendarPosition="bottom-right"
                                                       />
                                                       {errors && errors[name] && errors[name].type === "ضروری" && (
                                                            //if you want to show an error message
                                                            <span>ارور !</span>
                                                       )}
                                                  </>
                                             )}
                                        />
                                   </Col>
                                   
                                   
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

export default EditCard
