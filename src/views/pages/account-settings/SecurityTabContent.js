// ** React Imports
import {Fragment, useState} from 'react'

// ** Reactstrap Imports
import {Row, Col, Card, Form, Button, CardBody, CardTitle, CardHeader, FormFeedback, Spinner} from 'reactstrap'

// ** Third Party Components
import * as Yup from "yup"
import {useForm, Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Demo Components
import ApiKeysList from './ApiKeysList'
import CreateApiKey from './CreateApikey'
import TwoFactorAuth from './TwoFactorAuth'
import RecentDevices from './RecentDevices'
import {handleShowErrorMessage} from "@utils"
import log from "eslint-plugin-react/lib/util/log";
import API from "@src/utility/API";
import {toast} from "react-toastify";


const defaultValues = {
    newPassword: '',
    password: '',
    confirmPassword: ''
}

const SecurityTabContent = () => {

    //variables
    const [loading, setLoading] = useState(false)

    const schema = Yup.object().shape({
        password: Yup.string()
            .min(4, "کلمه عبور نباید کمتر از 4 کاراکتر باشد")
            .max(255, "کلمه عبور نباید بیشتر از 255 کاراکتر باشد")
            .matches(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                "باید حداقل شامل 8 کاراکتر و حروف کوچک و بزرگ و اعداد باشد")
            .required("کلمه عبور قبلی الزامی می باشد"),
        newPassword: Yup.string()
            .min(4, "کلمه عبور نباید کمتر از 4 کاراکتر باشد")
            .max(255, "کلمه عبور نباید بیشتر از 255 کاراکتر باشد")
            .matches(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                "باید حداقل شامل 8 کاراکتر و حروف کوچک و بزرگ و اعداد باشد")
            .required("کلمه عبور قبلی الزامی می باشد"),
        confirmPassword: Yup.string().required("تکرار کلمه عبور تکراری است.").oneOf([Yup.ref('newPassword'), null], 'گذرواژه و تکرار آن تکسان نیست.')
    })
    // ** Hooks
    const {
        control,
        setError,
        handleSubmit,
        formState: {errors}
    } = useForm({defaultValues, resolver: yupResolver(schema)})

    // functions
    const handleChangePassword = async (formData) => {
        try {
            setLoading(true)
            const {data} = await API.put("/admin/change-password", formData)
            if (data.success) {
                toast.success(data.message)
            }
            setLoading(false)
        } catch (err) {
            await handleShowErrorMessage(err)
            setLoading(false)
        }
    }
    return (
        <Fragment>
            <Card>
                <CardHeader className='border-bottom'>
                    <CardTitle tag='h4'>تغییر رمز عبور</CardTitle>
                </CardHeader>
                <CardBody className='pt-1'>
                    <Form onSubmit={handleSubmit(handleChangePassword)}>
                        <Row>
                            <Col sm='6' className='mb-1'>
                                <Controller
                                    control={control}
                                    id='password'
                                    name='password'
                                    render={({field}) => (
                                        <InputPasswordToggle
                                            label='رمز عبور فعلی'
                                            htmlFor='password'
                                            className='input-group-merge'
                                            invalid={errors.password && true}
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.password && (
                                    <FormFeedback className='d-block'>{errors.password.message}</FormFeedback>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col sm='6' className='mb-1'>
                                <Controller
                                    control={control}
                                    id='newPassword'
                                    name='newPassword'
                                    render={({field}) => (
                                        <InputPasswordToggle
                                            label='رمز عبور جدید'
                                            htmlFor='newPassword'
                                            className='input-group-merge'
                                            invalid={errors.newPassword && true}
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.newPassword &&
                                    <FormFeedback className='d-block'>{errors.newPassword.message}</FormFeedback>}
                            </Col>
                            <Col sm='6' className='mb-1'>
                                <Controller
                                    control={control}
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    render={({field}) => (
                                        <InputPasswordToggle
                                            label='تکرار رمز عبور'
                                            htmlFor='confirmPassword'
                                            className='input-group-merge'
                                            invalid={errors.confirmPassword && true}
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.confirmPassword && (
                                    <FormFeedback className='d-block'>{errors.confirmPassword.message}</FormFeedback>
                                )}
                            </Col>
                            <Col xs={12}>
                                <p className='fw-bolder'>الزامات رمز عبور:</p>
                                <ul className='ps-1 ms-25'>
                                    <li className='mb-50'>حداقل 8 کاراکتر - هر چه بیشتر باشد، بهتر است</li>
                                    <li className='mb-50'>حداقل یک نویسه کوچک</li>
                                    <li className='mb-50'>حداقل یک نویسه بزرگ</li>
                                    <li>حداقل یک عدد</li>
                                </ul>
                            </Col>
                            <Col className='mt-1' sm='12'>
                                <Button type='submit' disable={loading} className='me-1' color='primary'>
                                    {loading ? <Spinner color='white' size='sm'/> : "تغییر رمز عبور"}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
            {/*<TwoFactorAuth />*/}
            {/*<CreateApiKey />*/}
            {/*<ApiKeysList />*/}
            {/*<RecentDevices />*/}
        </Fragment>
    )
}

export default SecurityTabContent
