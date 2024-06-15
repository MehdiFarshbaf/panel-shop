// ** React Imports
import {useState} from "react"
import {Link, useNavigate} from "react-router-dom"

// ** Custom Hooks
import {useSkin} from "@hooks/useSkin"
import useJwt from "@src/auth/jwt/useJwt"

// ** Third Party Components
import {toast} from "react-toastify"
import {useDispatch} from "react-redux"
import {Controller, useForm} from "react-hook-form"

// ** Actions
import {handleLogin} from "@store/authentication"

// ** Context
import siteLogo from "../../../assets/images/logo/logo-primary.png"


// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle"

// ** Utils
import {getHomeRouteForLoggedInUser, handleShowErrorMessage} from "@utils"

// ** Reactstrap Imports
import {Button, CardText, CardTitle, Col, Form, FormFeedback, Input, Label, Row} from "reactstrap"

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/login-v2.svg"
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg"

// ** Styles
import "@styles/react/pages/page-authentication.scss"

import {appConfig} from "@configs/config"
import API from "@src/utility/API"


const defaultValues = {
    password: '',
    email: ''
}

const Login = () => {
    const {skin} = useSkin()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        control,
        setError,
        handleSubmit,
        formState: {errors}
    } = useForm({defaultValues})
    const [isLoading, setIsLoading] = useState(false)

    const source = skin === 'dark' ? illustrationsDark : illustrationsLight

    const onSubmit = async values => {
        setIsLoading(true)
        try {
            const {data} = await API.post(`${appConfig.base_url}/admin/login`, {
                email: values.email,
                password: values.password
            })
            if (data.success) {
                toast.success(data.message)
            }
            const res = {
                role: 'admin',
                data: data.profile,
                accessToken: data.token
            }
            dispatch(handleLogin(res))
            navigate(getHomeRouteForLoggedInUser('admin'))
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            await handleShowErrorMessage(err)
        }
    }

    return (
        <div className='auth-wrapper auth-cover'>
            <Row className='auth-inner m-0'>
                <Link className='brand-logo d-flex align-content-center align-items-center' to='/'
                      onClick={e => e.preventDefault()}>
                    <img className='img-fluid' src={siteLogo} alt='Login Cover' width={100} height={100}/>
                </Link>
                <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
                    <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
                        <img className='img-fluid' src={source} alt='Login Cover'/>
                    </div>
                </Col>
                <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
                    <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
                        <CardTitle tag='h2' className='fw-bold mb-1'>به مدیریت بخش خوش آمدید 👋</CardTitle>

                        <CardText className='mb-2'>لطفا اطلاعات خود را وارد برای ورود به اکانت وارد کنید</CardText>
                        <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                            <div className='mb-1'>
                                <Label className='form-label' for='email'>ایمیل</Label>
                                <Controller
                                    id='email'
                                    name='email'
                                    control={control}
                                    render={({field}) => (
                                        <Input
                                            autoFocus
                                            type='email'
                                            placeholder='ایمیل'
                                            invalid={errors.email && true}
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
                            </div>
                            <div className='mb-1'>
                                <div className='d-flex justify-content-between'>
                                    <Label className='form-label' for='login-password'>گذرواژه</Label>
                                </div>
                                <Controller
                                    id='password'
                                    name='password'
                                    control={control}
                                    render={({field}) => (
                                        <InputPasswordToggle className='input-group-merge'
                                                             invalid={errors.password && true} {...field} />
                                    )}
                                />
                            </div>
                            <Button type='submit' color='primary' block disabled={isLoading}>ورود</Button>
                        </Form>
                    </Col>
                </Col>
            </Row>
        </div>
    )
}

export default Login
