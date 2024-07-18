import {Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormFeedback, Input, Label, Row} from "reactstrap"
import {Link, useNavigate} from "react-router-dom"
import * as Yup from 'yup'
import { useState} from "react"
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

const AddOrEditRole = ({currentData, isEdit, permissions, selectedPermissions}) => {


    //variable
    const [selected, setSelected] = useState(isEdit ? selectedPermissions : [])
    const [loading, setLoading] = useState(false)
    const navigation = useNavigate()


    const schema = Yup.object().shape({
        name: Yup.string().required("نام نقش الزامی است.")
    })

    const defaultValues = {
        name: (isEdit ? currentData?.name : ""), permissions
    }

    const {control, handleSubmit, formState: {errors}} = useForm({defaultValues, resolver: yupResolver(schema)})

    //functions
    const handleDeleteRole = async () => {

        try {
            const data = await handleDeleteAPI(`/role/${currentData._id}`)
            if (data?.success === true) navigation("/roles")
        } catch (err) {
            await handleShowErrorMessage(err)
        }
    }

    const handleEditCreate = async (newRole) => {
        if (!selected.length > 0) {
            toast.error('لطفا مجوزهای دسترسی برای این نقش انتخاب کنید.')
        } else {
            try {
                setLoading(true)
                const newPermissions = selected.map(permission => ({
                        title: permission.label,
                        key: permission.value
                    })
                )
                if (isEdit) {
                    const {data} = await API.put(`/role/${currentData._id}`, {...newRole, permissions: newPermissions})
                    if (data.success) {
                        toast.success(data.message)
                        navigation("/roles")
                    }
                } else {
                    const {data} = await API.post("/role", {...newRole, permissions: newPermissions})
                    if (data.success) {
                        toast.success(data.message)
                        navigation("/roles")
                    }
                }

            } catch (err) {
                await handleShowErrorMessage(err)
                setLoading(false)
            }
        }

    }

    return (
        <Card>
            <Form className="mt-2 pt-50" onSubmit={handleSubmit(handleEditCreate)}>
                <CardHeader>{isEdit ? "ویرایش" : "ایجاد"} نقش </CardHeader>
                <CardBody>
                    {isEdit && <Row>
                        <p className="rtl mt-2">تاریخ ایجاد
                            : {showPersianDate(currentData.createdAt)}</p>
                        <p className="rtl mt-2">تاریخ آخرین به روز رسانی
                            : {showPersianDate(currentData.updatedAt)}</p>
                    </Row>}
                    <Row>
                        <Col sm="6" className="mb-1">
                            <Label className="form-label" for="name">
                                نام نقش
                                <span className="text-danger">*</span>
                            </Label>
                            <Controller
                                name="name"
                                control={control}
                                render={({field}) => (
                                    <Input id="name"
                                           placeholder="نام نقش"
                                           invalid={errors.name && true} {...field} />
                                )}
                            />
                            {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
                        </Col>
                        <Col sm={6} className="mb-1">
                            <Label className="form-label">مجوزها</Label>
                            <Select
                                options={permissions}
                                value={selected}
                                onChange={setSelected}
                                placeholder="انتخاب مجوزها"
                                isMulti
                                isSearchable
                            />

                        </Col>
                    </Row>
                </CardBody>
                <CardFooter className="cardFooter">
                    <Link disabled={loading} to="/roles" className="btn btn-outline-primary btn-md">لیست نقش ها</Link>

                    <Button disabled={loading} type="submit"
                            className="btn btn-success btn-md mx-2">{isEdit ? "ویرایش" : "ایجاد"} نقش
                    </Button>
                    {isEdit && <Button disabled={loading} onClick={() => handleDeleteRole()}
                                       className="btn btn-danger btn-md mx-2">حذف نقش
                    </Button>}

                </CardFooter>
            </Form>
        </Card>
    )
}
export default AddOrEditRole