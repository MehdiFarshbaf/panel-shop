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

const senderOptions = [
   { value: "user", label: 'کاربر' },
   { value: "Advertiser", label: 'تبلیغ کننده' }
]

const defaultValues = {
  text: '',
  users: null,
  allChat: null,
   sender: senderOptions[0]
   
}

const SidebarFilters = ({allChat, open, toggleSidebar, setCurrentFilters}) => {
  // ** States
  
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
            onClosed={handleSidebarClosed}
            toggleSidebar={toggleSidebar}
       >
         <Form onSubmit={handleSubmit(onSubmit)}>
           <div className='mb-1'>
             <Label className='form-label' for='text'>
               متن
               {/*<span className='text-danger'>*</span>*/}
             </Label>
             <Controller
                  name='text'
                  control={control}
                  render={({ field }) => (
                       <Input id='text' placeholder='متن' invalid={errors.text && true} {...field} />
                  )}
             />
           </div>
{/*
           <div className='mb-1'>
             <Label className='form-label' for='users'>
               کاربران
               <span className='text-danger'>*</span>
             </Label>
             <Controller
                  name='users'
                  control={control}
                  render={({ field }) => (
                    
                       <Select
                            isClearable={false}
                            theme={selectThemeColors}
                           
                            name='colors'
                            options={user}
                            classNamePrefix='select'
                            placeholder="کاربران"
                            noOptionsMessage = { () => "پیدا نشد" }
                            loadingMessage = { () => "..." }
                            className={classnames('react-select', { 'is-invalid': data !== null && data.users === null })}
                            {...field}
                       />
                  )}
             />
           </div>
*/}
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
   
            <div className='mb-1'>
               <Label className='form-label' for='sender'>
                  فرستنده
                  {/*<span className='text-danger'>*</span>*/}
               </Label>
               <Controller
                    name='sender'
                    control={control}
                    render={({ field }) => (
                         // <Input id='sender' placeholder='Australia' invalid={errors.sender && true}
                         // {...field} />
                         <Select
                              isClearable={false}
                              classNamePrefix='select'
                              options={senderOptions}
                              theme={selectThemeColors}
                              placeholder = "فرستنده "
                     
                              noOptionsMessage = { () => "پیدا نشد" }
                              loadingMessage = { () => "..." }
                              className={classnames('react-select', { 'is-invalid': data !== null && data.sender === null })}
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
