import {Fragment, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getAllPosts} from "@store/feature/postSlice"
import {Link} from "react-router-dom"
import Loading from "@src/views/ui-elements/Loading/Loading"
import {Card, CardBody, CardHeader} from "reactstrap"
import TableWithButtons from "@src/views/ui-elements/Table/TableWithButtons"

const PostsList = () => {

    //variables
    const {loading, posts, total} = useSelector(state => state.posts)
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
            name: 'عنوان پست',
            sortable: true,
            minWidth: '100px',
            sortField: 'title',
            selector: row => row?.title,
            cell: row => (
                <div className='d-flex justify-content-left align-items-center'>
                    <div className='d-flex flex-column'>
                        <Link
                            to={`/posts/${row._id}`}
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
                            to={`/posts/${row._id}`}
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
            selector: row => row?.category.name,
        },
        {
            name: "عملیات",
            allowOverflow: true,
            cell: (row) => {
                return (
                    <div className="col-operation">
                        <Link to={`/posts/${row._id}`} className="btn btn-warning btn-sm">جزئیات</Link>
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        dispatch(getAllPosts())
    }, [])
    return (
        <Fragment>
            {loading ? <Loading/> : <Card>
                <CardHeader>
                    <h4>لیست پست ها - تعداد کل پست ها : {total}</h4>
                    <Link to="/posts/add" className="btn btn-primary">پست جدید</Link>
                </CardHeader>
                <CardBody>
                    <TableWithButtons columns={columns} data={posts}
                                      emptyMessage="هنوز پستی ایجاد نشده است."/>
                </CardBody>
            </Card>
            }
        </Fragment>
    )
}
export default PostsList