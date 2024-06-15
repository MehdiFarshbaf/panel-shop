// ** React Import
import { useState } from "react"

// ** Custom Components
import Sidebar from "@components/sidebar"

// ** Utils
// ** Third Party Components
import { Controller , useForm } from "react-hook-form"
import classnames from "classnames"

// ** Reactstrap Imports
import { Button , Form , Input , Label } from "reactstrap"

// ** Store & Actions
import { useDispatch } from "react-redux"
import Select from "react-select";
import { selectThemeColors } from "../../../utility/Utils";

const statusOptions = [
  { value: 'registered', label: 'ثبت شده' },
  { value: 'processing', label: 'در حال آماده سازی' },

]

const defaultValues = {
  last_name: '',
  store_name: '',
  code: 0,
  city: '',
  mobile: 0,
  telephone: 0,
  status: statusOptions[0],
}

const SidebarFilters = ({ open, toggleSidebar ,setCurrentFilters}) => {
  const dispatch = useDispatch()
  const [data, setData] = useState(null)
  const {
          control,
          setValue,
          setError,
          handleSubmit,
          formState: { errors }
        } = useForm({ defaultValues })
  
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
           <div className='mb-1'>
             <Label className='form-label' for='last_name'>
               نام خانوادگی صاحب
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
             <Label className='form-label' for='store_name'>
               نام فروشگاه
               {/*<span className='text-danger'>*</span>*/}
             </Label>
             <Controller
                  name='store_name'
                  control={control}
                  render={({ field }) => (
                       <Input id='store_name' placeholder='نام فروشگاه' invalid={errors.store_name && true} {...field} />
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
                            type='number'
                            placeholder='شماره همراه' invalid={errors.mobile && true} {...field} />
                  )}
             />
           </div>
           <div className='mb-1'>
             <Label className='form-label' for='telephone'>
               تلفن
               {/*<span className='text-danger'>*</span>*/}
             </Label>
             <Controller
                  name='telephone'
                  control={control}
                  render={({ field }) => (
                       <Input id='telephone'
                            type='number'
                            
                            placeholder='تلفن' invalid={errors.telephone && true} {...field} />
                  )}
             />
           </div>
           <div className='mb-1'>
             <Label className='form-label' for='code'>
               کدملی
               {/*<span className='text-danger'>*</span>*/}
             </Label>
             <Controller
                  name='code'
                  control={control}
                  render={({ field }) => (
                       <Input id='code'
                            type='number'
                            
                            placeholder='کدملی' invalid={errors.code && true} {...field} />
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
