import {Fragment, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import Loading from "@src/views/ui-elements/Loading/Loading"
import {Card, CardBody, CardHeader} from "reactstrap"
import TableWithButtons from "@src/views/ui-elements/Table/TableWithButtons"
import {getAllAdmins} from "@store/feature/adminSlice"

const AdminsList = () => {

    //variables
    const {loading, admins, total} = useSelector(state => state.admins)
    const dispatch = useDispatch()

    //Table Columns
    const columns = [
        {
            sortable: true,
            maxWidth: "40px",
            name: "ردیف",
            sortField: "id",
            cell: (row, index) => <span>{index + 1 || 0}</span>
        },
        {
            name: 'نام',
            sortable: true,
            minWidth: '100px',
            sortField: 'fullname',
            selector: row => row?.fullname,
            cell: row => (
                <div className='d-flex justify-content-left align-items-center'>
                    <div className='d-flex flex-column'>
                        <Link
                            to={`/admins/${row._id}`}
                            className='user_name text-truncate text-black'
                        >
                            <span className='fw-bolder'>{row?.fullname || ''} </span>&nbsp;
                        </Link>
                    </div>
                </div>
            )
        }, {
            name: 'نقش',
            sortable: true,
            minWidth: '100px',
            sortField: 'fullname',
            selector: row => row?.role?.name,
            cell: row => (
                <div className='d-flex justify-content-left align-items-center'>
                    <div className='d-flex flex-column'>
                        <Link
                            to={`/admins/${row._id}`}
                            className='user_name text-truncate text-black'
                        >
                            <span className='fw-bolder'>{row?.role?.name || ''} </span>&nbsp;
                        </Link>
                    </div>
                </div>
            )
        },
        {
            name: 'ایمیل',
            sortable: true,
            minWidth: '100px',
            sortField: 'email',
            selector: row => row?.email,
            cell: row => (
                <div className='d-flex justify-content-left align-items-center'>
                    <div className='d-flex flex-column'>
                        <Link
                            to={`/admins/${row._id}`}
                            className='user_name text-truncate text-black'
                        >
                            <span className='fw-bolder'>{row?.email || ''} </span>&nbsp;
                        </Link>
                    </div>
                </div>
            )
        },
        {
            name: "عملیات",
            allowOverflow: true,
            cell: (row) => {
                return (
                    <div className="col-operation">
                        <Link to={`/admins/${row._id}`} className="btn btn-warning btn-sm">جزئیات</Link>
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        dispatch(getAllAdmins())
    }, [])
    return (
        <Fragment>
            {loading ? <Loading/> : <Card>
                <CardHeader>
                    <h4>لیست مدیران - تعداد کل مدیران : {total}</h4>
                    <Link to="/admins/add" className="btn btn-primary">مدیر جدید</Link>
                </CardHeader>
                <CardBody>
                    <TableWithButtons columns={columns} data={admins}
                                      emptyMessage="هنوز مدیری ایجاد نشده است."/>
                </CardBody>
            </Card>
            }
        </Fragment>
    )
}
export default AdminsList