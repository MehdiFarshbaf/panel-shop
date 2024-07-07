import {useDispatch, useSelector} from "react-redux"
import {Fragment, useEffect} from "react"
import {getAllFAQ} from "@store/feature/faqSlice"
import {Link} from "react-router-dom"
import Loading from "@src/views/ui-elements/Loading/Loading"
import {Card, CardBody, CardHeader} from "reactstrap"
import TableWithButtons from "@src/views/ui-elements/Table/TableWithButtons"

const FAQList = () => {

    //variables
    const {loading, faqs, total} = useSelector(state => state.faqs)
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
            name: 'سوال متداول',
            sortable: true,
            minWidth: '200px',
            sortField: 'title',
            selector: row => row?.question,
            cell: row => (
                <div className='d-flex justify-content-left align-items-center'>
                    <div className='d-flex flex-column'>
                        <Link
                            to={`/faqs/${row._id}`}
                            className='user_name text-truncate text-black'
                        >
                            <span className='fw-bolder'>{row?.question || ''} </span>&nbsp;
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
                        <Link to={`/faqs/${row._id}`} className="btn btn-warning btn-sm">جزئیات</Link>
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        dispatch(getAllFAQ())
    }, [])

    return (
        <Fragment>
            {loading ? <Loading/> : <Card>
                <CardHeader>
                    <h4>لیست سوالات متداول - تعداد کل سوالات متداول : {total}</h4>
                    <Link to="/faqs/add" className="btn btn-primary">افزودن سوالات متداول</Link>
                </CardHeader>
                <CardBody>
                    <TableWithButtons columns={columns} data={faqs}
                                      emptyMessage="هنوز سوال متداولی ایجاد نشده است."/>
                </CardBody>
            </Card>
            }
        </Fragment>
    )
}
export default FAQList