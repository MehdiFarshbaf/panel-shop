import {Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormFeedback, Input, Label, Row} from "reactstrap"
import {Link, useNavigate} from "react-router-dom"
import * as Yup from 'yup'
import {useState} from "react"
import {Controller, useFieldArray, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup/dist/yup"
import {handleDeleteAPI, handleShowErrorMessage} from "@utils"
import API from "@src/utility/API"
import {toast} from "react-toastify"
import {useSelector} from "react-redux"
import Select, {components} from "react-select"


const AddEditPost = ({currentData, isEdit}) => {
    console.log(currentData)
    //variable
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigation = useNavigate()
    const {categories} = useSelector(state => state.categories)


    const schema = Yup.object().shape({
        title: Yup.string().required("عنوان پست الزامی می باشد")
            .min(3, "عنوان پست نباید کمتر از 3 کاراکتر باشد"),
        description: Yup.string().required("توضیحات پست الزامی می باشد"),
        shortDescription: Yup.string().required("توضیحات کوتاه پست الزامی می باشد"),
        // category_id: Yup.object().required("انتخاب دسته بندی الزامی است.")
    })

    const defaultValues = {
        title: (isEdit ? currentData.title : ""),
        description: (isEdit ? currentData.description : ""),
        shortDescription: (isEdit ? currentData.shortDescription : ""),
        category_id: (isEdit ? {
            label: currentData?.category?.name,
            value: currentData?.category?._id
        } : null)
    }

    const {control, handleSubmit, formState: {errors}} = useForm({defaultValues, resolver: yupResolver(schema)})
    const {fields, append, remove} = useFieldArray({
        control,
        name: "category_id"
    })

    //functions
    const handleDeletePost = async () => {
        try {
            const data = await handleDeleteAPI(`/blog/${currentData._id}`)
            if (data?.success) navigation("/posts")
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
        const formData = new FormData()
        formData.append("title", newCategory.title)
        formData.append("description", newCategory.description)
        formData.append("shortDescription", newCategory.shortDescription)
        formData.append("category_id", newCategory.category_id.value)
        if (file) {
            formData.append("image", file)
        }
        try {
            setLoading(true)

            if (isEdit) {
                const {data} = await API.put(`/blog/${currentData._id}`, formData)
                if (data.success) {
                    toast.success(data.message)
                    setFile(null)
                    setPreview(null)
                    navigation("/posts")
                }
            } else {
                const {data} = await API.post("/blog", formData)
                if (data.success) {
                    toast.success(data.message)
                    setFile(null)
                    setPreview(null)
                    navigation("/posts")
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
                <CardHeader>{isEdit ? "ویرایش" : "ایجاد"} پست</CardHeader>
                <CardBody>
                    <Row>
                        <Col sm="6" className="mb-1">
                            <Label className="form-label mt-1" for="title">
                                عنوان پست
                                <span className="text-danger">*</span>
                            </Label>
                            <Controller
                                name="title"
                                control={control}
                                render={({field}) => (
                                    <Input id="title"
                                           placeholder="عنوان پست"
                                           invalid={errors.title && true} {...field} />
                                )}
                            />
                            {errors.title && <FormFeedback>{errors.title.message}</FormFeedback>}
                            <Label className="form-label mt-1" for="shortDescription">
                                توضیحات کوتاه
                                <span className="text-danger">*</span>
                            </Label>
                            <Controller
                                name="shortDescription"
                                control={control}
                                render={({field}) => (
                                    <Input id="title"
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
                        </Col>
                        <Col sm={6} className="mb-1">
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
                    <Link disabled={loading} to="/posts"
                          className="btn btn-outline-primary btn-md-md mx-sm-1 btn-sm-sm">لیست پست ها</Link>

                    <Button disabled={loading} type="submit"
                            className="btn btn-success btn-md mx-2 mx-sm-1">{isEdit ? "ویرایش" : "ایجاد"} پست
                    </Button>
                    {isEdit && <Button disabled={loading} onClick={() => handleDeletePost()}
                                       className="btn btn-danger btn-md mx-2 mx-sm-1">حذف پست
                    </Button>}

                </CardFooter>
            </Form>
        </Card>
    )
}
export default AddEditPost