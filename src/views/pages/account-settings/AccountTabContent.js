// ** React Imports
import {Fragment, useState} from "react"

// ** Third Party Components
import {Controller, useForm} from "react-hook-form"
import "cleave.js/dist/addons/cleave-phone.us"

// ** Reactstrap Imports
import {
    Button,
    Card,
    CardBody, CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Form,
    FormFeedback,
    Input,
    Label,
    Row, Spinner
} from "reactstrap"

// ** Utils
// ** Demo Components
import {getUserData} from "@src/auth/utils"
import * as Yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup/dist/yup"
import {handleShowErrorMessage, showPersianDate} from "@utils"
import API from "@src/utility/API"
import {toast} from "react-toastify"


const AccountTabs = () => {
    //variable
    const user = getUserData()
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)

    const defaultValues = {
        email: user.email,
        mobile: user.mobile,
        fullname: user.fullname
    }
    const schema = Yup.object().shape({
        email: Yup.string().required("ایمیل برای مدیر الزامی است.").email("ایمیل وارد شده معتبر نمی باشد."),
        mobile: Yup.string().matches(/^(\+98?)?{?(0?9[0-9]{9,9}}?)$/, 'شماره موبایل معتبر نیست').required('این فیلد الزامی می باشد.').length(11, 'طول شماره تلفن باید 11 کاراکتر باشد.'),
        fullname: Yup.string().required("نام مدیر الزامی است.")
    })
    const {
        control,
        setError,
        handleSubmit,
        formState: {errors}
    } = useForm({defaultValues, resolver: yupResolver(schema)})

    //functions
    const loadImage = e => {
        const image = e.target.files[0]
        setFile(image)
        setPreview(URL.createObjectURL(image))
    }
    const handleChangeProfile = async (newProfile) => {
        const formData = new FormData()
        formData.append("mobile", newProfile.mobile)
        formData.append("email", newProfile.email)
        formData.append("fullname", newProfile.fullname)
        if (file) {
            formData.append("image", file)
        }
        try {
            setLoading(true)
            const {data} = await API.put("/admin/profile", formData)
            if (data.success) {
                await localStorage.setItem('userData', JSON.stringify(data.profile))
                toast.success(data.message)
                setFile(null)
                setPreview(null)
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
                <Form className='mt-2 pt-50' onSubmit={handleSubmit(handleChangeProfile)}>
                    <CardHeader className='border-bottom'>
                        <CardTitle tag='h4'>جزئیات نمایه</CardTitle>
                    </CardHeader>
                    <CardBody className='py-2 my-25'>
                        <p className="rtl">تاریخ ایجاد
                            : {showPersianDate(user.createdAt)}</p>
                        <p className="rtl mt-2">تاریخ آخرین به روز رسانی
                            : {showPersianDate(user.updatedAt)}</p>
                        <div className='divider divider-info'>
                            <div className='divider-text'>اطلاعات شخصی شما</div>
                        </div>
                        <Row>
                            <Col sm='6' className='mb-1'>
                                <Label className="form-label" for="fullname">
                                    نام مدیر
                                    <span className="text-danger">*</span>
                                </Label>
                                <Controller
                                    name="fullname"
                                    autoFocus
                                    control={control}
                                    render={({field}) => (
                                        <Input id="fullname"
                                               placeholder="نام مدیر"
                                               invalid={errors.fullname && true} {...field} />
                                    )}
                                />
                                {errors.fullname && <FormFeedback>{errors.fullname.message}</FormFeedback>}
                                <Label className='form-label mt-1' for='email'>
                                    ایمیل
                                    <span className="text-danger">*</span>
                                </Label>
                                <Controller
                                    id='email'
                                    name='email'
                                    control={control}
                                    render={({field}) => (
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
                                <Label className="form-label mt-1" for="mobile">
                                    موبایل
                                    <span className="text-danger">*</span>
                                </Label>
                                <Controller
                                    name="mobile"
                                    control={control}
                                    render={({field}) => (
                                        <Input id="mobile"
                                               placeholder="موبایل"
                                               invalid={errors.mobile && true} {...field} />
                                    )}
                                />
                                {errors.mobile && <FormFeedback>{errors.mobile.message}</FormFeedback>}
                            </Col>

                            <Col sm='6' className='mb-1'>
                                <div className='imageLoader'>
                                    {preview ?
                                        <img className="mt-5 has-shadow image" src={preview} width="250" alt=""/> :
                                        user?.url ? <img className="mt-5 has-shadow image" src={user?.url} width="250"
                                                         alt=""/> : <img className="mt-5 has-shadow image"
                                                                         src="@src/assets/images/avatars/avatar-blank.png"
                                                                         width="250"
                                                                         alt=""/>
                                    }
                                    <div>
                                        <label id='upload' className='btn btn-md btn-primary'>بارگذاری عکس
                                            <Input id='upload' hidden type='file' accept="image/png, image/jpeg"
                                                   onChange={e => loadImage(e)}/>
                                        </label>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter className="cardFooter">
                        <Col className='mt-2' sm='12'>
                            <Button type='submit' disable={loading} className='me-1' color='primary'>
                                {loading ? <Spinner color='white' size='sm'/> : "ویرایش پروفایل"}
                            </Button>
                        </Col>
                    </CardFooter>
                </Form>
            </Card>
        </Fragment>
    )
}

export default AccountTabs
