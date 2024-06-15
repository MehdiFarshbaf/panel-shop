// ** React Imports
import { Fragment } from "react"

// ** Third Party Components
import { Controller , useForm } from "react-hook-form"
import "cleave.js/dist/addons/cleave-phone.us"

// ** Reactstrap Imports
import {
  Button ,
  Card ,
  CardBody ,
  CardHeader ,
  CardTitle ,
  Col ,
  Form ,
  FormFeedback ,
  Input ,
  Label ,
  Row
} from "reactstrap"

// ** Utils
// ** Demo Components
import DeleteAccount from "./DeleteAccount"
import InputPasswordToggle from "../../../@core/components/input-password-toggle"
import axios from "axios"
import toast from "react-hot-toast"

const AccountTabs = ({ user}) => {
  // ** Hooks
  const defaultValues = {
   
    email: user.email,
    password: null
  
  }
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })
  


  const onSubmit = dataSend => {
      const dataInfo = new FormData()
     
      dataInfo.append("password", dataSend.password)
      
      axios.post(`/admin/change-pass`, dataInfo
      ).then(res => {
             if (res.status === 200) {
               toast.success("با موفقیت عملیات انجام شد")
             }
           }
      ).catch((e) => console.error(e))
  }
  
  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>پروفایل</CardTitle>
        </CardHeader>
        <CardBody className='py-2 my-25'>
          <Form className='mt-2 pt-50' onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm='6' className='mb-1'>
                <div className='mb-1'>
                  <Label className='form-label' for='email'>
                    ایمیل
                  </Label>
                  <Controller
                       id='email'
                       name='email'
                       control={control}
                       render={({ field }) => (
                            <Input
                                 autoFill={false}
                                 type='email'
                                 disable={true}
                                 placeholder='ایمیل'
                                 invalid={errors.email && true}
                                 {...field}
                            />
                       )}
                  />
                  {errors.loginEmail && <FormFeedback>{errors.loginEmail.message}</FormFeedback>}
                </div>

              </Col>
  
              <Col sm='6' className='mb-1'>
  
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    پسورد
                  </Label>
                </div>
                <Controller
                     id='password'
                     name='password'
                     control={control}
                     render={({ field }) => (
                          <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                     )}
                />
              </div>
              </Col>{/*<Badge color='light-success' className='ms-50'>*/}
              {/*  */}
              {/*</Badge>*/}
              <Col className='mt-2' sm='12'>
                <Button type='submit' className='me-1' color='primary'>
                 ذخیره تغییرات
                </Button>
                <Button onClick={() => navigate(-1)}  type='reset' color='secondary' outline>
                  لغو
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      <DeleteAccount />
    </Fragment>
  )
}

export default AccountTabs
