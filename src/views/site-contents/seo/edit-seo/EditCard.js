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
import log from "eslint-plugin-react/lib/util/log";
import MyEditor from "../../../MyEditor/MyEditor";

const types = [
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
    }
]
const EditCard = ({countries, currentData, province, advertisement, shop, categories}) => {
    console.log(currentData)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const defaultValues = {
        title: currentData.title,
        h1: currentData.h1,
        description: currentData.description,
        shop: currentData.pageable_type === "SHOP" ? {
            value: shop.find(shop => shop.value === (currentData.pageable_id))?.value,
            label: shop.find(shop => shop.value === (currentData.pageable_id))?.label,
            image: shop.find(shop => shop.value === (currentData.pageable_id))?.image,
        } : null,
        product: currentData.pageable_type === "PRODUCT" ? {
            value: advertisement.find(product => product.value === currentData.pageable_id)?.value,
            label: advertisement.find(product => product.value === (currentData.pageable_id))?.label,
            image: advertisement.find(product => product.value === (currentData.pageable_id))?.image
        } : null,
        category: currentData.pageable_type === "CATEGORY" ? {
            value: categories.find(category => category.value === (currentData.pageable_id))?.value,
            label: categories.find(category => category.value === (currentData.pageable_id))?.label,
            image: categories.find(category => category.value === (currentData.pageable_id))?.image
        } : null,
        Pageable_type: {
            value: currentData.pageable_type,
            label: types.find(type => type.value === currentData.pageable_type)?.label
        },
        Pageable_id: null,
        country: {value: currentData.country?.toLowerCase(), label: currentData.country},
        city: {value: currentData.city?.toLowerCase(), label: currentData.city},
        province: {value: province.name?.toLowerCase(), label: province.name},
        language: {value: currentData.language, label: currentData.language}

    }

    const {
        control,
        handleSubmit, watch, setValue,
        formState: {errors}
    } = useForm({defaultValues})
    const Pageable_type = watch().Pageable_type


    const onSubmit = data => {
        setIsLoading(true)

        axios.post(`/seos/${currentData.id}`, {
            city: data.city.value?.toString(),
            content: editorState,
            h1: data.h1,
            title: data.title,
            description: data.description,
            country: data.country.value?.toString(),
            language: data.language.value,
            pageable_type: data.Pageable_type.value,
            pageable_id: data.Pageable_type.value === 'SHOP' ? data.shop.value : data.Pageable_type.value === "PRODUCT" ? data.product.value : data.Pageable_type.value === "CATEGORY" ? data.category.value : null
        }).then(res => {
                if (res.status === 200) {
                    toast.success("با موفقیت عملیات انجام شد")
                    navigate("/site-content/seo/list")
                }
            }
        ).catch(() => setIsLoading(false))
    }

    useEffect(() => {
        setEditorState(currentData.content)
    }, [])
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
                            <Col sm="6" className="mb-1">
                                <Label className="form-label" for="h1">h1</Label>
                                <Controller
                                    name="h1"
                                    control={control}
                                    render={({field}) => (
                                        <Input id="tith1le"
                                               placeholder="h1 "
                                               invalid={errors.title && true} {...field} />
                                    )}
                                />
                            </Col>
                            <Col sm="12" className="mb-1">
                                <Label className="form-label" for="description">توضیحات</Label>
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
                            <Col sm="12" className="mb-1">
                                <Label className="form-label" for="h1">content</Label>
                                <MyEditor editorState={editorState} setEditorState={setEditorState} />
                            </Col>
                            <Col className="mt-2" sm="12">
                                <Button type="submit" className="me-1"
                                        color="primary">
                                    {isLoading ? "در حال بارگذاری" : "ذخیره تغییرات"}
                                </Button>
                                <Button onClick={() => navigate(-1)}
                                        type="reset" color="secondary" outline>لغو</Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default EditCard
