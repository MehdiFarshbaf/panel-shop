import {Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormFeedback, Input, Label, Row} from "reactstrap"
import {Link, useNavigate} from "react-router-dom"
import * as Yup from 'yup'
import {Fragment, useState} from "react"
import {Controller, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup/dist/yup"
import {handleDeleteAPI, handleShowErrorMessage} from "@utils"
import API from "@src/utility/API"
import {toast} from "react-toastify"

const AddEditCategory = ({currentData, isEdit}) => {

    //variable
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigation = useNavigate()


    const schema = Yup.object().shape({
        name: Yup.string().required("عنوان دسته بندی الزامی می باشد")
            .min(3, "عنوان دسته بندی نباید کمتر از 3 کاراکتر باشد")
    })

    const defaultValues = {
        name: (isEdit ? currentData.name : "")
    }

    const {control, handleSubmit, formState: {errors}} = useForm({defaultValues, resolver: yupResolver(schema)})

    //functions
    const handleDeleteCategory = async () => {
        console.log("run edit command")
        try {
            const data = await handleDeleteAPI(`/category/${currentData._id}`)
            if (data?.success) navigation("/category")
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
        formData.append("name", newCategory.name)
        if (file) {
            formData.append("image", file)
        }
        try {
            setLoading(true)

            if (isEdit) {
                const {data} = await API.put(`/category/${currentData._id}`, formData)
                if (data.success) {
                    toast.success(data.message)
                    setFile(null)
                    setPreview(null)
                    navigation("/category")
                }
            } else {
                const {data} = await API.post("/category", formData)
                if (data.success) {
                    toast.success(data.message)
                    setFile(null)
                    setPreview(null)
                    navigation("/category")
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
                <CardHeader>{isEdit ? "ویرایش" : "ایجاد"} دسته بندی</CardHeader>
                <CardBody>
                    <Row>
                        <Col sm="6" className="mb-1">
                            <Label className="form-label" for="name">
                                نام
                                <span className="text-danger">*</span>
                            </Label>
                            <Controller
                                name="name"
                                control={control}
                                render={({field}) => (
                                    <Input id="name"
                                           placeholder="نام"
                                           invalid={errors.name && true} {...field} />
                                )}
                            />
                            {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
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
                        <Col sm={6} className="mb-1">

                        </Col>
                    </Row>


                </CardBody>
                <CardFooter className="cardFooter">
                    <Link disabled={loading} to="/category" className="btn btn-outline-primary btn-md">لیست دسته
                        بندی
                        ها</Link>

                    <Button disabled={loading} type="submit"
                            className="btn btn-success btn-md mx-2">{isEdit ? "ویرایش" : "ایجاد"} دسته بندی
                    </Button>
                    {isEdit && <Button disabled={loading} onClick={() => handleDeleteCategory()}
                                       className="btn btn-danger btn-md mx-2">حذف دسته بندی
                    </Button>}

                </CardFooter>
            </Form>
        </Card>
    )
}
export default AddEditCategory