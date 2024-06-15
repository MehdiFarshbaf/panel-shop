import {Fragment, useEffect, useState} from "react"
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
    Row, TabContent,
    TabPane
} from "reactstrap"
import {useNavigate, useParams} from "react-router-dom"
import API from "../../../utility/API"
import {EditorState} from "draft-js"

import ComponentSpinner from "../../../@core/components/spinner/Loading-spinner"
import MyEditor from "../../MyEditor/MyEditor"

const SiteContentAboutsEdit = () => {


    const [titleEn, setTitleEn] = useState("")
    const [titleFa, setTitleFa] = useState("")
    const [active, setActive] = useState("1")
    const [editorStateFa, setEditorStateFa] = useState(EditorState.createEmpty())
    const [editorStateEn, setEditorStateEn] = useState(EditorState.createEmpty())
    const [loading, setLoading] = useState(true)
    const {name} = useParams()
    const navigate = useNavigate()

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }
    const handleGetPageInfo = async () => {
        try {
            setLoading(true)
            const res = await API.get(`/new-pages?name=${name}`)

            const objFa = await res.find(item => item.language === 'fa')
            const objEn = await res.find(item => item.language === 'en')

            await setTitleEn(objEn?.title)
            await setTitleFa(objFa?.title)
            await setEditorStateEn(objEn.content)
            await setEditorStateFa(objFa.content)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }
    const handleUpdate = async () => {
        try {
            const newData = {
                language: active === "1" ? "fa" : "en",
                name,
                content: active === "1" ? editorStateFa : editorStateEn,
                title: active === "1" ? titleFa : titleEn
            }
            setLoading(true)
            const res = await API.post("/new-pages", newData)
            navigate("/site-content/pages/list")
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    useEffect(() => {
        handleGetPageInfo()
    }, [])

    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <h2>ویرایش صفحه ی - {titleFa}</h2>
                </CardHeader>
            </Card>
            {loading ? <ComponentSpinner className='content-loader-table'/> : <Card>
                <CardBody>

                    <Form className="mt-2 pt-50">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    active={active === "1"}
                                    onClick={() => toggle("1")}>
                                    فارسی
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink active={active === "2"} onClick={() => toggle("2")}>
                                    انگلیسی
                                </NavLink>
                            </NavItem>
                        </Nav>

                        <TabContent className="py-50" activeTab={active}>

                            <TabPane tabId="1">
                                <Input type="text" id="farsiText" className="inputEnglish mb-2"
                                       value={titleFa}
                                       onChange={e => setTitleFa(e.target.value)}
                                       placeholder="عنوان"/>
                                <MyEditor editorState={editorStateFa} setEditorState={setEditorStateFa}/>
                            </TabPane>
                            <TabPane tabId="2">
                                <Input type="text" id="farsiText" className="inputEnglish mb-2"
                                       value={titleEn}
                                       onChange={e => setTitleEn(e.target.value)}
                                       placeholder="title"/>
                                <MyEditor editorState={editorStateEn} setEditorState={setEditorStateEn}/>
                            </TabPane>
                        </TabContent>
                        <Col className="mt-2" sm="12">
                            <Button type="submit" className="me-1" disable={loading} onClick={() => handleUpdate()}
                                    color="primary">
                                {loading ? "در حال بارگذاری" : "ویرایش"}

                            </Button>
                            <Button onClick={() => navigate(-1)} disable={loading}
                                    type="reset" color="secondary" outline>
                                لغو
                            </Button>
                        </Col>
                    </Form>
                </CardBody>
            </Card>
            }
        </Fragment>
    )
}

export default SiteContentAboutsEdit
