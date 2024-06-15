// ** React Imports
import {Fragment, useState} from "react"

// ** Custom Components
// ** Third Party Components
// ** Reactstrap Imports
import {Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Row} from "reactstrap"

// ** Styles
import "react-slidedown/lib/slidedown.css"
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/base/pages/app-invoice.scss"
import {Controller, useForm} from "react-hook-form"
import "cleave.js/dist/addons/cleave-phone.us"
import toast from "react-hot-toast"
import {Link, useNavigate} from "react-router-dom"

import moment from "moment-jalaali"
import axios from "axios"
import Select from "react-select";


const EditCard = ({currentData}) => {

    const data = JSON.parse(localStorage.getItem('userData'))

    // ** State
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    // ** Hooks
    const defaultValues = {
        // fori: currentData?._source?.object.fori,
        fori: null,
        nardeban: currentData?._source?.object.nardeban,

    }

    const {
        control,
        setError,
        handleSubmit,
        formState: {errors}
    } = useForm({defaultValues})


    const onSubmit = async data => {
        setIsLoading(true)
        try {
            const res = await axios.post("/admin/ads/upgrade", {
                product_id: currentData._id,
                promote_type: data.fori.value
            })
            if (res.status === 200) {
                toast.success(" با موفقیت ایجاد شد.")
                navigate("/ads/list")
            }
        } catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }

    const isFori = (object = currentData) => {
        if (!object.fori && !object.fori_expires_at) {
            return false
        }

        return ((new Date()).getTime() < (new Date(object.fori_expires_at)).getTime())
    }
    return (
        <Fragment>
            <Card className='invoice-preview-card'>

                <CardBody className='invoice-padding pt-0'>
                    <Form className='mt-2 pt-50' onSubmit={handleSubmit(onSubmit)}>
                        <Card className="invoice-preview-card">
                            <CardBody className="invoice-padding p-2">
                                <CardTitle tag='h2'>

                                </CardTitle>
                                <Row>


                                    <Col className="mt-2" sm="6">
                                        <p className='text-muted mb-0 mt-1'>
                                            <small className='text-truncate'> دسته بندی نهایی : </small>
                                            {currentData?._source?.cat_name}
                                        </p> <p className=' text-muted mb-0 mt-1'>
                                        <small className='text-truncate'> عنوان : </small>
                                        {currentData?._source?.object.mains.title}
                                    </p>
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'> نامک : </small>
                                            {currentData?._source?.object.slug}
                                        </p>   <p className=' text-truncate mb-0 mt-1'>
                                        <small className='text-muted'> وضعیت : </small>
                                        {currentData?._source?.object.status}
                                    </p>
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'> تاریخ ساخت : </small>
                                            {currentData?._source?.object.created_at &&
                                                moment(currentData?._source?.object.created_at).format("jYYYY-jMM-jDD HH:mm:ss")
                                            }
                                        </p>

                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'> روزهای سپری شده از تاریخ ایجاد : </small>
                                            {currentData?._source?.object.creation_date}
                                        </p>         <p className=' text-truncate mb-0 mt-1'>
                                        <small className='text-muted'> روزهای سپری شده از تاریخ انقضا آگهی : </small>
                                        {currentData?._source?.object.days_left}
                                    </p>

                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'> توافق نامه : </small>
                                            {currentData?._source?.object.mains.agreement ? "انجام" +
                                                " شده" +
                                                " " : "انجام نشده"}
                                        </p>
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'> دسته بندی : </small>
                                            {currentData?._source?.object.mains.category}
                                        </p>
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'> زیر دسته :</small>
                                            {currentData?._source?.object.mains.subCategory}
                                        </p>  <p className=' text-truncate mb-0 mt-1'>
                                        <small className='text-muted'> دسته بندی داخلی: </small>
                                        {currentData?._source?.object.mains.innerCategory}
                                    </p>

                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'> قابلیت چت با صاحب آگهی : </small>
                                            {currentData?._source?.object.mains.chat ? " دارد " : "ندارد"}
                                        </p>
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'> معاوضه : </small>
                                            {currentData?._source?.object.mains.exchange ? " دارد " : "ندارد"}
                                        </p>

                                    </Col>
                                    <Col className="mt-2" sm="6">
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'> معاوضه : </small>
                                            {currentData?._source?.object.mains.exchange ? " دارد " : "ندارد"}
                                        </p>

                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'> متراژ : </small>
                                            {currentData?._source?.object.others.meterage}
                                        </p>   <p className=' text-truncate mb-0 mt-1'>
                                        <small className='text-muted'> اجاره ماهانه : </small>
                                        {currentData?._source?.object.others.monthlyRent}
                                    </p>
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'>سپرده :</small>
                                            {currentData?._source?.object.others.deposit}
                                        </p>
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'>تغییر پذیر :</small>
                                            {currentData?._source?.object.others.convertable ? "هست " : "نیست"}
                                        </p>
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'>تبلیغ کننده :</small>
                                            {currentData?._source?.object.others.advertiser}
                                        </p>
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'> محله : </small>
                                            {currentData?._source?.object.mahal}
                                        </p>    <p className=' text-truncate mb-0 mt-1'>
                                        <small className='text-muted'> قیمت : </small>
                                        {currentData?._source?.object.price}
                                    </p>
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'>فوری :</small>
                                            {isFori() ? "است" : "خیر"}
                                        </p>
                                        <p className=' mb-0 mt-1'>
                                            <small className='text-muted'> توضیحات : </small>
                                            {currentData?._source?.object.mains.description}
                                        </p>
                                    </Col>
                                    <Col className="mt-1" sm="6">
                                        <div className='mb-1 w-100 form-check form-check-inline formBox'>
                                            <FormGroup>
                                                <Label for="fori">ارتقا آگهی</Label>
                                                <Controller
                                                    name='fori'
                                                    control={control}
                                                    render={({
                                                                 field, field: {
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
                                                            options={[{value: "fori", label: "فوری"},
                                                                {value: "nardeban", label: "نردبان"},
                                                                {value: "renewal", label: "تمدید"}]}
                                                            placeholder="لطفا انتخاب کنید"
                                                            noOptionsMessage={() => "پیدا نشد"}
                                                            loadingMessage={() => "..."}   //minor
                                                        />
                                                    )}
                                                />
                                            </FormGroup>
                                            {
                                                data?.role.permissions?.find(permission => permission.key.trim() === "PRODUCTS_UPDATE".trim()) &&
                                                <Col className="mt-2" sm="12">
                                                    <Button type="submit" className="me-1" color="primary"
                                                    >
                                                        {isLoading ? "در حال بارگذاری" : "ذخیره تغییرات"}
                                                    </Button>
                                                </Col>
                                            }
                                        </div>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col className="mt-2" sm="12">
                                        {
                                            currentData?._source?.object?.mains?.images &&
                                            currentData?._source?.object?.mains?.images.map(image => {
                                                return <Col className="mt-2" sm="4" md="4">
                                                    <img
                                                        className="img-fluid"
                                                        src={image}
                                                        alt={image}
                                                        height={"100"}
                                                    />
                                                </Col>
                                            })
                                        }
                                    </Col>

                                </Row>
                            </CardBody>


                        </Card>

                    </Form>

                </CardBody>

            </Card>

        </Fragment>
    )
}

export default EditCard
