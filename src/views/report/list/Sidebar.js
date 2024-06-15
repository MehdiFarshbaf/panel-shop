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
import Select from "react-select"
import { selectThemeColors } from "@utils"


const defaultValues = {
  reason: '',

  allChat: null,
  
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
             <Label className='form-label' for='reason'>
               دلیل
               {/*<span className='reason-danger'>*</span>*/}
             </Label>
             <Controller
                  name='reason'
                  control={control}
                  render={({ field }) => (
                       <Input id='reason' placeholder='دلیل' invalid={errors.reason && true} {...field} />
                  )}
             />
           </div>
           <div className='mb-1'>
             <Label className='form-label' for='allChat'>
               چت ها
               {/*<span className='text-danger'>*</span>*/}
             </Label>
             <Controller
                  name='allChat'
                  control={control}
                  render={({ field }) => (
                       <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            name='colors'
                            options={allChat}
                            classNamePrefix='select'
                            placeholder="چت ها"
                            noOptionsMessage = { () => "پیدا نشد" }
                            loadingMessage = { () => "..." }
                            className={classnames('react-select', { 'is-invalid': data !== null && data.allChat === null })}
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
