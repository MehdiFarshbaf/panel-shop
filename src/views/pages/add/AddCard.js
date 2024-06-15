// ** React Imports
import { Fragment } from "react"

// ** Custom Components
// ** Third Party Components
// ** Reactstrap Imports
import { Button , Card , CardBody , Col , Form , FormFeedback , Input , Label , Row } from "reactstrap"

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
import InputPasswordToggle from "../../../@core/components/input-password-toggle";

const AddCard = ({genres}) => {
  
  // ** State

  
  const navigate = useNavigate()
  
  // ** Hooks
  const defaultValues = {
       email: "",
       password: "",
  }
  const {
          control,
          setError,
          handleSubmit,
          formState: { errors }
        } = useForm({ defaultValues })
     
  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
        const dataInfo = new FormData()
  
        dataInfo.append("email", data.email)
        dataInfo.append("password", data.password)

  
        axios.post(`/admin`, dataInfo
        ).then(res => {
         
          if (res.data.success === true) {
    
            toast.success("با موفقیت عملیات انجام شد")
               } else {
            toast.error(res.data.message)
  
          }
       
             }
        )

    } else {
      
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }
     

  return (
    <Fragment>
      <Card className='invoice-preview-card'>
        
        <CardBody className='invoice-padding pt-0'>
          <Form className='mt-2 pt-50' onSubmit={handleSubmit(onSubmit)}>
            <Row>
                 <div className='mb-1'>
                      <Label className='form-label' for='register-email'>
                           ایمیل
                      </Label>
                      <Controller
                           id='email'
                           name='email'
                           control={control}
                           render={({ field }) => (
                                <Input type='email' placeholder='ایمیل' invalid={errors.email && true} {...field} />
                           )}
                      />
                      {errors.email ? <FormFeedback>{errors.email.message}</FormFeedback> : null}
                 </div>
                 <div className='mb-1'>
                      <Label className='form-label' for='register-password'>
                           رمزعبور
                      </Label>
                      <Controller
                           id='password'
                           name='password'
                           control={control}
                           render={({ field }) => (
                                <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                           )}
                      />
                 </div>
              <Col className='mt-2' sm='12'>
                <Button type='submit' className='me-1' color='primary'>
                  ذخیره تغییرات
                </Button>
                <Button type='reset' color='secondary' outline onClick={() => navigate(-1)}>
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

export default AddCard
