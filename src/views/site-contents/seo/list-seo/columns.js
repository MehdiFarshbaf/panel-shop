// ** React Imports
import {Link} from "react-router-dom"

import {FileText, MoreVertical, Trash} from "react-feather"

// ** Reactstrap Imports
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown,
    UncontrolledTooltip
} from "reactstrap"
import moment from "moment-jalaali";
import {store} from "@store/store";
import {deleteSeo} from "@src/views/site-contents/store";

const data = JSON.parse(localStorage.getItem('userData'))

export const columns = [

    {
        sortable: true,
        width: "60px",
        name: "ردیف",
        sortField: "id",
        cell: (row, index) => <span>{index + 1 || 0}</span>
    },
    {
        name: 'عنوان',
        sortable: true,
        minWidth: '300px',
        sortField: 'name',
        selector: row => row?.title,
        cell: row => (
            <div className='d-flex justify-content-left align-items-center'>
                <div className='d-flex flex-column'>
                    <Link
                        to={`/site-content/seo/${row?.id}/edit`}

                        className='user_title text-truncate text-body'
                    >
                        <span className='fw-bolder'>{row?.title || ''} </span>&nbsp;
                    </Link>
                    <small className='text-truncate text-muted mb-0'>
                        <span className='fw-bolder'> {row?.title || 0} </span>&nbsp;
                    </small>
                </div>
            </div>
        )
    },
    {
        sortable: true,
        minWidth: "200px",
        name: "توضیح",
        sortField: "description",
        cell: row => (
            <span>
      <UncontrolledTooltip target={`description-${row.id}`} placement="top" autohide={false}>
             <span>{row?.description}-</span>
  
      </UncontrolledTooltip>
      <span id={`description-${row?.id}`}>
  
             <span>{row.description ?  row?.description?.slice(0, 50) : ""}</span>
       
      </span>
    </span>
        )

    },

    {
        sortable: true,
        minWidth: "150px",
        name: "مدل صفحه",
        sortField: "pageable_type",
        cell: row => <span>{row?.pageable_type || ''}</span>

    }, {
        sortable: true,
        minWidth: "150px",
        name: "زبان",
        sortField: "language",
        cell: row => <span>{row?.language || ''}</span>

    },
    {
        sortable: false,
        minWidth: "150px",
        name: "کشور",
        sortField: "language",
        cell: row => <span>{row.country ?  row?.country : ''}</span>

    },
    {
        sortable: false,
        minWidth: "150px",
        name: "شهر",
        sortField: "language",
        cell: row => <span>{row.city ?  row?.city : ''}</span>

    },
    {
        sortable: true,
        minWidth: "150px",
        name: "نوع",
        sortField: "pageable_type",
        cell: row => <span>{row.pageable_id ?  row?.pageable_id : ''}</span>

    },
    //
    // {
    //   sortable  : true,
    //   minWidth  : "150px",
    //   name      : "تاریخ ساخت",
    //   sortField : "created_at",
    //   cell      : row => <span >{row?.created_at && moment(row?.created_at).format("jYYYY-jMM-jDD")
    //        || ''}</span >
    //
    // },


    {
        name: 'عملیات',
        minWidth: '100px',
        cell: row => (
            <div className='column-action'>
                <UncontrolledDropdown>
                    <DropdownToggle tag='div' className='btn btn-sm'>
                        <MoreVertical size={14} className='cursor-pointer'/>
                    </DropdownToggle>
                    <DropdownMenu end>
                        <DropdownItem
                            tag={Link}
                            className='w-100'
                            to={`/site-content/seo/${row?.id}/edit`}

                        >
                            <FileText size={14} className='me-50'/>
                            <span className='align-middle'>مشاهده جزئیات</span>
                        </DropdownItem>
                        {
                            data?.role.permissions?.find(permission => permission.key.trim() === "SETTINGS_LIST".trim()) &&
                            <DropdownItem
                                tag="a"
                                href="/"
                                className="w-100"
                                onClick={e => {
                                    e.preventDefault()
                                    store.dispatch(deleteSeo(row.id))
                                }}
                            >
                                <Trash size={14} className="me-50"/>
                                <span className="align-middle">حذف</span>
                            </DropdownItem>

                        }


                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        )
    }
]