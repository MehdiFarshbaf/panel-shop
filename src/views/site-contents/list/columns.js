// ** React Imports
import { Link } from "react-router-dom"

import { FileText , MoreVertical } from "react-feather"

// ** Reactstrap Imports
import { DropdownItem , DropdownMenu , DropdownToggle , UncontrolledDropdown } from "reactstrap"

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
    name: 'عنوان صفحه ',
    sortable: true,
    minWidth: '150px',
    sortField: 'title',
    selector: row => row,
    cell: (row, index) => (
         <div className='d-flex justify-content-left align-items-center'>
           <div className='d-flex flex-column'>
             {/*{*/}
             {/*     data?.role.permissions?.find(permission => permission.key.trim() === "SETTINGS_LIST".trim()) ? <Link*/}
             {/*       to={`/site-content/pages/${row[Object.keys(row)[0]]}/edit`}*/}
             {/*       className='user_name text-truncate text-body'*/}
             {/*  >*/}
             {/*    <span className='fw-bolder'>{  row[Object.keys(row)[0]] || ''}  </span>&nbsp;*/}
             {/*  */}
             {/*  </Link> : <span className='fw-bolder'>{  row[Object.keys(row)[0]] || ''} </span>*/}
             {/*}*/}
             <span className='fw-bolder'>{row.title} </span>
           </div>
         </div>
    )
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
                 data?.role.permissions?.find(permission => permission.key.trim() === "SETTINGS_LIST".trim()) &&
                 <DropdownItem
                      tag={Link}
                      className='w-100'
                      to={`/site-content/pages/${row[Object.keys(row)[0]]}/edit`}>
                   <FileText size={14} className='me-50' />
                   <span className='align-middle'>ویرایش</span>
                 </DropdownItem>
            }
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
