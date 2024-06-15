// ** React Imports
import {Fragment, useEffect, useState} from "react"
import {EditorState} from "draft-js"
// ** Custom Components
// ** Third Party Components
// ** Reactstrap Imports
import {
    Button,
    Card,
    CardBody,
    Col,
    Form,
    Input,
    Label,
    Row
} from "reactstrap"

// ** Styles
import "react-slidedown/lib/slidedown.css"
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/base/pages/app-invoice.scss"
import {Controller, useForm} from "react-hook-form"
import "cleave.js/dist/addons/cleave-phone.us"
import axios from "axios"
import toast from "react-hot-toast"
import {useNavigate} from "react-router-dom"
import moment from "moment-jalaali"
import Select, {components} from "react-select"
import {getData as getDataShop} from "@src/views/shop/store"
import {getData as getDataCategory} from "@src/views/categories/store"
import {
    getData as getDataAdvertisement
} from "@src/views/advertisement/store"
import {useDispatch, useSelector} from "react-redux"
import MyEditor from "../../../MyEditor/MyEditor"

const OptionComponent = ({data, ...props}) => {

    return (
        <components.Option {...props}>
            {data.image && <img src={data.image} className="me-50" height={"30px"}
                                width={"30px"} alt=""/>}
            {data.label}
        </components.Option>
    )
}
const AddCard = ({countries, listCountriesBlank}) => {
    const [cities, setCities] = useState(null)
    const [provinces, setProvince] = useState(null)
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const [isLoading, setIsLoading] = useState(false)
    const listCountries = [
        {
            label: "تمامی کشورها",
            value: 'TOTAL'
        },
        {
            label: "PATTERN",
            value: 'PATTERN'
        },
        ...countries
    ]
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {languages} = useSelector(state => state.navbar)

    const [citiesListBlank, setCitiesList] = useState([])
    const {data: categories} = useSelector(state => state.categories)
    const {data: shop} = useSelector(state => state.shop)
    const {data: advertisement} = useSelector(state => state.advertisement)

    const defaultValues = {
        title: null,
        slug: "",
        city: null,
        description: null,
        shop: {value: "TOTAL", label: "همه فروشگاه ها"},
        shop_id: null,
        product: {value: "TOTAL", label: "همه محصولات"},
        product_id: null,
        category: "",
        Pageable_type: {value: "HOME", label: "خانه"},
        Pageable_id: null,
        country: null,
        province: null,
        language: {value: "fa", label: "fa"},
        h1: null,
        content: null

    }

    const {
        control,
        handleSubmit, watch, setValue,
        formState: {errors}
    } = useForm({defaultValues})
    const findCountryName = async id => {
        if (id === "TOTAL" || id === "PATTERN") {
            return id
        } else {
            const obj = await listCountriesBlank.find(item => item.id == id)
            return obj?.name
        }
    }
    const findCityName = async id => {
        if (id === "TOTAL" || id === "PATTERN") {
            return id
        } else {
            const obj = await citiesListBlank.find(item => item.id == id)
            return obj?.name || ""
        }
    }
    const Pageable_type = watch().Pageable_type


    useEffect(() => {
        dispatch(getDataShop())
        dispatch(getDataCategory())
        dispatch(getDataAdvertisement())

    }, [dispatch])
    const findPagableId = (name, data) => {

        switch (name) {
            case "CATEGORY": {
                if (watch().category.value === "id") {
                    return watch().slug
                } else {
                    return watch().category.value
                }
            }
            // return watch().category.value
            case "SHOP": {
                if (data.shop.value !== "id") {
                    return data.shop.value
                } else {
                    return data.shop_id
                }
            }
            case "PRODUCT": {
                if (data.product !== "id") {
                    return data.product
                } else {
                    return data.product_id
                }
            }
            default :
                return null
        }
    }
    const onSubmit = async data => {

        setIsLoading(true)
        const dataInfo = new FormData()
        const newData={
        }
        dataInfo.append(`title`, data.title)
        dataInfo.append(`description`, data.description)
        // dataInfo.append(`city`,data.city.value)
        dataInfo.append(`city`, data.city !== null ? await findCityName(data.city.value) : undefined)
        dataInfo.append(`country`, data.country ? await findCountryName(data.country.value) : undefined)
        dataInfo.append(`language`, data.language.value)
        dataInfo.append(`content`, editorState)
        dataInfo.append(`h1`, data.h1)
        dataInfo.append(`pageable_type`, data.Pageable_type.value)
        dataInfo.append(`shop_id`, data.Pageable_type.value === 'SHOP' && data.shop === 'id' ? data.shop_id : null)
        dataInfo.append(`product_id`, data.Pageable_type.value === 'PRODUCT' && data.product === 'id' ? data.product_id : null)
        // dataInfo.append(`pageable_id`, data.Pageable_type.value === 'SHOP' ? data.shop.value : data.Pageable_type.value === "PRODUCT" ? data.product.value : data.Pageable_type.value === "CATEGORY" ? data.category.value : null)
        // dataInfo.append(`pageable_id`, data.Pageable_type.value === 'SHOP' ? (data.shop.value !== "id" ? data.shop.value : data.shop_id) : (data.Pageable_type.value === 'PRODUCT' ? (data.product !== "id" ? data.product : data.product_id) : null))
        dataInfo.append(`pageable_id`, findPagableId(data.Pageable_type.value, data))

        axios.post(`/seos`, dataInfo).then(res => {
                if (res.status === 200) {

                    toast.success("با موفقیت عملیات انجام شد")
                    navigate("/site-content/seo/list")
                }
            }
        ).catch(() => setIsLoading(false))
    }

    const Cities = async () => {
        setValue("city", null)
        try {
            const response = await axios.get(`/cities?province_id=${watch().province.value}`)
            setCitiesList(response.data.data)
            const receiveCities = response.data.data.map((data) => ({
                label: data.name,
                value: data.id
                // value: data.id
            }))
            const citiesList = [
                {label: "تمامی شهرها", value: "TOTAL"},
                {label: "PATTERN", value: "PATTERN"},
                ...receiveCities
            ]
            return setCities(citiesList)
            // return setCities(response.data.data.map((data) => ({
            //     label: data.name,
            //     value: data.id
            // })))
        } catch (error) {
            console.error("Error fetching cities:", error)
            return []
        }
    }
    const Provinces = async () => {
        setValue("province", null)
        try {
            const response = await axios.get(`/provinces?country_id=${watch().country.value}`)

            const receiveProvinces = response.data.data.map((data) => ({
                label: data.name,
                value: data.id
                // value: data.id
            }))
            const provincesList = [
                {label: "تمامی استان ها", value: "TOTAL"},
                {label: "PATTERN", value: "PATTERN"},
                ...receiveProvinces
            ]
            return setProvince(provincesList)
            // return setProvince(response.data.data.map((data) => ({
            //     label: data.name,
            //     value: data.id
            // })))
        } catch (error) {
            console.error("Error fetching cities:", error)
            return []
        }
    }

    return (
        <Fragment>
            <Card className="invoice-preview-card">
                <CardBody className="invoice-padding pt-0">
                    <Form className="mt-2 pt-50"
                          onSubmit={handleSubmit(onSubmit)}>

                        <Row>
                            <Col sm="6" className="mb-1">
                                <Label className="form-label" for="title">
                                    عنوان
                                </Label>
                                <Controller
                                    name="title"
                                    control={control}
                                    render={({field}) => (
                                        <Input id="title"
                                               placeholder="عنوان "
                                               invalid={errors.title && true} {...field} />
                                    )}
                                />
                            </Col>
                            {
                                languages.length > 0 &&
                                <Col className="mb-1" md="6"
                                     sm="12">
                                    <Label className="form-label">زبان </Label>
                                    <Controller
                                        control={control}
                                        name={`language`}

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
                                                options={languages.map(lang => ({value: lang, label: lang}))}
                                                placeholder=""
                                                noOptionsMessage={() => "پیدا نشد"}
                                                loadingMessage={() => "..."}   //minor
                                            />
                                        )}
                                    />
                                </Col>

                            }
                            <Col className="mb-1" md="6"
                                 sm="12">
                                <Label className="form-label">کشور </Label>
                                <Controller
                                    control={control}
                                    name={`country`}

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
                                                Provinces()

                                            }}
                                            options={listCountries}
                                            placeholder=""
                                            noOptionsMessage={() => "پیدا نشد"}
                                            loadingMessage={() => "..."}   //minor
                                        />
                                    )}
                                />
                            </Col>

                            <Col className="mb-1" md="6"
                                 sm="12">
                                <Label className="form-label">استان </Label>
                                <Controller
                                    control={control}
                                    name={`province`}
                                    render={({
                                                 field: {
                                                     onChange,
                                                     value,
                                                     ref
                                                 }
                                             }) => (
                                        <Select
                                            isLoading={watch().country && !provinces?.length}
                                            inputRef={ref}
                                            className="react-select"
                                            classNamePrefix="select"
                                            value={value}
                                            onChange={val => {
                                                onChange(val)
                                                Cities()

                                            }}
                                            options={provinces}
                                            placeholder=""
                                            noOptionsMessage={() => "پیدا نشد"}
                                            loadingMessage={() => "..."}   //minor
                                        />
                                    )}
                                />
                            </Col>

                            <Col className="mb-1" md="6"
                                 sm="12">
                                <Label
                                    className="form-label">
                                    شهر </Label>

                                <Controller
                                    control={control}
                                    name={`city`}
                                    render={({
                                                 field: {
                                                     onChange,
                                                     value,
                                                     ref
                                                 }
                                             }) => (
                                        <Select
                                            inputRef={ref}
                                            isLoading={watch().province && !cities}

                                            className="react-select"
                                            classNamePrefix="select"
                                            value={value}
                                            onChange={val => onChange(val)}
                                            options={cities}
                                            placeholder=""
                                            noOptionsMessage={() => "پیدا نشد"}
                                            loadingMessage={() => "..."}   //minor
                                        />
                                    )}
                                />
                            </Col>

                            <Col className="mb-1" md="6"
                                 sm="12">
                                <Label className="form-label"> نوع صفحه </Label>
                                <Controller
                                    control={control}
                                    name={`Pageable_type`}

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
                                            onChange={val => onChange(val)}
                                            options={[
                                                {
                                                    value: "HOME",
                                                    label: "خانه"
                                                }, {
                                                    value: "CATEGORY",
                                                    label: "دسته بندی"
                                                },
                                                {
                                                    value: "PRODUCT",
                                                    label: "محصول"
                                                }, {
                                                    value: "SHOP",
                                                    label: "فروشگاه"
                                                }, {
                                                    value: "ABOUT",
                                                    label: "درباره ما"
                                                }, {
                                                    value: "CONTACT",
                                                    label: "تماس با ما"
                                                }, {
                                                    value: "TERMS",
                                                    label: "قوانین و مقرارت"
                                                }, {
                                                    value: "PRIVACY",
                                                    label: "حریم خصوصی"
                                                },
                                                {
                                                    value: "FAQ",
                                                    label: "سوالات متداول"
                                                }
                                            ]}
                                            placeholder=""
                                            noOptionsMessage={() => "پیدا نشد"}
                                            loadingMessage={() => "..."}   //minor
                                        />
                                    )}
                                />
                            </Col>
                            {
                                watch().Pageable_type.value === "CATEGORY" &&
                                <Col className="mb-1" md="6"
                                     sm="12">
                                    <Label className="form-label">
                                        دسته بندی </Label>

                                    <Controller
                                        control={control}
                                        // name="options"
                                        name={`category`}

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
                                                onChange={val => onChange(val)}
                                                options={categories?.length >= 1 ? [
                                                    {
                                                        value: "TOTAL",
                                                        label: "همه دسته بندی ها"
                                                    },
                                                    {
                                                        value: "PATTERN",
                                                        label: "PATTERN"
                                                    },
                                                    {
                                                        value: "id",
                                                        label: "slug دسته بندی"
                                                    }
                                                ] : [
                                                    {
                                                        value: "",
                                                        label: "",
                                                        image: ""
                                                    }
                                                ]}
                                                components={{
                                                    Option: OptionComponent
                                                }}
                                                placeholder=""
                                                noOptionsMessage={() => "پیدا نشد"}
                                                loadingMessage={() => "..."}   //minor
                                            />
                                        )}
                                    />
                                </Col>

                            }
                            {watch().category.value === "id" &&
                                <Col sm="6" className="mb-1">
                                    <Label className="form-label" for="slug">slug دسته بندی</Label>
                                    <Controller
                                        name="slug"
                                        control={control}
                                        render={({field}) => (
                                            <Input id="slug"
                                                   placeholder="slug دسته بندی"
                                                   invalid={errors.title && true} {...field} />
                                        )}
                                    />
                                </Col>
                            }
                            {
                                watch().Pageable_type.value === "SHOP" &&
                                <Col className="mb-1" md="6"
                                     sm="12">
                                    <Label className="form-label">
                                        فروشگاه</Label>

                                    <Controller
                                        control={control}
                                        // name="options"
                                        name={`shop`}


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
                                                onChange={val => onChange(val)}
                                                options={[
                                                    {
                                                        value: "TOTAL",
                                                        label: "همه فروشگاه ها"
                                                    },
                                                    {
                                                        value: "PATTERN",
                                                        label: "PATTERN"
                                                    },
                                                    {
                                                        value: "id",
                                                        label: "آی دی فروشگاه"
                                                    }

                                                ]}
                                                // options={shop?.length >= 1 ? [
                                                //     {value: null, label: "همه"}, ...shop.map((data) => ({
                                                //         label: data.title,
                                                //         value: data.id,
                                                //         image: data.store_photo
                                                //     }))
                                                // ] : [{value: '', label: "", image: ''}]}
                                                components={{
                                                    Option: OptionComponent
                                                }}
                                                placeholder=""
                                                noOptionsMessage={() => "پیدا نشد"}
                                                loadingMessage={() => "..."}   //minor
                                            />
                                        )}
                                    />
                                </Col>

                            }
                            {watch().shop.value === "id" && watch().Pageable_type.value === "SHOP" ?
                                <Col sm="6" className="mb-1">
                                    <Label className="form-label" for="title">
                                        آی دی فروشگاه
                                    </Label>
                                    <Controller
                                        name="shop_id"
                                        control={control}
                                        render={({field}) => (
                                            <Input id="shop_id"
                                                   placeholder="آی دی فروشگاه"
                                                   invalid={errors.title && true} {...field} />
                                        )}
                                    />
                                </Col> : null
                            }
                            {
                                watch().Pageable_type.value === "PRODUCT" &&
                                <Col className="mb-1" md="6"
                                     sm="12">
                                    <Label
                                        className="form-label">
                                        محصولات </Label>

                                    <Controller
                                        control={control}
                                        name={`product`}

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
                                                onChange={val => onChange(val)}
                                                options={[
                                                    {
                                                        value: "TOTAL",
                                                        label: "همه محصولات"
                                                    },
                                                    {
                                                        value: "PATTERN",
                                                        label: "PATTERN"
                                                    },
                                                    {
                                                        value: "id",
                                                        label: "آی دی محصول"
                                                    }

                                                ]}
                                                // options={advertisement?.length >= 1 ? [
                                                //     {
                                                //         value: "total",
                                                //         label: "همه"
                                                //     }, ...advertisement.map((data) => ({
                                                //         label: data._source?.object?.slug,
                                                //         value: data._id,
                                                //         image: data._source.object?.mains?.images[0]
                                                //     }))
                                                // ] : [
                                                //     {
                                                //         value: "",
                                                //         label: "",
                                                //         image: ""
                                                //     }
                                                // ]}
                                                components={{
                                                    Option: OptionComponent
                                                }}
                                                placeholder=""
                                                noOptionsMessage={() => "پیدا نشد"}
                                                loadingMessage={() => "..."}   //minor
                                            />
                                        )}
                                    />
                                </Col>

                            }
                            {watch().product.value === "id" && watch().Pageable_type.value === "PRODUCT" ?
                                <Col sm="6" className="mb-1">
                                    <Label className="form-label" for="title">
                                        آی دی محصول
                                    </Label>
                                    <Controller
                                        name="product_id"
                                        control={control}
                                        render={({field}) => (
                                            <Input id="product_id"
                                                   placeholder="آی دی محصول"
                                                   invalid={errors.product && true} {...field} />
                                        )}
                                    />
                                </Col> : null}

                            <Col sm="12" className="mb-1 w-100">
                                <Label className="form-label" for="description">
                                    توضیحات
                                </Label>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({field}) => (
                                        <Input id="description"
                                               placeholder="توضیحات "
                                               type={"textarea"}

                                               invalid={errors.description && true} {...field} />
                                    )}
                                />
                            </Col>
                            <Col sm="6" className="mb-1">
                                <Label className="form-label" for="title">h1</Label>
                                <Controller
                                    name="h1"
                                    control={control}
                                    render={({field}) => (
                                        <Input id="h1"
                                               placeholder="h1"
                                               invalid={errors.h1 && true} {...field} />
                                    )}
                                />
                            </Col>
                            <Col sm="12" className="mb-1">
                                <Label className="form-label" for="content">content</Label>
                                <MyEditor editorState={editorState} setEditorState={setEditorState}/>
                            </Col>
                            <Col className="mt-2" sm="12">
                                <Button type="submit" className="me-1"
                                        color="primary">
                                    {isLoading ? "در حال بارگذاری" : "ذخیره تغییرات"}

                                </Button>
                                <Button onClick={() => navigate("/site-content/seo/list")}
                                        type="reset" color="secondary" outline>
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
