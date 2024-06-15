import {Fragment, useState} from "react"
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    Input,
    Label,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from "reactstrap"
import {useNavigate} from "react-router-dom"
import {Controller, useForm} from "react-hook-form"
import API from "../../../utility/API"
import MyEditor from "../../MyEditor/MyEditor"
import {EditorState} from "draft-js"
import Select from "react-select"

const CreatePage = () => {

    //variables
    const [loading, setLoading] = useState(false)
    const [active, setActive] = useState("1")
    const [editorStateFa, setEditorStateFa] = useState(EditorState.createEmpty())
    const [editorStateEn, setEditorStateEn] = useState(EditorState.createEmpty())
    const selectNames = [
        {label: "درباره ما", value: "ABOUT"},
        {label: "ارتباط با ما", value: "CONTACT"},
        {label: "قوانین و مقررات", value: "TERMS"},
        {label: "حریم خصوصی", value: "PRIVACY"},
        {label: "هشدار پلیس", value: "POLICE"},
        {label: "راهنمای خرید امن", value: "PURCHASE"},
        {label: "سوالات متداول", value: "FAQ"}
    ]
    const navigate = useNavigate()
    const defaultValues = {
        name: {label: "درباره ما", value: "ABOUT"},
        language: "",
        title: "",
        content: ""
    }
    const {
        control,
        handleSubmit, watch, setValue,
        formState: {errors}
    } = useForm({defaultValues})

    //functions
    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    const onSubmit = async data => {
        setLoading(true)
        const newData = {
            ...data,
            language: active === "1" ? "fa" : "en",
            name: data.name.value,
            content: active === "1" ? editorStateFa : editorStateEn
        }
        const dataInfo = new FormData()
        dataInfo.append(`title`, data.title)
        dataInfo.append(`name`, data.name)
        dataInfo.append(`language`, active === "1" ? "fa" : "en")
        dataInfo.append(`content`, active === "1" ? editorStateFa : editorStateEn)
        const res = await API.post("/new-pages", newData)
        console.log(res)
        navigate("/site-content/pages/list")
    }

    return (
        <Fragment>
            <Card className="invoice-preview-card">
                {/*<CardHeader>*/}
                {/*    <p className="mb-0">در این قسمت میتوانید صفحه مورد نظر خود را ایجاد کنید.</p>*/}
                {/*</CardHeader>*/}
                <CardBody className="invoice-padding pt-0">
                    <Form className="mt-2 pt-50"
                          onSubmit={handleSubmit(onSubmit)}>
                        <Row className="mb-5">
                            <Col sm="6" className="mb-5">
                                <Label className="form-label" for="name">انتخاب صفحه</Label>
                                <Controller
                                    control={control}
                                    name={`name`}
                                    defaultValue={0}
                                    render={({
                                                 field: {
                                                     onChange,
                                                     value,
                                                     ref
                                                 }
                                             }) => (
                                        <Select
                                            inputRef={ref}
                                            className="react-select mb-5"
                                            classNamePrefix="select"
                                            value={value}
                                            onChange={val => {
                                                onChange(val)
                                            }}
                                            options={selectNames}
                                            placeholder=""
                                            noOptionsMessage={() => "پیدا نشد"}
                                            loadingMessage={() => "..."}   //minor
                                        />
                                    )}
                                />
                            </Col>
                        </Row>
                        <Row className='mt-5'>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        active={active === "1"}
                                        onClick={() => toggle("1")}>فارسی</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        active={active === "2"}
                                        onClick={() => {
                                            toggle("2")
                                        }}
                                    >انگلیسی</NavLink>
                                </NavItem>
                            </Nav>
                            <Col sm="6" className="mb-1">
                                <Label className="form-label" for="title">عنوان</Label>
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
                            <TabContent className="py-50" activeTab={active}>
                                <TabPane tabId="1">
                                    <MyEditor editorState={editorStateFa} setEditorState={setEditorStateFa}/>
                                </TabPane>
                                <TabPane tabId="2">
                                    <MyEditor editorState={editorStateEn} setEditorState={setEditorStateEn}/>
                                </TabPane>
                            </TabContent>
                            <Col className="mt-2" sm="12">
                                <Button type="submit" className="me-1"
                                        color="primary">
                                    {loading ? "در حال بارگذاری" : "ذخیره"}

                                </Button>
                                <Button onClick={() => navigate(-1)}
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
export default CreatePage