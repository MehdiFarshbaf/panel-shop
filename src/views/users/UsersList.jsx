import {Fragment, useEffect} from "react"
import {Card, CardBody, CardHeader} from "reactstrap"

import Loading from "@src/views/ui-elements/Loading/Loading"
import {useDispatch, useSelector} from "react-redux"
import {getAllUsers} from "@store/feature/userSlice"
import TableWithButtons from "@src/views/ui-elements/Table/TableWithButtons"
import {Link, useNavigate} from "react-router-dom"


const UsersList = () => {

    const dispatch = useDispatch()
    const {loading, users, total} = useSelector(state => state.users)
    const navigate = useNavigate()

    const columns = [
        {
            sortable: true,
            maxWidth: "40px",
            name: "ردیف",
            sortField: "id",
            cell: (row, index) => <span>{index + 1 || 0}</span>
        },
        {
            name: 'نام کاربر',
            sortable: true,
            minWidth: '100px',
            sortField: 'title',
            selector: row => row?.fullname,
            cell: row => (
                <div className='d-flex justify-content-left align-items-center'>
                    <div className='d-flex flex-column'>
                        <Link
                            to={`/users/${row._id}`}
                            className='user_name text-truncate text-black'
                        >
                            <span className='fw-bolder'>{row?.fullname || ''} </span>&nbsp;
                        </Link>
                    </div>
                </div>
            )
        },
        {
            sortable: true,
            minWidth: "250px",
            name: "ایمیل",
            sortField: "email",
            cell: row => <span>{row?.email && row?.email || ''}</span>

        },
        {
            name: "عملیات",
            allowOverflow: true,
            cell: (row) => {
                return (
                    <div className="col-operation">
                        <button onClick={() => navigate(`/users/${row._id}`)} className="btn btn-warning btn-sm">جزئیات
                        </button>
                        {" "}
                        {/*<button className="btn btn-danger btn-sm ">حذف</button>*/}
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        dispatch(getAllUsers())
    }, [])
    return (
        <Fragment>
            {loading ? <Loading/> : <Card>
                <CardHeader>
                    <h4>لیست کاربران</h4>
                    <h5>تعداد کل کاربران : {total}</h5>
                </CardHeader>
                <CardBody>
                    <TableWithButtons columns={columns} data={users} emptyMessage="هنوز کاربری ثبت نام نکرده است."/>
                </CardBody>
            </Card>}
        </Fragment>
    )
}
export default UsersList