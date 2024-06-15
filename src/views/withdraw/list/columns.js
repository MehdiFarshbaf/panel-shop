// ** React Imports
import { Link } from "react-router-dom"

// ** Custom Components
// ** Store & Actions
// ** Icons Imports
// ** Reactstrap Imports
import { MoreVertical } from "react-feather"
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap"
import {  getCurrentId, rejectWithdraw } from "@src/views/withdraw/store"
import { store } from "@store/store"
import { Edit } from "@mui/icons-material"

// ** Renders Client Columns

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
    name: 'کاربر',
    sortable: true,
    minWidth: '200px',
    sortField: 'first_name',
    selector: row => row.first_name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
  
        <div className='d-flex flex-column'>
          <Link
            // to={`/transaction/edit/${row.id}`}
            className='user_name text-truncate text-body'
          >
            <span className='fw-bolder text-wrap'>{row?.user.email} </span>&nbsp;
          </Link>
          <small className='text-truncate text-muted mb-0'>
            <span className='fw-bolder text-wrap'>{row?.user.lastname} </span>&nbsp;
            <span className='fw-bolder text-wrap'>{row?.user.cc_account_name} </span>&nbsp;
          </small>
        </div>
      </div>
    )
  },
  {
    sortable  : true,
    minWidth  : "200px",
    name      : "مقدار پول درخواستی",
    sortField : "amount",
    cell      : row => <span className=' text-wrap '>{  row?.amount || 0}</span >
    
  },  {
    sortable  : true,
    minWidth  : "150px",
    name      : "شماره کارت",
    sortField : "cc_number",
    cell      : row => <span className=' text-wrap '>{ row?.user.cc_number || 0}</span >
    
  }, {
    sortable  : true,
    minWidth  : "200px",
    name      : " موجودی کیف پول",
    sortField : "wallet_amount",
    cell      : row => <span className=' text-wrap '>{ row?.user.wallet_amount || 0}</span >
    
  }, {
    sortable  : true,
    minWidth  : "200px",
    name      : "مقدار مجاز برداشت",
    sortField : "withdrawable_amount",
    cell      : row => <span className=' text-wrap '>{ row?.user.withdrawable_amount || 0}</span >
    
  },
  {
    sortable  : true,
    minWidth  : "150px",
    name      : "نام دارنده کارت ",
    sortField : "cc_account_name",
    cell      : row => <span className=' text-wrap '>{ row?.user.cc_account_name && row?.user.cc_account_name || ''}</span >
    
  },
  {
    sortable  : true,
    minWidth  : "150px",
    name      : "وضعیت",
    sortField : "status",
    cell      : row => <span className=' text-wrap '>{  row?.status === "rejected" ? "رد شده" : row?.status === "pending" ? "در انتظار" : "تایید شده"
    
    }</span >
    
  },
  
  {
    name: 'عملیات',
    minWidth: '100px',
    cell: row => (
      <div className='column-action'>
        {  data?.role.permissions?.find(permission => permission.key.trim() === "WITHDRAWS_UPDATE".trim()) &&
             <UncontrolledDropdown >
               <DropdownToggle tag='div' className='btn btn-sm'>
                 <MoreVertical size={14} className='cursor-pointer' />
               </DropdownToggle>
               <DropdownMenu end>
                 {
              
                      row?.status !== "accepted" && row.withdrawable_amount <= row.wallet_amount ? <DropdownItem
                           tag = "a"
                           href = "/"
                           className = "w-100"
                           onClick = { e => {
                             e.preventDefault()
                             store.dispatch(getCurrentId(row.id))
                           } }
                      >
                        <Edit size = { 14 } className = "me-50" />
                        <span className = "align-middle" >تایید درخواست</span >
                      </DropdownItem > : <DropdownItem>
                             <span className = "align-middle" >مقدار مجاز کافی نمیباشد</span >
                        
                           </DropdownItem>
                           
           
                 }
                 {
                      row?.status !== "rejected" &&
                      <DropdownItem
                           tag = "a"
                           href = "/"
                           className = "w-100"
                           onClick = { e => {
                             e.preventDefault()
                             store.dispatch(rejectWithdraw(row.id))
                           } }
                      >
                        <Edit size = { 14 } className = "me-50" />
                        <span className = "align-middle" >عدم تایید درخواست</span >
                      </DropdownItem >
           
                 }
       
       
               </DropdownMenu>
             </UncontrolledDropdown>
        
        }
       
      </div>
    )
  }
]
