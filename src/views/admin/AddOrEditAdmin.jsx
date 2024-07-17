import {Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormFeedback, Input, Label, Row} from "reactstrap"
import {Link, useNavigate} from "react-router-dom"
import * as Yup from 'yup'
import {useState} from "react"
import {Controller, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup/dist/yup"
import {handleDeleteAPI, handleShowErrorMessage, showPersianDate} from "@utils"
import API from "@src/utility/API"
import {toast} from "react-toastify"
import Select from "react-select"


// ** Styles
import "react-slidedown/lib/slidedown.css"
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/base/pages/app-invoice.scss"
import "cleave.js/dist/addons/cleave-phone.us"

const AddOrEditAdmin = ({currentData, isEdit, roles}) => {

    console.log(roles)

    //variable
    const [loading, setLoading] = useState(false)
    const navigation = useNavigate()


    const schema = Yup.object().shape({
        email: Yup.string().required("ایمیل برای مدیر الزامی است.").email("ایمیل وارد شده معتبر نمی باشد."),
        password: Yup.string().required("گذرواژه الزامی است."),
        mobile: Yup.string().matches(/^(\+98?)?{?(0?9[0-9]{9,9}}?)$/, 'شماره موبایل معتبر نیست').required('این فیلد الزامی می باشد.').length(11, 'طول شماره تلفن باید 11 کاراکتر باشد.'),
        fullname: Yup.string().required("نام مدیر الزامی است.")
    })


    const defaultValues = {
        fullname: (isEdit ? currentData?.fullname : ""),
        email: isEdit ? currentData.email : "",
        mobile: isEdit ? currentData.mobile : "",
        role: (isEdit ? {
            label: currentData?.role?.name,
            value: currentData?.role?._id
        } : null)
    }

    const {control, handleSubmit, formState: {errors}} = useForm({defaultValues, resolver: yupResolver(schema)})

    //functions
    const handleDeleteAdmin = async () => {

        try {
            const data = await handleDeleteAPI(`/admin/${currentData._id}`)
            if (data?.success === true) navigation("/admins")
        } catch (err) {
            await handleShowErrorMessage(err)
        }
    }

    const handleEditCreate = async (newAdmin) => {
        const admin = {...newAdmin, role: newAdmin.role.value}
        try {
            setLoading(true)
            if (isEdit) {
                const {data} = await API.put(`/admin/${currentData._id}`, admin)
                if (data.success) {
                    toast.success(data.message)
                    navigation("/admins")
                }
            } else {
                const {data} = await API.post("/admin", admin)
                if (data.success) {
                    toast.success(data.message)
                    navigation("/admins")
                }
            }

        } catch (err) {
            await handleShowErrorMessage(err)
            setLoading(false)
        }


    }

    return (
        <Card>
            <Form className="mt-2 pt-50" onSubmit={handleSubmit(handleEditCreate)}>
                <CardHeader>{isEdit ? "ویرایش" : "ایجاد"} مدیر </CardHeader>
                <CardBody>
                    {isEdit && <Row>
                        <p className="rtl mt-2">تاریخ ایجاد
                            : {showPersianDate(currentData.createdAt)}</p>
                        <p className="rtl mt-2">تاریخ آخرین به روز رسانی
                            : {showPersianDate(currentData.updatedAt)}</p>
                    </Row>}
                    <Row>
                        <Col sm="6" className="mb-1">
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
                            <Label className='form-label mt-1' for='email'>ایمیل<span
                                className="text-danger">*</span></Label>
                            <Controller
                                id='email'
                                name='email'
                                control={control}
                                render={({field}) => (
                                    <Input
                                        type='email'
                                        placeholder='ایمیل'
                                        invalid={errors.email && true}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
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

                            {!isEdit && <div>
                                <Label className='form-label mt-1' for='password'>گذرواژه<span
                                    className="text-danger">*</span></Label>
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({field}) => (
                                        <Input id="password"
                                               type="password"
                                               placeholder="گذرواژه"
                                               invalid={errors.password && true} {...field} />
                                    )}
                                />
                                {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}

                            </div>}

                        </Col>
                        <Col sm={6} className="mb-1">
                            <Label className="form-label" for="role">
                                انتخاب نقش </Label>
                            <Controller
                                control={control}
                                name="role"
                                render={({
                                             field: {
                                                 onChange,
                                                 value,
                                                 ref
                                             }
                                         }) => (
                                    <Select
                                        inputRef={ref}
                                        className="react-select"
                                        classNamePrefix="select"
                                        value={value}
                                        onChange={val => {
                                            onChange(val)
                                        }}
                                        options={roles}
                                        placeholder="نقش ها"
                                        noOptionsMessage={() => "پیدا نشد"}
                                        loadingMessage={() => "..."}   //minor type-O here
                                    />
                                )}
                            />
                            {errors.role && <FormFeedback>{errors.role.message}</FormFeedback>}
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter className="cardFooter">
                    <Link disabled={loading} to="/admins" className="btn btn-outline-primary btn-md">لیست مدیر ها</Link>

                    <Button disabled={loading} type="submit"
                            className="btn btn-success btn-md mx-2">{isEdit ? "ویرایش" : "ایجاد"} مدیر
                    </Button>
                    {isEdit && <Button disabled={loading} onClick={() => handleDeleteAdmin()}
                                       className="btn btn-danger btn-md mx-2">حذف مدیر
                    </Button>}

                </CardFooter>
            </Form>
        </Card>
    )
}
export default AddOrEditAdmin