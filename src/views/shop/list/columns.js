// ** React Imports
import { Link } from "react-router-dom"

// ** Custom Components
import Avatar from "@components/avatar"

// ** Store & Actions
// ** Icons Imports
import { Activity, FileText, MoreVertical, Trash } from "react-feather"

// ** Reactstrap Imports
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap"
import { changeShop , deleteShop } from "../store"

import moment from "moment-jalaali"
import { store } from "@store/store"
import { ChangeCircle } from "@mui/icons-material";

// ** Renders Client Columns
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
        states   = ["light-success", "light-danger", "light-warning", "light-info", "light-primary", "light-secondary"],
        color    = states[stateNum]
  
  if (row.personal_photo && row.personal_photo.length) {
    return <Avatar className = "me-50" img = { row.personal_photo } width = "32" height = "32" />
  } else {
    return <Avatar color = { color } className = "me-50" content = { row.name || "" } initials />
  }
}

const data = JSON.parse(localStorage.getItem('userData'))

export const columns = [
  {
    sortable  : true,
    width  : "60px",

    name      : "ردیف",
    sortField : "id",
    cell      : (row, index) => <span >{ index + 1 || 0 }</span >
  },
  {
    name: 'عنوان',
    sortable: true,
    minWidth: '200px',
    sortField: 'title',
    selector: row => row.title,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        { renderClient(row) }
  
        <div className='d-flex flex-column'>
          <Link
            to={`/shop/edit/${row.id}`}
            className='user_name text-truncate text-body'
          >
            <span className='fw-bolder text-wrap'>{row?.title} </span>&nbsp;
          </Link>
          <small className='text-truncate text-muted mb-0'>
            <span className='fw-bolder text-wrap'>{row?.last_name} </span>&nbsp;
          </small>
        </div>
      </div>
    )
  },
  {
    sortable  : true,
    minWidth  : "150px",
    name      : "تلفن",
    sortField : "telephone",
    cell      : row => <span className=' text-wrap '>{  row?.telephone || 0}</span >
    
  },
  {
    sortable  : true,
    minWidth  : "250px",
    name      : "آدرس",
    sortField : "address",
    cell      : row => <span className=' text-wrap '>{  row?.address || ''}</span >
    
  },
  {
    sortable  : true,
    minWidth  : "150px",
    name      : "دسته بندی",
    sortField : "category",
    cell      : row => <span className=' text-wrap '>{  row?.category || ''}</span >
    
  },
  {
    sortable  : true,
    minWidth  : "150px",
    name      : "وضعیت",
    sortField : "status",
    cell      : row => <span className=' text-wrap '>{  row?.status === 0 ? "غیرفعال" : "فعال"}</span >
    
  },
  {
    sortable  : true,
    minWidth  : "150px",
    name      : "تاریخ ساخت",
    sortField : "created_at",
    cell      : row => <span >{row?.created_at && moment(row?.created_at).format("jYYYY-jMM-jDD")
         || ''}</span >
    
  },
  
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
            {
                 data?.role.permissions?.find(permission => permission.key.trim() === "BUSINESSES_UPDATE".trim()) &&
                 <DropdownItem
                      tag = "a"
                      href = "/"
                      className = "w-100"
                      onClick = { e => {
                        e.preventDefault()
                        store.dispatch(changeShop(row.id))
                      } }
                 >
                   <ChangeCircle size = { 14 } className = "me-50" />
                   <span className = "align-middle" >{row?.status === 0 ? "فعال کردن" : "غیر فعال کردن" }</span >
                 </DropdownItem >
            }
          
            {
                 data?.role.permissions?.find(permission => permission.key.trim() === "BUSINESSES_DELETE".trim()) &&
                 <DropdownItem
                      tag = "a"
                      href = "/"
                      className = "w-100"
                      onClick = { e => {
                        e.preventDefault()
                        store.dispatch(deleteShop(row.id))
                      } }
                 >
                   <Trash size = { 14 } className = "me-50" />
                   <span className = "align-middle" >حذف</span >
                 </DropdownItem >
  
            }

          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
