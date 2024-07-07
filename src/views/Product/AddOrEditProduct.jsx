import {Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormFeedback, Input, Label, Row} from "reactstrap"
import {Link, useNavigate} from "react-router-dom"
import * as Yup from 'yup'
import {useState} from "react"
import {Controller, useFieldArray, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup/dist/yup"
import {handleDeleteAPI, handleShowErrorMessage, showPersianDate} from "@utils"
import API from "@src/utility/API"
import {toast} from "react-toastify"
import {useSelector} from "react-redux"
import Select, {components} from "react-select"
import {appConfig} from "@configs/config"

const AddOrEditProduct = ({currentData, isEdit}) => {

    //variable
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigation = useNavigate()
    const {categories} = useSelector(state => state.categories)


    const schema = Yup.object().shape({
        title: Yup.string().required("عنوان محصول الزامی می باشد")
            .min(4, "عنوان محصول نباید کمتر از 4 کاراکتر باشد"),
        description: Yup.string().required("توضیحات محصول الزامی می باشد")
            .min(4, "توضیحات محصول نباید کمتر از 4 کاراکتر باشد"),
        shortDescription: Yup.string().required("توضیحات کوتاه محصول الزامی می باشد")
            .min(4, "توضیحات کوتاه محصول نباید کمتر از 4 کاراکتر باشد"),
        price: Yup.number().typeError("برای قیمت مقدار عددی وارد کنید.").required("قیمت الزامی است."),
        discount: Yup.number().typeError("برای تخفیف مقدار عددی وارد کنید.").min(0, `کمترین مقدار تخفیف 0 است.`),
        quantity: Yup.number().typeError("برای تعداد مقدار عددی وارد کنید.").min(0, `کمترین مقدار تعداد 0 است.`).required("تعداد برای محصول الزامی است."),
        // sendingType: Yup.mixed().oneOf(
        //     ["today", "fast", "country"],
        //     `لطفا یکی از حالات ارسال "امروز" یا "سریع" یا "سراسر کشور" را انتخاب کنید.`
        // ),
        // .required("انتخاب حالت ارسال برای محصول الزامی است."),
        model: Yup.string().required("تعریف مدل برای محصول الزامی است."),
        speciality: Yup.string().required("تعریف ویژگی برای محصول الزامی است.")
    })

    const defaultValues = {
        title: (isEdit ? currentData.title : ""),
        description: (isEdit ? currentData.description : ""),
        shortDescription: (isEdit ? currentData.shortDescription : ""),
        category_id: (isEdit ? {
            label: currentData?.category?.name,
            value: currentData?.category?._id
        } : null),
        sendingType: (isEdit ? currentData.sendingType : null),
        price: isEdit ? currentData.price : 0,
        discount: isEdit ? currentData.discount : 0,
        quantity: isEdit ? currentData.quantity : 0,
        model: isEdit ? currentData.model : "",
        speciality: isEdit ? currentData.speciality : ""
    }

    const {control, handleSubmit, formState: {errors}} = useForm({defaultValues, resolver: yupResolver(schema)})
    const {fields, append, remove} = useFieldArray({
        control,
        name: "category_id"
    })

    //functions
    const handleDeleteProduct = async () => {
        try {
            const data = await handleDeleteAPI(`/product/${currentData._id}`)
            if (data?.success) navigation("/products")
        } catch (err) {
            await handleShowErrorMessage(err)
        }
    }
    const loadImage = e => {
        const image = e.target.files[0]
        setFile(image)
        setPreview(URL.createObjectURL(image))
    }

    const handleEditCreate = async (newCategory) => {
        console.log(newCategory)
        const formData = new FormData()
        formData.append("title", newCategory.title)
        formData.append("description", newCategory.description)
        formData.append("shortDescription", newCategory.shortDescription)
        formData.append("speciality", newCategory.speciality)
        formData.append("price", newCategory.price)
        formData.append("discount", newCategory.discount)
        formData.append("quantity", newCategory.quantity)
        formData.append("model", newCategory.model)
        formData.append("category_id", newCategory.category_id.value)
        if (newCategory.sendingType) {
            formData.append("sendingType", newCategory.sendingType.value)
        }
        if (file) {
            formData.append("image", file)
        }
        try {
            setLoading(true)

            if (isEdit) {
                const {data} = await API.put(`/product/${currentData._id}`, formData)
                if (data.success) {
                    toast.success(data.message)
                    setFile(null)
                    setPreview(null)
                    navigation("/products")
                }
            } else {
                const {data} = await API.post("/product", formData)
                if (data.success) {
                    toast.success(data.message)
                    setFile(null)
                    setPreview(null)
                    navigation("/products")
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
                <CardHeader>{isEdit ? "ویرایش" : "ایجاد"} محصول</CardHeader>
                <CardBody>
                    {isEdit && <Row>
                        <p className="rtl mt-2">تاریخ ایجاد
                            : {showPersianDate(currentData.createdAt)}</p>
                        <p className="rtl mt-2">تاریخ آخرین به روز رسانی
                            : {showPersianDate(currentData.updatedAt)}</p>
                    </Row>}
                    <Row>
                        <Col sm="6" className="mb-1">
                            <Label className="form-label mt-1" for="title">
                                عنوان محصول
                                <span className="text-danger">*</span>
                            </Label>
                            <Controller
                                name="title"
                                control={control}
                                render={({field}) => (
                                    <Input id="title"
                                           placeholder="عنوان محصول"
                                           invalid={errors.title && true} {...field} />
                                )}
                            />
                            {errors.title && <FormFeedback>{errors.title.message}</FormFeedback>}
                            <Label className="form-label mt-1" for="model">
                                مدل
                                <span className="text-danger">*</span>
                            </Label>
                            <Controller
                                name="model"
                                control={control}
                                render={({field}) => (
                                    <Input id="model"
                                           placeholder="مدل"
                                           invalid={errors.model && true} {...field} />
                                )}
                            />
                            {errors.model && <FormFeedback>{errors.model.message}</FormFeedback>}
                            <Label className="form-label mt-1" for="shortDescription">
                                توضیحات کوتاه
                                <span className="text-danger">*</span>
                            </Label>
                            <Controller
                                name="shortDescription"
                                control={control}
                                render={({field}) => (
                                    <Input id="shortDescription"
                                           placeholder="توضیحات کوتاه"
                                           invalid={errors.shortDescription && true} {...field} />
                                )}
                            />
                            {errors.shortDescription && <FormFeedback>{errors.shortDescription.message}</FormFeedback>}
                            <Label className="form-label mt-1" for="description">
                                توضیحات
                                <span className="text-danger">*</span>
                            </Label>
                            <Controller
                                name="description"
                                control={control}
                                render={({field}) => (
                                    <Input id="description"
                                           placeholder="توضیحات"
                                           type="textarea"
                                           invalid={errors.description && true} {...field} />
                                )}
                            />
                            {errors.description && <FormFeedback>{errors.description.message}</FormFeedback>}

                            <Label className="form-label mt-1" for="speciality">
                                ویژگی ها
                                <span className="text-danger">*</span>
                            </Label>
                            <Controller
                                name="speciality"
                                control={control}
                                render={({field}) => (
                                    <Input id="speciality"
                                           placeholder="ویژگی ها"
                                           type="textarea"
                                           invalid={errors.speciality && true} {...field} />
                                )}
                            />
                            {errors.speciality && <FormFeedback>{errors.speciality.message}</FormFeedback>}


                        </Col>
                        <Col sm={6} className="mb-1">

                            <Label className="form-label mt-1" for="price">قیمت<span
                                className="text-danger">*</span></Label>
                            <Controller
                                name="price"
                                control={control}
                                render={({field}) => (
                                    <Input id="price"
                                           type="number"
                                           placeholder="قیمت"
                                           invalid={errors.price && true} {...field} />
                                )}
                            />
                            {errors.price && <FormFeedback>{errors.price.message}</FormFeedback>}

                            <Label className="form-label mt-1" for="discount">تخفیف<span
                                className="text-danger">*</span></Label>
                            <Controller
                                name="discount"
                                control={control}
                                render={({field}) => (
                                    <Input id="discount"
                                           type="number"
                                           placeholder="تخفیف"
                                           invalid={errors.discount && true} {...field} />
                                )}
                            />
                            {errors.discount && <FormFeedback>{errors.discount.message}</FormFeedback>}

                            <Label className="form-label mt-1" for="quantity">موجودی انبار<span
                                className="text-danger">*</span></Label>
                            <Controller
                                name="quantity"
                                control={control}
                                render={({field}) => (
                                    <Input id="quantity"
                                           type="number"
                                           placeholder="موجودی انبار"
                                           invalid={errors.quantity && true} {...field} />
                                )}
                            />
                            {errors.quantity && <FormFeedback>{errors.quantity.message}</FormFeedback>}

                            <Label className="form-label mt-1" for="category_id">
                                انتخاب دسته بندی </Label>
                            <Controller
                                control={control}
                                name="category_id"
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
                                        options={categories.map(category => ({
                                            label: category?.name,
                                            value: category?._id
                                        }))}
                                        placeholder="دسته بندی"
                                        noOptionsMessage={() => "پیدا نشد"}
                                        loadingMessage={() => "..."}   //minor type-O here
                                    />
                                )}
                            />
                            {errors.category_id && <FormFeedback>{errors.category_id.message}</FormFeedback>}

                            <Label className="form-label mt-1" for="sendingType">
                                انتخاب حالت ارسال </Label>
                            <Controller
                                control={control}
                                name="sendingType"
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
                                        options={appConfig.sendingType}
                                        placeholder="حالت ارسال"
                                        noOptionsMessage={() => "پیدا نشد"}
                                        loadingMessage={() => "..."}   //minor type-O here
                                    />
                                )}
                            />
                            {errors.sendingType && <FormFeedback>{errors.sendingType.message}</FormFeedback>}

                            <div className='imageLoader'>
                                {preview ?
                                    <img className="mt-5 has-shadow image" src={preview} width="250" alt=""/> :
                                    <img className="mt-5 has-shadow image" src={currentData?.url} width="250"
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
                    <Link disabled={loading} to="/products"
                          className="btn btn-outline-primary btn-md-md mx-sm-1 btn-sm-sm">لیست محصولات</Link>

                    <Button disabled={loading} type="submit"
                            className="btn btn-success btn-md mx-2 mx-sm-1">{isEdit ? "ویرایش" : "ایجاد"} محصول
                    </Button>
                    {isEdit && <Button disabled={loading} onClick={() => handleDeleteProduct()}
                                       className="btn btn-danger btn-md mx-2 mx-sm-1">حذف محصول
                    </Button>}

                </CardFooter>
            </Form>
        </Card>
    )
}
export default AddOrEditProduct