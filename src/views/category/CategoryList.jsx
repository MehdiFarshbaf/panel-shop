import {Fragment, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getAllCategories} from "@store/feature/categorySlice"
import Loading from "@src/views/ui-elements/Loading/Loading"
import {Card, CardBody, CardHeader} from "reactstrap"
import {Link} from "react-router-dom"
import TableWithButtons from "@src/views/ui-elements/Table/TableWithButtons";

const CategoryList = () => {

    //variables
    const {loading, categories, total} = useSelector(state => state.categories)
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
            name: 'نام دسته بندی',
            sortable: true,
            minWidth: '100px',
            sortField: 'title',
            selector: row => row?.fullname,
            cell: row => (
                <div className='d-flex justify-content-left align-items-center'>
                    <div className='d-flex flex-column'>
                        <Link
                            to={`/category/${row._id}`}
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
                        <Link to={`/category/${row._id}`} className="btn btn-warning btn-sm">جزئیات</Link>
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        dispatch(getAllCategories())
    }, [])

    return (
        <Fragment>
            {loading ? <Loading/> : <Card>
                <CardHeader>
                    <h4>لیست دسته بندی ها - تعداد کل دسته بندی ها : {total}</h4>
                    <Link to="/category/add" className="btn btn-primary">اضافه کردن دسته بندی</Link>
                </CardHeader>
                <CardBody>
                    <TableWithButtons columns={columns} data={categories}
                                      emptyMessage="هنوز دسته بندی ای ایجاد نشده است."/>
                </CardBody>
            </Card>
            }
        </Fragment>
    )
}
export default CategoryList