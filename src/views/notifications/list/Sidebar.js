// ** React Import
import { useState } from "react"

// ** Custom Components
import Sidebar from "@components/sidebar"

// ** Utils
// ** Third Party Components
import { Controller , useForm } from "react-hook-form"

// ** Reactstrap Imports
import { Button , Form , Input , Label } from "reactstrap"

// ** Store & Actions

const defaultValues = {
  email : '',
  type: '',
  
}

const SidebarFilters = ({allChat, open, toggleSidebar, setCurrentFilters}) => {
  const [data, setData] = useState(null)

  const {
          control,
          setValue,
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
            onClosed={handleSidebarClosed}
            toggleSidebar={toggleSidebar}
       >
         <Form onSubmit={handleSubmit(onSubmit)}>
           <div className='mb-1'>
             <Label className='form-label' for='email '>
               ایمیل
             </Label>
             <Controller
                  name='email'
                  type='email'
                  control={control}
                  render={({ field }) => (
                       <Input id='email ' placeholder='ایمیل' invalid={errors.email  && true} {...field} />
                  )}
             />
           </div>
           <div className='mb-1'>
             <Label className='form-label' for='type'>
               نوع
             </Label>
             <Controller
                  name='type'
                  control={control}
                  render={({ field }) => (
                       <Input id='type' placeholder='نوع' invalid={errors.type  && true} {...field} />
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
