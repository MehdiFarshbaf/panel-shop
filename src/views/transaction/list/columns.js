// ** React Imports
import {Link} from "react-router-dom"
import moment from "moment-jalaali"
import {numberSeparator} from "@src/utility/formatNumber"
import {Badge} from "reactstrap";

const checkStatus = statusCode => {
    switch (statusCode) {
        case 0:
            return "لغو شده"
        case 1:
            return "در حال بررسی"
        case 2:
            return "پذیرفته شده"
    }
}
const checkClass = statusCode => {
    switch (statusCode) {
        case 0:
            return "danger fs-5"
        case 1:
            return "warning fs-5"
        case 2:
            return "success fs-5"
    }
}
export const columns = [
    {
        sortable: true,
        width: "60px",
        name: "ردیف",
        sortField: "id",
        cell: (row, index) => <span>{index + 1 || 0}</span>
    },
    {
        name: 'کاربر',
        sortable: true,
        minWidth: '200px',
        sortField: 'title',
        selector: row => row.title,
        cell: row => (
            <div className='d-flex justify-content-left align-items-center'>

                <div className='d-flex flex-column'>
                    <Link
                        // to={`/transaction/edit/${row.id}`}
                        className='user_name text-truncate text-body'
                    >
                        <span className='fw-bolder text-wrap'>{row?.first_name} </span>&nbsp;
                    </Link>
                    <small className='text-truncate text-muted mb-0'>
                        <span className='fw-bolder text-wrap'>{row?.last_name} </span>&nbsp;
                    </small>
                </div>
            </div>
        )
    },
    {
        sortable: true,
        minWidth: "150px",
        name: "قیمت",
        sortField: "price",
        cell: row => <span className=' text-wrap '>{numberSeparator(row?.price) || 0}</span>

    }, {
        sortable: true,
        minWidth: "150px",
        name: "محصول",
        sortField: "product",
        cell: row => <span className=' text-wrap '>{row?.product || 0}</span>

    },
    /*  {
        sortable  : true,
        minWidth  : "150px",
        name      : "جزئیات فاکتور",
        sortField : "invoice_details",
        cell      : row => <span >{  row?.invoice_details || ''}</span >

      },*/
    // {
    //   sortable  : true,
    //   minWidth  : "150px",
    //   name      : "وضعیت تراکنش",
    //   sortField : "transaction_result",
    //   cell      : row => <span className=' text-wrap '>{  row?.transaction_result === 0 ? "غیرفعال" : "فعال"}</span >
    //
    // },
    {
        sortable: true,
        minWidth: "150px",
        name: "وضعیت",
        sortField: "status",
        // cell: row => <span>{row?.status === 0 ? "غیرفعال" : "فعال"}</span>
        cell: row => <Badge color={checkClass(row?.status)}>{checkStatus(row?.status)}</Badge>

    },
    {
        sortable: true,
        minWidth: "150px",
        name: "تاریخ ساخت",
        sortField: "created_at",
        cell: row => <span>{row?.created_at && moment(row?.created_at).format("jYYYY-jMM-jDD")
            || ''}</span>

    }

    /*
      {
        name: 'عملیات',
        minWidth: '100px',
        cell: row => (
          <div className='column-action'>
            <UncontrolledDropdown >
              <DropdownToggle tag='div' className='btn btn-sm'>
                <MoreVertical size={14} className='cursor-pointer' />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem
                  tag={Link}
                  className='w-100'
                  to={`/shop/edit/${row.id}`}
                >
                  <FileText size={14} className='me-50' />
                  <span className='align-middle'>ویرایش</span>
                </DropdownItem>
    {/!*
                <DropdownItem
                     tag = "a"
                     href = "/"
                     className = "w-100"
                     onClick = { e => {
                       e.preventDefault()
                       store.dispatch(deleteTransaction(row.id))
                     } }
                >
                  <Trash size = { 14 } className = "me-50" />
                  <span className = "align-middle" >حذف</span >
                </DropdownItem >
    *!/}

              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        )
      }
    */
]
