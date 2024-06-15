
import Sidebar from "@components/sidebar"
import { Controller, useForm } from "react-hook-form"

import { Button, Form, Input, Label } from "reactstrap"

import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import DatePicker from "react-multi-date-picker"
import { useSkin } from "@hooks/useSkin"

const statusOptions = [
  { value: "0", label: 'غیر فعال' },
  { value: "1", label: 'فعال' }
]


const defaultValues = {
  first_name: '',
  last_name: '',
  code: null,
  city: '',
  mobile: null,
  date: null,
  status: statusOptions[0]
}


const SidebarFilters = ({ open, toggleSidebar, setCurrentFilters}) => {
  // ** States
  const { skin } = useSkin()


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
    setCurrentFilters(data)
  
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

  return (
    <Sidebar
      size='lg'
      open={open}
      title='فیلترها'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label className='form-label' for='date'>
          تاریخ
  
        </Label>
        <div className='mb-1 form-group w-100'>
    
          <Controller
               control={control}
               name="date"
               rules={{ required: true }}
               render={({
                          field: { onChange, name, value },
                          formState: { errors } //optional, but necessary if you want to show an error message
                        }) => (
                    <>
                      <DatePicker
                           inputClass= { `form-control ${ skin } flatpickr-time` }
                           className="rmdp-mobile"
                           value={value || ""}
                           containerStyle={{
                             width: "100%"
                           }}
                           onChange={(date) => {
                             onChange(date)
                           }}
                     
                           format={"YYYY-MM-DD HH:mm:ss"}
                           calendar={persian}
                           range
                           containerClassName = { "date-picker" }
                           placeholder = { "تاریخ " }
                     
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
  
        </div>
  
        <div className='mb-1'>
          <Label className='form-label' for='first_name'>
            نام
            {/*<span className='text-danger'>*</span>*/}
          </Label>
          <Controller
            name='first_name'
            control={control}
            render={({ field }) => (
              <Input id='first_name' placeholder='نام' invalid={errors.first_name && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='last_name'>
            نام خانوادگی
            {/*<span className='text-danger'>*</span>*/}
          </Label>
          <Controller
            name='last_name'
            control={control}
            render={({ field }) => (
              <Input id='last_name' placeholder='نام خانوادگی' invalid={errors.last_name && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='mobile'>
            شماره همراه
            {/*<span className='text-danger'>*</span>*/}
          </Label>
          <Controller
            name='mobile'
            control={control}
            render={({ field }) => (
              <Input id='mobile'
                   type={"number"}
                   placeholder='شماره همراه' invalid={errors.mobile && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='code'>
            کد ملی
            {/*<span className='text-danger'>*</span>*/}
          </Label>
          <Controller
            name='code'
            control={control}
            render={({ field }) => (
              <Input id='code' placeholder='کدملی' invalid={errors.code && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='email'>
            ایمیل
            {/*<span className='text-danger'>*</span>*/}
          </Label>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <Input id='email' placeholder='ایمیل' invalid={errors.email && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='state'>
            شهر
            {/*<span className='text-danger'>*</span>*/}
          </Label>
          <Controller
            name='state'
            control={control}
            render={({ field }) => (
              <Input id='state' placeholder='شهر' invalid={errors.state && true} {...field} />
            )}
          />
        </div>
     

{/*
        <div className='mb-1'>
          <Label className='form-label' for='status'>
            وضعیت
          </Label>
          <Controller
               name='status'
               control={control}
               render={({ field }) => (
                    <Select
                         isClearable={false}
                         classNamePrefix='select'
                         options={statusOptions}
                         theme={selectThemeColors}
                         placeholder = "وضعیت "
                         noOptionsMessage = { () => "پیدا نشد" }
                         loadingMessage = { () => "..." }
                         className={classnames('react-select', { 'is-invalid': data !== null && data.status === null })}
                         {...field}
                    />
               )}
          />
        </div>
*/}
  
  
        <div>
           <Button type='submit' className='me-1' color='primary'>
             اعمال
           </Button>
           <Button type='reset' color='secondary' outline onClick={handleReset}>
             حذف
           </Button>
         </div>
  
        
      </Form>
    </Sidebar>
  )
}

export default SidebarFilters
