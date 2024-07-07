import {Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormFeedback, Input, Label, Row} from "reactstrap"
import {Link, useNavigate} from "react-router-dom"
import * as Yup from 'yup'
import {useState} from "react"
import {Controller, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup/dist/yup"
import {handleDeleteAPI, handleShowErrorMessage, showPersianDate} from "@utils"
import API from "@src/utility/API"
import {toast} from "react-toastify"

const AddEditFAQ = ({currentData, isEdit}) => {

    //variable

    const [loading, setLoading] = useState(false)
    const navigation = useNavigate()


    const schema = Yup.object().shape({
        question: Yup.string().required("سوال الزامی است."),
        answer: Yup.string().required("پاسخ الزامی است.")
    })

    const defaultValues = {
        question: (isEdit ? currentData?.question : ""),
        answer: (isEdit ? currentData?.answer : "")
    }

    const {control, handleSubmit, formState: {errors}} = useForm({defaultValues, resolver: yupResolver(schema)})

    //functions
    const handleDeleteCategory = async () => {

        try {
            const data = await handleDeleteAPI(`/faq/${currentData._id}`)
            if (data?.success) navigation("/faqs")
        } catch (err) {
            await handleShowErrorMessage(err)
        }
    }

    const handleEditCreate = async (newCategory) => {
        const formData = new FormData()
        formData.append("question", newCategory.question)
        formData.append("answer", newCategory.answer)

        try {
            setLoading(true)

            if (isEdit) {
                const {data} = await API.put(`/faq/${currentData._id}`, formData)
                if (data.success) {
                    toast.success(data.message)
                    navigation("/faqs")
                }
            } else {
                const {data} = await API.post("/faq", formData)
                if (data.success) {
                    toast.success(data.message)
                    navigation("/faqs")
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
                <CardHeader>{isEdit ? "ویرایش" : "ایجاد"}سوال متداول</CardHeader>
                <CardBody>
                    {isEdit && <Row>
                        <p className="rtl mt-2">تاریخ ایجاد
                            : {showPersianDate(currentData.createdAt)}</p>
                        <p className="rtl mt-2">تاریخ آخرین به روز رسانی
                            : {showPersianDate(currentData.updatedAt)}</p>
                    </Row>}
                    <Row>
                        <Col sm="6" className="mb-1">
                            <Label className="form-label" for="question">
                                سوال
                                <span className="text-danger">*</span>
                            </Label>
                            <Controller
                                name="question"
                                control={control}
                                render={({field}) => (
                                    <Input id="question"
                                           type="textarea"
                                           placeholder="سوال"
                                           invalid={errors.question && true} {...field} />
                                )}
                            />
                            {errors.question && <FormFeedback>{errors.question.message}</FormFeedback>}
                        </Col>
                        <Col sm={6} className="mb-1">
                            <Label className="form-label" for="answer">
                                پاسخ
                                <span className="text-danger">*</span>
                            </Label>
                            <Controller
                                name="answer"
                                control={control}
                                render={({field}) => (
                                    <Input id="answer"
                                           type="textarea"
                                           placeholder="پاسخ"
                                           invalid={errors.answer && true} {...field} />
                                )}
                            />
                            {errors.answer && <FormFeedback>{errors.answer.message}</FormFeedback>}
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter className="cardFooter">
                    <Link disabled={loading} to="/faqs" className="btn btn-outline-primary btn-md">لیست سوالات
                        متداول</Link>

                    <Button disabled={loading} type="submit"
                            className="btn btn-success btn-md mx-2">{isEdit ? "ویرایش" : "ایجاد"} سوال متداول
                    </Button>
                    {isEdit && <Button disabled={loading} onClick={() => handleDeleteCategory()}
                                       className="btn btn-danger btn-md mx-2">حذف سوال متداول
                    </Button>}

                </CardFooter>
            </Form>
        </Card>
    )
}
export default AddEditFAQ