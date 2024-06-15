// ** React Imports
import { Link } from "react-router-dom"

// ** Custom Components
import Avatar from "@components/avatar"

// ** Store & Actions
// ** Icons Imports

// ** Reactstrap Imports
import moment from "moment-jalaali"
import { UncontrolledTooltip } from "reactstrap"

// ** Renders Client Columns
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
        states   = ["light-success", "light-danger", "light-warning", "light-info", "light-primary", "light-secondary"],
        color    = states[stateNum]
  
  if (row.store_file && row.store_file.length) {
    return  <a className='file-name mb-0' href={row.store_file}>
    <Avatar className = "me-50" img = { row.store_file } width = "32" height = "32" />
    </a>
  } else {
    return <Avatar color = { color } className = "me-50" content = { row.product_title || "" } initials />
  }
}


export const columns = [
  {
    sortable  : true,
    width  : "60px",
    name      : "ردیف",
    sortField : "id",
    cell      : (row, index) => <span >{ index + 1 || 0 }</span >
  },
  {
    name: 'عنوان محصول',
    sortable: true,
    minWidth: '250px',
    sortField: 'product_title',
    selector: row => row.product_title,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        { renderClient(row) }
  
        <div className='d-flex flex-column'>
          <Link
            // to={`/transaction/edit/${row.id}`}
            className='user_name text-truncate text-body'
          >
            <p className={`fw-bolder`}>
              <UncontrolledTooltip target={`product_title-${row.id}`} placement="top" autohide={false}>
                <span >{row?.product_title}</span>
              </UncontrolledTooltip>
              <span id={`product_title-${row.id}`}>
             <span>{row?.product_title.length >= 20  ?  `${row?.product_title.slice(0, 20)  }...` : row?.product_title.slice(0, 30)}</span>
      </span>
            </p>
          </Link>
        </div>
      </div>
    )
  },
  {
    sortable  : true,
    minWidth  : "150px",
    name      : "تبلیغ کننده",
    sortField : "advertiser",
    cell      : row => <span >{  row?.advertiser || ''}</span >
    
  },
  {
    sortable  : true,
    minWidth  : "150px",
    name      : "کاربر",
    sortField : "user",
    cell      : row => <span >{  row?.user || ''}</span >
    
  },    {
    sortable  : true,
    minWidth  : "200px",
    name      : "متن",
    sortField : "text",
    cell      : row => (
         <p>
      <UncontrolledTooltip target={`text-${row.id}`} placement="top" autohide={false}>
             <span >{row?.text}</span>
      </UncontrolledTooltip>
      <span id={`text-${row.id}`}>
             <span>{row.text && row?.text?.length >= 20  ?  `${row?.text?.slice(0, 20)  }...` : row?.text?.slice(0, 30)}</span>
      </span>
    </p>
    )
    
  },
  
  {
    sortable  : true,
    minWidth  : "150px",
    name      : "فرستنده",
    sortField : "sender",
    cell      : row => <span >{  row?.sender === "user" ? "کاربر" : "تبلیغ کننده"}</span >
    
  },
  {
    sortable  : true,
    minWidth  : "150px",
    name      : "تاریخ ساخت",
    sortField : "created_at",
    cell      : row => <span >{row?.created_at && moment(row?.created_at).format("jYYYY-jMM-jDD") }</span >
    
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
