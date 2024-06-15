// ** React Imports
import { Link } from "react-router-dom"

// ** Custom Components
import Avatar from "@components/avatar"

// ** Store & Actions
// ** Icons Imports
import { FileText , MoreVertical } from "react-feather"

// ** Reactstrap Imports
import { DropdownItem , DropdownMenu , DropdownToggle , UncontrolledDropdown } from "reactstrap"
import moment from "moment-jalaali";

// ** Renders Client Columns


export const columns = [
  {
    sortable  : true,
    width  : "60px",
    name      : "ردیف",
    sortField : "id",
    cell      : (row, index) => <span >{ index+1 || 0 }</span >
  },
  {
    name: 'دلیل',
    sortable: true,
    minWidth: '200px',
    sortField: 'reason',
    selector: row => row.reason,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
          <Link
            // to={`/transaction/edit/${row.id}`}
            className='user_name text-truncate text-body'
          >
            <span className='fw-bolder text-wrap'>{row?.reason} </span>&nbsp;
          </Link>
        </div>
      </div>
    )
  },
  {
    sortable  : true,
    minWidth  : "150px",
    name      : "پیام",
    sortField : "message",
    cell      : row => <span className=' text-wrap '>{  row?.message || ''}</span >
    
  },
  {
    sortable  : true,
    minWidth  : "150px",
    name      : "گزارش دهنده",
    sortField : "reporter",
    cell      : row => <span className=' text-wrap '>{  row?.reporter || ''}</span >
    
  },
  {
    sortable  : true,
    minWidth  : "150px",
    name      : "گزارش شونده" ,
    sortField : "reported",
    cell      : row => <span className=' text-wrap '>{row?.reported || ''}</span >
    
  },
  
]
