// ** React Imports
import { Link } from "react-router-dom"

// ** Custom Components
// ** Store & Actions
// ** Icons Imports
import { FileText, MoreVertical, Trash } from "react-feather"

// ** Reactstrap Imports
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledTooltip
} from "reactstrap"
import { deleteDiscount , getCurrentData } from "../store"
import { store } from "@store/store"
import Avatar from "@components/avatar"
import moment from "moment-jalaali";
import { numberSeparator } from "@src/utility/formatNumber";

// ** Renders Client Columns

const data = JSON.parse(localStorage.getItem('userData'))

export const columns = [
  {
    sortable  : true,
    width  : "60px",
  
    name      : "ردیف",
    sortField : "id",
    cell      : (row, index) => <span >{ (index + 1) || 0 }</span >
  },
  {
    name: 'کد',
    sortable: true,
    minWidth: '250px',
    sortField: 'code',
    selector: row => row?.code,
    cell: row => (
         <div className='d-flex justify-content-left align-items-center'>
           
           <div className='d-flex flex-column'>
             <Link
                  onClick = { e => {
                    e.preventDefault()
                    store.dispatch(getCurrentData(row.id))
                  } }
                  className='user_name text-truncate text-body'>
               <span className='fw-bolder text-wrap'>{row?.code} </span>&nbsp;
             </Link>
           
           </div>
         </div>
    )
  },
  {
    sortable  : true,
    minWidth  : "250px",
    name      : "حداکثر قیمت",
    sortField : "max_price",
    cell      : (row) => <span className=' text-wrap '>{row?.max_price &&
         numberSeparator(row?.max_price) || 0 }</span >
  },
  {
    sortable  : true,
    minWidth  : "150px",
    name      : "درصد",
    sortField : "percent",
    cell      : (row) => <span >{ row?.percent || 0 }</span >
  },  {
    sortable  : true,
    minWidth  : "200px",
    name      : "نوع",
    sortField : "type",
    cell      : (row) => <span >{ row?.type === 'fori' ? 'فوری' :
         row?.type === 'nardeban' ? 'نردبان' : row?.type === 'renewal' ? 'تمدید' : "ندارد"
      || '' }</span >
  },
  {
    sortable  : true,
    minWidth  : "200px",
    name      : "تاریخ انقضا",
    sortField : "expires_at",
    cell      : row => <span >{ moment(row.expires_at,'YYYY-M-D HH:mm:ss').locale('en').format('jYYYY/jMM/jDD') || 0 }</span >
  
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
                 data?.role.permissions?.find(permission => permission.key.trim() === "DISCOUNTS_UPDATE".trim()) &&
       
                 <DropdownItem
                 tag = "a"
                 href = "/"
                 className = "w-100"
                 onClick = { e => {
                   e.preventDefault()
                   store.dispatch(getCurrentData(row.id))
                 } }
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>ویرایش</span>
            </DropdownItem>
            }
            {
                 data?.role.permissions?.find(permission => permission.key.trim() === "DISCOUNTS_DELETE".trim()) &&
                 <DropdownItem
                      tag = "a"
                      href = "/"
                      className = "w-100"
                      onClick = { e => {
                        e.preventDefault()
                        store.dispatch(deleteDiscount(row.id))
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
