// ** React Imports
import { Link } from "react-router-dom"

import { FileText, MoreVertical, Trash } from "react-feather"
import { Done, Close} from "@mui/icons-material"

import { Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap"
import { confirmAdver, deleteAdver, rejectAdver } from "../store"
import { store } from "@store/store"
import Avatar from "@components/avatar"
import { numberSeparator } from "@src/utility/formatNumber"

// ** Renders Client Columns
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
        states   = ["light-success", "light-danger", "light-warning", "light-info", "light-primary", "light-secondary"],
        color    = states[stateNum]
  
  if (row.object?.mains?.images && row.object?.mains?.images.length) {
    return <Avatar className = "me-50" img = { row.object?.mains?.images[0] } width = "32" height = "32" />
  } else {
    return <Avatar color = { color } className = "me-50" content = { row.object?.mains?.images[0] || "" } initials />
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
    name: 'نام دسته بندی',
    sortable: true,
    minWidth: '300px',
    sortField: 'name',
    selector: row => row?._source?.cat_name,
    cell: row => (
         <div className='d-flex justify-content-left align-items-center'>
           { renderClient(row?._source) }
           
           <div className='d-flex flex-column'>
             <Link
                  to={`/ads/edit/${row?._source?.object?.slug}/${row?._id}`}
                  className='user_name text-truncate text-body'
             >
               <span className='fw-bolder text-wrap'>{row?._source?.cat_name} </span>&nbsp;
             </Link>
           
           </div>
         </div>
    )
  },
  {
    sortable  : true,
    minWidth  : "200px",
    name      : "عنوان",
    sortField : "title",
    cell      : (row) => <span className=' text-truncate'>{ row?._source?.object?.mains?.title || '' }</span >
  },

/*  {
    sortable  : true,
    minWidth  : "200px",
    name      : "توضیحات",
    sortField : "description",
    cell      : (row) => <spa className='  text-truncate'>{
      row?._source?.object?.mains?.description.slice(0,100) || '' }</spa >
  },*/
  {
    sortable  : true,
    minWidth  : "150px",
    name      : "شماره همراه",
    sortField : "mobile",
    cell      : (row) => <span className=' text-truncate'>{ row?._source?.object?.mains?.mobile || '' }</span >
  },  {
    sortable  : true,
    minWidth  : "150px",
    name      : "وضعیت",
    sortField : "status",
    cell      : (row) => <span className=' text-truncate'>{
      row?._source?.object?.status === "accepted" ? <Badge color = "light-success" pill >
             تایید شده
           </Badge > : row?._source?.object?.status === "blocked" ? <Badge color = "light-danger" pill >
        بلاک شده
      </Badge > : row?._source?.object?.status === "rejected" ? <Badge color = "light-warning" pill >
                       رد شده
                     </Badge > : row?._source?.object?.status === "pending" &&
                          <Badge color = "light-primary" pill >
                            در انتظار
                          </Badge >
                          
                          || '' }</span >
  },
  {
    sortable  : true,
    minWidth  : "150px",
    name      : "قیمت",
    sortField : "price",
    cell      : (row) => <span className=' text-truncate'>{row?._source?.object?.mains
         .price ? (typeof row?._source?.object?.mains
              .price === "string") ? parseInt(numberSeparator(row?._source?.object?.mains
              .price)) === 0 ? "توافقی" : parseInt(numberSeparator(row?._source?.object?.mains
              .price))  : numberSeparator(row?._source?.object?.price) === 0  ? "توافقی" :
         numberSeparator(row?._source?.object?.price) : "توافقی" }</span >
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
                    to={`/ads/edit/${row?._source?.object?.slug}/${row?._id}`}
               >
                 <FileText size={14} className='me-50' />
                 <span className='align-middle'>ویرایش</span>
               </DropdownItem>
               {
                    data?.role.permissions?.find(permission => permission.key.trim() === "PRODUCTS_UPDATE".trim()) &&
                    row?._source?.object?.status === "accepted" &&
                    <DropdownItem
                         tag = "a"
                         href = "/"
                         className = "w-100"
                         onClick = { e => {
                           e.preventDefault()
                           store.dispatch(rejectAdver(row._id))
                         } }
                    >
                      <Close size={14} className='me-50' />
                      <span className='align-middle'>رد کردن آگهی</span>
                    </DropdownItem>
               }   {
                    data?.role.permissions?.find(permission => permission.key.trim() === "PRODUCTS_UPDATE".trim()) &&
                    row?._source?.object?.status === "rejected"  &&
                    <DropdownItem
                         tag = "a"
                         href = "/"
                         className = "w-100"
                         onClick = { e => {
                           e.preventDefault()
                           store.dispatch(confirmAdver(row._id))
                         } }
                    >
                      <Done size={14} className='me-50' />
                      <span className='align-middle'>تایید کردن آگهی</span>
                    </DropdownItem>
               }
               {
                    data?.role.permissions?.find(permission => permission.key.trim() === "PRODUCTS_UPDATE".trim()) &&
                    row?._source?.object?.status === "pending" &&
                    <DropdownItem
                         tag = "a"
                         href = "/"
                         className = "w-100"
                         onClick = { e => {
                           e.preventDefault()
                           store.dispatch(confirmAdver(row._id))
                         } }
                    >
                      <Done size={14} className='me-50' />
                      <span className='align-middle'>تایید کردن آگهی</span>
                    </DropdownItem>
               }
               {
                 
                 data?.role.permissions?.find(permission => permission.key.trim() === "PRODUCTS_DELETE".trim()) &&
                    <DropdownItem
                         tag = "a"
                         href = "/"
                         className = "w-100"
                         onClick = { e => {
                           e.preventDefault()
                           store.dispatch(deleteAdver(row._id))
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
