// ** React Import
import { useState } from "react"

// ** Custom Components
import Sidebar from "@components/sidebar"

// ** Utils
// ** Third Party Components
import { Controller, useForm } from "react-hook-form"
import classnames from "classnames"

// ** Reactstrap Imports
import { Button, Form, Input, Label } from "reactstrap"

// ** Store & Actions
import { useDispatch } from "react-redux"
import Select from "react-select"

import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { useSkin } from "@hooks/useSkin"
import { selectThemeColors } from "@utils"

const statusOptions = [
  { value: 0, label: 'غیر فعال' },
  { value: 1, label: 'فعال' }
]

const defaultValues = {
  last_name: '',
  first_name: '',
  code: null,
  city: '',
  price: null,
  telephone: null,
  status: statusOptions[0],
  date: null
  
}

const SidebarFilters = ({ open, toggleSidebar, setCurrentFilters}) => {
  // ** States
  const { skin } = useSkin()

  // ** Store Vars
  const dispatch = useDispatch()
  const [data, setData] = useState(null)

  // ** Vars
  const {
    control,
    setValue,
    setError,
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
                     
                           format={"YYYY-MM-DD"}
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
                    <Input id='first_name' placeholder='نام ' invalid={errors.first_name && true} {...field} />
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
              <Input id='last_name' placeholder='  نام خانوادگی' invalid={errors.name && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='price'>
            قیمت
            {/*<span className='text-danger'>*</span>*/}
          </Label>
          <Controller
            name='price'
            control={control}
            render={({ field }) => (
              <Input id='price'
                   type='number'
                   placeholder='قیمت' invalid={errors.price && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='status'>
            وضعیت
            {/*<span className='text-danger'>*</span>*/}
          </Label>
          <Controller
               name='status'
               control={control}
               render={({ field }) => (
                    // <Input id='status' placeholder='Australia' invalid={errors.status && true}
                    // {...field} />
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
