import {Fragment, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import Loading from "@src/views/ui-elements/Loading/Loading"
import {Card, CardBody, CardHeader} from "reactstrap"
import TableWithButtons from "@src/views/ui-elements/Table/TableWithButtons"
import {getAllProducts} from "@store/feature/ProductSlice"

const ProductList = () => {

    //variables
    const {loading, products, total} = useSelector(state => state.products)
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
            name: 'نام محصول',
            sortable: true,
            minWidth: '100px',
            sortField: 'title',
            selector: row => row?.title,
            cell: row => (
                <div className='d-flex justify-content-left align-items-center'>
                    <div className='d-flex flex-column'>
                        <Link
                            to={`/products/${row._id}`}
                            className='user_name text-truncate text-black'
                        >
                            <span className='fw-bolder'>{row?.title || ''} </span>&nbsp;
                        </Link>
                    </div>
                </div>
            )
        }, {
            name: 'توضیحات کوتاه',
            sortable: true,
            minWidth: '100px',
            sortField: 'title',
            selector: row => row?.shortDescription,
            cell: row => (
                <div className='d-flex justify-content-left align-items-center'>
                    <div className='d-flex flex-column'>
                        <Link
                            to={`/products/${row._id}`}
                            className='user_name text-truncate text-black'
                        >
                            <span className='fw-bolder'>{row?.shortDescription || ''} </span>&nbsp;
                        </Link>
                    </div>
                </div>
            )
        }, {
            name: 'دسته بندی',
            sortable: true,
            minWidth: '100px',
            sortField: 'title',
            selector: row => row?.category.name
        },
        {
            name: "عملیات",
            allowOverflow: true,
            cell: (row) => {
                return (
                    <div className="col-operation">
                        <Link to={`/products/${row._id}`} className="btn btn-warning btn-sm">جزئیات</Link>
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])
    return (
        <Fragment>
            {loading ? <Loading/> : <Card>
                <CardHeader>
                    <h4>لیست محصولات - تعداد کل محصولات : {total}</h4>
                    <Link to="/products/add" className="btn btn-primary">محصول جدید جدید</Link>
                </CardHeader>
                <CardBody>
                    <TableWithButtons columns={columns} data={products}
                                      emptyMessage="هنوز محصولی ایجاد نشده است."/>
                </CardBody>
            </Card>
            }
        </Fragment>
    )
}
export default ProductList