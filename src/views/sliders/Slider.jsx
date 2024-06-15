import {Fragment, useEffect, useState} from "react"
import {Button, Card, CardBody, CardHeader, CardText, Col, Input, Row, Spinner} from "reactstrap"
import axios from "axios"
import DataTable from "react-data-table-component"
import ComponentSpinner from "../../@core/components/spinner/Loading-spinner"
import Swal from "sweetalert2"
import toast from "react-hot-toast"

const Slider = () => {
    const [loading, setLoading] = useState(false)
    const [loadingBanner, setLoadingBanner] = useState(true)
    const [banners, setBanners] = useState([])
    const [file, setFile] = useState([])
    const [preview, setPreview] = useState("")

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success mr-2",
            cancelButton: "btn btn-danger mr-2"
        },
        buttonsStyling: false
    })

    const initData = async () => {
        setLoadingBanner(true)
        try {
            const res = await axios.get("/get_banner")
            if (res.status === 200) {
                await setBanners(res.data)
                setLoadingBanner(false)
                setLoading(false)
            }
            await setLoading(false)
            await setPreview(null)
        } catch (err) {
            console.log(err)
            setLoadingBanner(false)
            setLoading(false)
        }
    }
    const handleDeleteBanner = async id => {
        swalWithBootstrapButtons.fire({
            title: "آیا مطمئن هستید!",
            text: "برای حذف تایید را بزنید",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "تایید",
            cancelButtonText: "لغو",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete(`/banner/${id}`)
                    .then((data) => {
                        if (data) {
                            initData()
                            swalWithBootstrapButtons.fire(
                                "حذف شد!",
                                "اسلاید مورد نظر حذف شد",
                                "success"
                            )
                        } else {
                            swalWithBootstrapButtons.fire(
                                "خطا!",
                                "عملیات با خطا مواجه شد دوباره امتحان کنید",
                                "error"
                            )
                        }
                    })
                    .catch(() => {
                        swalWithBootstrapButtons.fire(
                            "خطا!",
                            "عملیات با خطا مواجه شد دوباره امتحان کنید",
                            "error"
                        )
                    })
            }
        })
    }
    const columns = [
        {
            width: "60px",
            name: "ردیف",
            sortField: "id",
            cell: (row, index) => <span>{(index + 1) || 0}</span>
        },
        {
            name: 'نام فروشگاه',
            minWidth: '150px',
            sortField: 'title',
            selector: row => row,
            cell: (row) => (
                <div className='d-flex justify-content-left align-items-center'>
                    <div className='d-flex flex-column'>
                        <span className='fw-bolder'>{row?.business?.title}</span>&nbsp;
                    </div>
                </div>
            )
        }, {
            name: 'تصویر بنر',
            // sortable: true,
            minWidth: '150px',
            sortField: 'title',
            selector: row => row,
            cell: (row) => (
                <div className='d-flex justify-content-left align-items-center'>
                    <div className='d-flex flex-column'>
                        <img className='fw-bolder imgBanner' src={row.image} alt=""/>
                    </div>
                </div>
            )
        },
        {
            name: 'عملیات',
            minWidth: '100px',
            cell: row => (
                <div className='column-action'>
                    <Button color={"danger"} style={{margin: "0 6px"}}
                            onClick={() => handleDeleteBanner(row.id)}>حذف</Button>
                </div>
            )
        }
    ]

    const handleAddBanner = async () => {
        setLoading(true)
        const formData = new FormData()
        formData.append("store_photo", file)
        try {
            const res = await axios.post("/convertImageToUrl", formData)
            if (res.status === 200) {
                const {url} = res.data
                const result = await axios.post("/banner", {
                    image: url
                })
                toast.success("عملیات موفقیت آمیز بود")
                if (result.status === 201) {
                    setLoading(false)
                    await setPreview(null)
                    await initData()
                    setLoading(false)
                }
            }
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }
    const loadImage = async (e) => {
        const image = e.target.files[0]
        await setFile(image)
        await setPreview(URL.createObjectURL(image))
    }

    useEffect(() => {
        initData()
    }, [])

    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <div className="w-100 mt-0 d-flex justify-content-between">
                        <p className="mt-1 mb-1 ml-1">افزودن بنر</p>
                        <label id='upload'
                               className='btn btn-sm btn-primary d-flex justify-content-center align-items-center'>بارگذاری
                            عکس
                            <Input id='upload' hidden type='file' accept="image/png, image/jpeg"
                                   onChange={e => loadImage(e)}/>
                        </label>
                    </div>
                </CardHeader>
                {preview && <CardBody>
                    <Row className="w-100">
                        <Col md={6} sm={12}>
                            <CardText>برای افزودن بنر روی دکمه ذخیره کلیک کنید.</CardText>
                            <button disabled={loading} className="btn mt-3 btn-success"
                                    onClick={() => handleAddBanner()}>{loading ? <Spinner size="sm"/> : "ذخیره"}
                            </button>
                        </Col>
                        <Col md={6} sm={12}>
                            {preview && <img src={preview} className="img-fluid" alt=""/>}
                        </Col>
                    </Row>
                </CardBody>}
            </Card>
            <Card>
                <CardHeader>
                    <h4>لیست بنر ها</h4>
                </CardHeader>
                <CardBody>
                    <div className='app-user-list'>
                        {loadingBanner ? <ComponentSpinner className='content-loader-table'/> :
                            <DataTable columns={columns} data={banners}
                                       progressComponent={<ComponentSpinner className='content-loader-table'/>}/>}
                    </div>

                </CardBody>
            </Card>
        </Fragment>
    )
}

export default Slider