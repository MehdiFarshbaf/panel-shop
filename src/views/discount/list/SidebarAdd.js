// ** React Import
import { useState } from "react"

// ** Custom Components
import Sidebar from "@components/sidebar"

// ** Utils
// ** Third Party Components
import { Controller, useForm } from "react-hook-form"

// ** Reactstrap Imports
import { Button, Col, Form, Input, Label, Row } from "reactstrap"

// ** Store & Actions
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import moment from "moment-jalaali"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { selectThemeColors } from "@utils"
import AsyncSelect from "react-select/async"
import Select from "react-select"
import classnames from "classnames";

const typeOptions = [
  { value: 'fori', label: 'فوری' },
  { value: 'nardeban', label: 'نردبان' },
  { value: 'renewal', label: 'تمدید' },

]
const SidebarAdd = ({ open, toggleSidebar, setCurrentFilters}) => {
  // ** States
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  
  const defaultValues = {
    percent    : null,
    max_price    : null,
    code : null,
    expires_at:moment(),
    users:[],
    allUsers : false,
    type:typeOptions[0]
    
  }

  // ** Vars
  const {
    control,
    setValue,
    setError, watch,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** Function to handle form submit
  const onSubmit = data => {
    setIsLoading(true)
    const dataInfo = new FormData()
    if (!data.allUsers) {
      for (let i = 0; i < data.users.length; i++) {
        dataInfo.append(`users[${i}]`, data.users[i].value)
      }
    }
  
    dataInfo.append(`percent`, data.percent)
    dataInfo.append(`type`, data.type.value)
    dataInfo.append(`code`, data.code)
    dataInfo.append(`max_price`, data.max_price)
    dataInfo.append(`expires_at`, moment(data.expires_at?.unix * 1000).format("YYYY-MM-DD HH:mm:ss"))
    if (data.percent > 100) {
      toast.error("مقدار درصد بیشتر 100 نمیباشد")
      setIsLoading(false)
    } else if (data.max_price === null) {
      toast.error("حداکثر مقدار ضروری است")
      setIsLoading(false)
    } else {
      axios.post(`/admin/discount_code`, dataInfo).then(res => {
             if (res.status === 200) {
           
               toast.success("با موفقیت عملیات انجام شد")
               navigate("/discount/list")
             }
           }
      ).catch((e) => setIsLoading(false))
    }
 
  }
  const handleReset = () => {
    setCurrentFilters(null)
    toggleSidebar()
    
  }
  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '')
    }
   
  }
  const loadOptionsDBUsers = () => {
    const users = []
    return axios.get('/admin/user').then(res => {
      
      res.data.data.data.map(data => {
             users.push({label: data.phone, value: data.id})
           }
      )
      return users
    })
  }
  return (
    <Sidebar
      size='lg'
      open={open}
      title='اضافه کردن'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form className = "mt-2 pt-50" onSubmit = { handleSubmit(onSubmit) } >
    
        <Row >
          <Col sm = "12" className = "mb-1" >
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
          <Col sm = "12" className = "mb-1" >
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
      
          <Col sm = "12" className = "mb-1" >
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
          <Col sm = "12" className = "mb-1" >
            <Label className='form-label' for='type'>
              نوع
              <span className='text-danger'>*</span>
            </Label>
            <Controller
                 name='type'
                 control={control}
                 render={({ field }) => (
                      // {...field} />
                      <Select
                           isClearable={false}
                           classNamePrefix='select'
                           options={typeOptions}
                           theme={selectThemeColors}
                           placeholder = "نوع "
                   
                           noOptionsMessage = { () => "پیدا نشد" }
                           loadingMessage = { () => "..." }
                           {...field}
                      />
                 )}
            />
       
          </Col>
          <Col md='12' sm='12' className='mb-1'>
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
          {
               !watch().allUsers &&
               <Col className='mb-1' md='12' sm='12'>
                 
                 
                 <Label className='form-label'>کاربران </Label>
  
                 <Controller
                      control = { control }
                      // name="options"
                      name = { `users` }
       
                      render = { ({
                                    field : {
                                      onChange,
                                      value,
                                      ref
                                    }
                                  }) => (
                        <AsyncSelect
                        defaultOptions
                        inputRef = { ref }
                        className = "react-select"
                        classNamePrefix = "select"
                        value = { value }
                        onChange = { val => {
                        onChange(val)
                      } }
                        isClearable={false}
                        disabled={watch().allUsers}
                        theme={selectThemeColors}
                        loadOptions={loadOptionsDBUsers}
                        // onInputChange={handleDBInputChange}
                        placeholder="کاربران"
                        isMulti
                        noOptionsMessage={() => 'پیدا نشد'}
                        loadingMessage={() => '...'}   //minor type-O here
                        />
  
                        ) }
                 />
  
               </Col>
    
          }
  
          <Col sm = "12" className = "mb-1" >
            <div className = "mb-1 form-check form-check-inline" >
              <Controller
                   name = "allUsers"
                   control = { control }
                   render = { ({
                                 field, field : {
                       value
                     }
             
                               }) => (
                        <Input id = "allUsers"
                             type = "checkbox"
                             placeholder = "" invalid = { errors.allUsers && true }
                             checked = { value }
                             { ...field } />
                   ) }
              />
              <Label for = "allUsers" className = "form-check-label" >
                تمامی کاربران
              </Label >
            </div >
          </Col >
  
          <Col className = "mt-2" sm = "12" >
            <Button type = "submit" className = "me-1" color = "primary" >
              { isLoading ? "در حال بارگذاری" : "ذخیره تغییرات" }
        
            </Button >
            <Button type='reset' color='secondary' outline onClick={handleReset}>
              حذف
            </Button>
          </Col >
        </Row >
      </Form >
    </Sidebar>
  )
}

export default SidebarAdd
