// ** React Imports
import { Link } from "react-router-dom"
import { FileText, MoreVertical, Trash } from "react-feather"

import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledTooltip
} from "reactstrap"
import { deleteForms } from "../store"
import { store } from "@store/store"

// ** Renders Client Columns

export const columns = [
  {
    sortable  : true,
    width  : "60px",
  
    name      : "ردیف",
    sortField : "id",
    cell      : (row, index) => <span >{ (index + 1) || 0 }</span >
  },
  {
    name: 'نام دسته بندی',
    sortable: true,
    minWidth: '250px',
    sortField: 'name',
    selector: row => row?._source?.cat_name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
          <Link
            to={`/forms/edit/${row?._source?.cat_slug}`}
            className='user_name text-truncate text-body'>
            <span className='fw-bolder text-wrap ' >{
              row?._source.cat_name} </span>&nbsp;

          </Link>
        </div>
      </div>
    )
  },
  {
    sortable  : true,
    minWidth  : "200px",
    name      : "دسته بندی",
    sortField : "category",
    cell      : (row) => <span className='text-truncate text-wrap '>{ row?._source?.items?.category || '' }</span >
  },
  {
    sortable  : true,
    minWidth  : "200px",
    name      : "زیردسته",
    sortField : "subCategory",
    cell      : (row) => <span className='text-truncate text-wrap '>{ row?._source?.items?.subCategory || '' }</span >
  },
  {
    sortable  : true,
    minWidth  : "200px",
    name      : " دسته بندی داخلی",
    sortField : "innerCategory",
    cell      : (row) => <span className='text-truncate text-wrap '>{ row?._source?.items?.innerCategory || '' }</span >
  },
  {
    sortable  : true,
    minWidth  : "200px",
    name      : "عنوان فرم",
    sortField : "title",
    cell: row => (
         <span>
      <UncontrolledTooltip target={`forms-tooltip-${row.id}`} placement="top" autohide={false}>
        {row?._source.items.form.description.title}
      </UncontrolledTooltip>
      <span id={`forms-tooltip-${row.id}`}>
               {row?._source.items.form.description.title?.slice(0, 20)}
      </span>
    </span>
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
            <DropdownItem
              tag={Link}
              className='w-100'
              to={`/forms/edit/${row?._source?.cat_slug}`}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>ویرایش</span>
            </DropdownItem>
            <DropdownItem
                 tag = "a"
                 href = "/"
                 className = "w-100"
                 onClick = { e => {
                   e.preventDefault()
                   store.dispatch(deleteForms(row._id))
                 } }
            >
              <Trash size = { 14 } className = "me-50" />
              <span className = "align-middle" >حذف</span >
            </DropdownItem >

          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
