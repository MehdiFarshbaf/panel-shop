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
import { useSkin } from "@hooks/useSkin";
import { selectThemeColors } from "@utils";

const statusOptions = [
  { value: "accepted", label: 'تاییده شده' },
  { value: "pending", label: 'در انتظار' },
  { value: "rejected", label: 'رد شده' },
]

const defaultValues = {
  last_name: '',
  first_name: '',
  code: null,
  city: '',
  amount: null,
  telephone: null,
  status: statusOptions[0],
  date: null,
  
}

const SidebarFilters = ({ open, toggleSidebar ,setCurrentFilters}) => {
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
          <Label className='form-label' for='amount'>
            مقدار پول
            {/*<span className='text-danger'>*</span>*/}
          </Label>
          <Controller
            name='amount'
            control={control}
            render={({ field }) => (
              <Input id='amount'
                   type='number'
                   placeholder='مقدار پول' invalid={errors.amount && true} {...field} />
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
