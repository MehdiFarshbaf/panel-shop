// ** React Imports
import {useState} from "react"
import {Link, useNavigate} from "react-router-dom"

// ** Custom Hooks
import {useSkin} from "@hooks/useSkin"


// ** Third Party Components
import {toast} from "react-toastify"
import {useDispatch} from "react-redux"

// ** Actions
import {handleLogin} from "@store/authentication"

// ** Context
import siteLogo from "../../../assets/images/logo/logo-primary.png"


// ** Custom Components


// ** Utils
import {getHomeRouteForLoggedInUser, handleShowErrorMessage} from "@utils"
import {appConfig} from "@configs/config"
import API from "@src/utility/API"
import {useFormik} from "formik"
import * as Yup from "yup"
import InputPassword from "@components/input-password-toggle"

// ** Reactstrap Imports
import {Button, CardText, CardTitle, Col, Form, FormFeedback, Input, Label, Row, Spinner} from "reactstrap"

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/login-v2.svg"
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg"

// ** Styles
import "@styles/react/pages/page-authentication.scss"

const Login = () => {

    const {skin} = useSkin()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const source = skin === 'dark' ? illustrationsDark : illustrationsLight

    const schema = Yup.object().shape({
        email: Yup.string().required("ایمیل الزامی است.").email("ایمیل وارد شده معتبر نمی باشد."),
        password: Yup.string()
            .min(8, "کلمه عبور نباید کمتر از 8 کاراکتر باشد")
            .max(255, "کلمه عبور نباید بیشتر از 255 کاراکتر باشد")
            .matches(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                "باید حداقل شامل 8 کاراکتر و حروف کوچک و بزرگ و اعداد باشد")
            .required("کلمه عبور الزامی می باشد")
    })
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: schema,
        onSubmit: async values => {
            setLoading(true)
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
                setLoading(false)
            } catch (err) {
                setLoading(false)
                await handleShowErrorMessage(err)
            }
        }
    })


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
                        <CardText className='mb-2'>ایمیل برای ورود به سایت : mehdifarshbaf92@gmail.com</CardText>
                        <CardText className='mb-2'>گذرواژه برای ورود به سایت : Mehdi14439</CardText>
                        <Form className='auth-login-form mt-2' onSubmit={formik.handleSubmit}>
                            <div className='mb-1'>
                                <Label className='form-label' for='login-email'>
                                    ایمیل
                                </Label>
                                <Input type='email' id='login-email'
                                       placeholder='john@example.com'
                                       value={formik.values.email}
                                       onChange={formik.handleChange("email")}
                                       onBlur={formik.handleBlur("email")}
                                       autoFocus/>
                                <FormFeedback
                                    className='d-block'>{formik.touched.email && formik.errors.email}</FormFeedback>
                            </div>
                            <div className='mb-1'>
                                <div className='d-flex justify-content-between'>
                                    <Label className='form-label' for='login-password'>گذرواژه</Label>
                                    <Link to='/forgot-password'>
                                        <small>رمز عبور را فراموش کرده اید؟</small>
                                    </Link>
                                </div>
                                <InputPassword className='input-group-merge'
                                               placeholder='john@example.com'
                                               value={formik.values.password}
                                               onChange={formik.handleChange("password")}
                                               onBlur={formik.handleBlur("password")}
                                               id='new-password' autoFocus/>
                                <FormFeedback
                                    className='d-block'>{formik.touched.password && formik.errors.password}</FormFeedback>
                            </div>
                            <Button type='submit' color='primary' block disabled={loading}>
                                {loading ? <Spinner color='white' size='sm'/> : "ورود"}
                            </Button>
                        </Form>
                    </Col>
                </Col>
            </Row>
        </div>
    )
}

export default Login
