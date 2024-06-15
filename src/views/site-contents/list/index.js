// ** User List Component
import Table from "./Table"
import DataTable from "react-data-table-component"
import Swal from "sweetalert2"

// ** Styles
import "@styles/react/apps/app-users.scss"
import {Fragment} from "react"
import API from "../../../utility/API"
import {Link, useNavigate} from "react-router-dom"
import {Button, Card, CardHeader, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap"
import {FileText, MoreVertical, Plus} from "react-feather"
import ComponentSpinner from "../../../@core/components/spinner/Loading-spinner"
import { pagesListFake} from "./fakeDataPages"

const PageList = () => {

    const navigate = useNavigate()

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger mr-2"
        },
        buttonsStyling: false
    })

    const handleDeletePage = async id => {
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

                API.delete(`/new-pages/${id}`)
                    .then(res => {
                        console.log(res)
                        if (res) {
                            handleInitData()
                            swalWithBootstrapButtons.fire(
                                "حذف شد!",
                                "اسلاید مورد نظر حذف شد",
                                "success"
                            )
                        } else {
                            console.log("else")

                            swalWithBootstrapButtons.fire(
                                "خطا!",
                                "عملیات با خطا مواجه شد دوباره امتحان کنید",
                                "error"
                            )
                        }
                    })
                    .catch(() => {
                        console.log("catch")
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
            // sortable: true,
            width: "60px",
            name: "ردیف",
            sortField: "id",
            cell: (row, index) => <span>{(index + 1) || 0}</span>
        },

        {
            name: 'عنوان صفحه ',
            // sortable: true,
            minWidth: '150px',
            sortField: 'title',
            selector: row => row,
            cell: (row) => (
                <div className='d-flex justify-content-left align-items-center'>
                    <div className='d-flex flex-column'>
                        <span className='fw-bolder'>{row.title}</span>&nbsp;
                    </div>
                </div>
            )
        }, {
            name: 'نام صفحه ',
            // sortable: true,
            minWidth: '150px',
            sortField: 'title',
            selector: row => row,
            cell: (row) => (
                <div className='d-flex justify-content-left align-items-center'>
                    <div className='d-flex flex-column'>
                        <span className='fw-bolder'>{row.name}</span>&nbsp;
                    </div>
                </div>
            )
        },
        {
            name: 'عملیات',
            minWidth: '100px',
            cell: row => (
                <div className='column-action'>
                    <Button color={"warning"}
                            onClick={async () => navigate(`/site-content/pages/edit-pages/${row.name}`, {
                                state: {page:row}
                            })}>ویرایش</Button>
                    {/*<Button color={"danger"} style={{margin: "0 6px"}}*/}
                    {/*        onClick={() => handleDeletePage(row.id)}>حذف</Button>*/}
                </div>
            )
        }
    ]

    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <h2>لیست صفحات</h2>
                    {/*<Button*/}
                    {/*    color={"primary"}*/}
                    {/*    outline*/}
                    {/*    className={"create-button"}*/}
                    {/*    onClick={() => navigate("/site-content/pages/create")}><Plus/><p>ایجاد صفحه</p></Button>*/}
                </CardHeader>
            </Card>
            <div className='app-user-list'>
                <DataTable columns={columns} data={pagesListFake}
                           progressComponent={<ComponentSpinner className='content-loader-table'/>}/>
            </div>
        </Fragment>
    )
}

export default PageList
