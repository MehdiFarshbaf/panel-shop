import {Fragment, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import Loading from "@src/views/ui-elements/Loading/Loading"
import {Card, CardBody, CardHeader} from "reactstrap"
import TableWithButtons from "@src/views/ui-elements/Table/TableWithButtons"
import {getAllRoles} from "@store/feature/rolesSlice"

const RolesList = () => {

    //variables
    const {loading, roles, total} = useSelector(state => state.roles)
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
            name: 'عنوان نقش',
            sortable: true,
            minWidth: '100px',
            sortField: 'name',
            selector: row => row?.name,
            cell: row => (
                <div className='d-flex justify-content-left align-items-center'>
                    <div className='d-flex flex-column'>
                        <Link
                            to={`/roles/${row._id}`}
                            className='user_name text-truncate text-black'
                        >
                            <span className='fw-bolder'>{row?.name || ''} </span>&nbsp;
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
                        <Link to={`/roles/${row._id}`} className="btn btn-warning btn-sm">جزئیات</Link>
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        dispatch(getAllRoles())
    }, [])
    return (
        <Fragment>
            {loading ? <Loading/> : <Card>
                <CardHeader>
                    <h4>لیست نقش ها - تعداد کل نقش ها : {total}</h4>
                    <Link to="/roles/add" className="btn btn-primary">نقش جدید</Link>
                </CardHeader>
                <CardBody>
                    <TableWithButtons columns={columns} data={roles}
                                      emptyMessage="هنوز نقشی ایجاد نشده است."/>
                </CardBody>
            </Card>
            }
        </Fragment>
    )
}
export default RolesList