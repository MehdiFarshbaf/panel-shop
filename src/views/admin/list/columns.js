// ** React Imports
import { Link } from "react-router-dom"

// ** Custom Components

// ** Store & Actions
// ** Icons Imports
import { FileText , MoreVertical , Trash } from "react-feather"

// ** Reactstrap Imports
import { DropdownItem , DropdownMenu , DropdownToggle , UncontrolledDropdown } from "reactstrap"
import { deleteAdmin } from "../store";

import moment from "moment-jalaali";
import { store } from "@store/store";

const data = JSON.parse(localStorage.getItem('userData'))

export const columns = [
  
  {
    name: 'ایمیل',
    sortable: true,
    minWidth: '300px',
    sortField: 'email',
    selector: row => row.email,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
          <Link
            to={`/admin/edit/${row.id}`}
            className='user_name text-truncate text-body'
          >
            <span className='fw-bolder text-wrap'>{row.email} </span>&nbsp;
          </Link>
         
        </div>
      </div>
    )
  },
  {
    sortable  : true,
    minWidth  : "150px",
    name      : "نام",
    sortField : "fullname",
    cell      : row => <span className=' text-wrap '>{ row.fullname && row.fullname || ''}</span >
    
  },  {
    sortable  : true,
    minWidth  : "150px",
    name      : "نقش",
    sortField : "role",
    cell      : row => <span className=' text-wrap '>{ row.role?.title || ''}</span >
    
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
            {
                 data?.role.permissions?.find(permission => permission.key.trim() === "ADMINS_UPDATE".trim()) &&
                 <DropdownItem
                      tag={Link}
                      className='w-100'
                      to={`/admin/edit/${row.id}`}
                 >
                   <FileText size={14} className='me-50' />
                   <span className='align-middle'>ویرایش</span>
                 </DropdownItem>
  
            }
            {
                 data?.role.permissions?.find(permission => permission.key.trim() === "ADMINS_DELETE".trim()) &&
                 <DropdownItem
                      tag = "a"
                      href = "/"
                      className = "w-100"
                      onClick = { e => {
                        e.preventDefault()
                        store.dispatch(deleteAdmin(row.id))
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
