// ** React Imports
import {Fragment, useState} from "react"

// ** Custom Components
// ** Third Party Components
// ** Reactstrap Imports
import {Button, Card, CardBody, CardTitle, Col, Form, Input, Label, Row} from "reactstrap"

// ** Styles
import "react-slidedown/lib/slidedown.css"
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/base/pages/app-invoice.scss"
import {Controller, useForm} from "react-hook-form"
import "cleave.js/dist/addons/cleave-phone.us"
import toast from "react-hot-toast"
import {useNavigate} from "react-router-dom"

import moment from "moment-jalaali"
import axios from "axios"
import API from "../../../utility/API";
import {useSelector} from "react-redux";
import {appConfig} from "../../../configs/config";

const EditCard = ({currentData, banner}) => {
    console.log(currentData)
    const data = JSON.parse(localStorage.getItem('userData'))
    // ** State
    const [isLoading, setIsLoading] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [is_special, setIsSpecial] = useState(currentData.is_special === 1)
    const [file, setFile] = useState([])
    const [preview, setPreview] = useState("")
    const navigate = useNavigate()
    const {showBanner} = useSelector(state => state.navbar)
    // ** Hooks
    const defaultValues = {
        active: currentData.status === 1
    }
    const {
        control,
        setError,
        handleSubmit, watch,
        formState: {errors}
    } = useForm({defaultValues})

    const onSubmit = data => {
        setIsLoading(true)

        const dataInfo = new FormData()

        dataInfo.append("_method", "put")
        dataInfo.append("store_id", currentData.id)
        axios.post(`/admin/business`, dataInfo
        ).then(() => {
            toast.success(" با موفقیت ایجاد شد.")
            navigate("/shop/list")
        })
            .catch(() => setIsLoading(false))
    }
    const loadImage = (e) => {
        // const image = e.target.files[0]
        const image = e
        setFile(image)
        setPreview(URL.createObjectURL(image))
    }
    const handleSpecial = async () => {

        try {
            setIsLoading(true)
            const res = await axios.put("/admin/business/special", {
                store_id: currentData.id,
                is_special: !is_special
            })
            if (res.status === 200) {
                setIsSpecial(!is_special)
                setIsLoading(false)
            }
        } catch (err) {
            console.log(err)
            setIsLoading(false)
        }
    }
    const handleEditBanner = async () => {
        setIsLoading(true)
        const formData = new FormData()
        formData.append("store_photo", file)
        try {
            const res = await axios.post("/convertImageToUrl", formData)
            if (res.status === 200) {
                const {url} = res.data
                const result = await axios.post("/banner", {
                    image: url,
                    business_id: currentData.id
                })
                if (result.status === 200) {
                    setIsLoading(false)
                }
            }
        } catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }

    return (
        <Fragment>
            <Card className='invoice-preview-card'>

                <CardBody className='invoice-padding pt-0'>
                    <Form className='mt-2 pt-50' onSubmit={handleSubmit(onSubmit)}>
                        <Card className="invoice-preview-card">
                            <CardBody className="invoice-padding p-2">
                                <CardTitle tag='h2'>
                                    فروشگاه
                                </CardTitle>
                                <Row>
                                    <Col className="mt-2" sm="12" md={"4"}>
                                        <img className="img-fluid"
                                             src={currentData.logo}
                                             alt={currentData.title}
                                             height={"100"}/>
                                    </Col>
                                    <Col className="mt-2" sm="12" md={"4"}>
                                        <img className="img-fluid"
                                             src={currentData.personal_photo}
                                             alt={currentData.title}
                                             height={"100"}/>
                                    </Col>
                                    <Col className="mt-2" sm="12" md={"4"}>
                                        <img className="img-fluid"
                                             src={currentData.store_photo}
                                             alt={currentData.title}
                                             height={"100"}/>
                                    </Col>
                                    <Col className="mt-2" sm="6">
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'> عنوان : </small>
                                            {currentData.title}
                                        </p>

                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'> آدرس : </small>
                                            {currentData.address}
                                        </p>         <p className=' text-truncate mb-0 mt-1'>
                                        <small className='text-muted'> مجوز فروشگاه : </small>
                                        {currentData.business_license}
                                    </p>
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'> دسته بندی : </small>
                                            {currentData.category}
                                        </p>
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'> زیر دسته : </small>
                                            {currentData.subCategory}
                                        </p>
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'> دسته بندی داخلی : </small>
                                            {currentData.innerCategory}
                                        </p>
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'> چت : </small>
                                            {currentData.chat !== 0 ? "دارد" : "ندارد"}
                                        </p>

                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'> توضیح : </small>
                                            {currentData.description}
                                        </p>
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'> تعداد نوتیفیکیشن های ایمیل : </small>
                                            {currentData.email_notification}
                                        </p>    <p className=' text-truncate mb-0 mt-1'>
                                        <small className='text-muted'>تعداد ارسال به خانه :</small>
                                        {currentData.home_delivery}
                                    </p>
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'>شهر : </small>
                                            {currentData.city}
                                        </p>
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'> تاریخ ساخت : </small>
                                            {currentData.created_at &&
                                                moment(currentData.created_at).format("jYYYY-jMM-jDD HH:mm:ss")
                                            }
                                        </p>

                                    </Col>
                                    <Col className="mt-2" sm="6">


                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'>نام :</small>
                                            {currentData.name}
                                        </p>
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'>نام خانوادگی :</small>
                                            {currentData.last_name}
                                        </p>
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'>کد ملی :</small>
                                            {currentData.national_code}
                                        </p>
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'>پرداخت در خانه :</small>
                                            {currentData.pay_at_home}
                                        </p>
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'>تلفن :</small>
                                            {currentData.phone}
                                        </p>
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'>ارسالی تلفن : </small>
                                            {currentData.phone_notification}
                                        </p>
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'>کد پستی : </small>
                                            {currentData.postal_code}
                                        </p>
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'> تعداد ارسالی : </small>
                                            {currentData.delivery}
                                        </p>
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'>پست ویژه : </small>
                                            {currentData.special_post}
                                        </p>
                                        <p className=' text-truncate mb-0 mt-1'>
                                            <small className='text-muted'>خرید حضوری : </small>
                                            {currentData.shop_at_store}
                                        </p>
                                    </Col>

                                    {currentData.store_video && <Row className="mt-3 mb-3">
                                        <Col className="mt-1" sm="6">
                                            <video
                                                src={currentData.store_video} height="500" width="600" controls
                                                className="videoPlayer">
                                            </video>
                                        </Col>
                                    </Row>}
                                    <Col className="mt-1" sm="6">
                                        <div className='mb-1 form-check form-check-inline'>
                                            <Controller
                                                name='active'
                                                control={control}
                                                render={({
                                                             field, field: {
                                                        onChange,
                                                        value,
                                                        ref
                                                    }
                                                         }) => (
                                                    <Input id='active'
                                                           type='checkbox'
                                                           placeholder='' invalid={errors.active && true}
                                                           checked={value}
                                                           disabled={true}
                                                           {...field} />
                                                )}
                                            />
                                            <Label for='active' className='form-check-label'>
                                                فعال است
                                            </Label>
                                        </div>

                                    </Col>
                                    {appConfig.specialProduct && <Col className="mt-1" sm="6">

                                        <Button className="me-1" onClick={() => handleSpecial()}
                                                color="primary">
                                            {isLoading ? "در حال بارگذاری" : is_special ? "غیر فعال کردن ویژه" : "فعال کردن حالت ویژه"}

                                        </Button>

                                    </Col>}
                                    {
                                        data?.role.permissions?.find(permission => permission.key.trim() === "BUSINESSES_UPDATE".trim()) &&

                                        <Col className="mt-2" sm="12">
                                            <Button type="submit" className="me-1" color="primary"
                                            >
                                                {isLoading ? "در حال بارگذاری" : currentData.status === 1 ? "تغییر" +
                                                    " وضعیت به غیرفعال" : "تغییر وضعیت به فعال"}


                                            </Button>

                                        </Col>
                                    }
                                </Row>
                                {showBanner && <Row className='mt-3'>
                                    <div className="w-100 d-flex justify-content-between align-content-center">
                                        <div>
                                            <label id="upload" className="btn btn-sm btn-primary">بارگذاری بنر
                                                <Input id="upload" hidden type="file" accept="image/png, image/jpeg"
                                                       onChange={e => loadImage(e.target.files[0])}/>
                                            </label>
                                        </div>
                                        <div className="w-50 d-flex justify-content-center align-content-center">
                                            {preview ? (<figure className='mt-3'>
                                                <img src={preview} width='300' alt=""/>
                                            </figure>) : (banner ? <img src={banner.image} width='300' alt=""/> : null)}
                                        </div>
                                    </div>
                                    <Col className="mt-2" sm="12">
                                        {preview && <Button disable={isLoading} onClick={() => handleEditBanner()}
                                                            color='primary'>{isLoading ? "لطفا منتظر بمانید" : "ذخیره بنر"}</Button>}
                                    </Col>
                                </Row>}
                            </CardBody>


                        </Card>

                    </Form>

                </CardBody>

            </Card>

        </Fragment>
    )
}

export default EditCard
