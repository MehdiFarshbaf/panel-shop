// ** React Imports
// ** Custom Components
import Avatar from "@components/avatar"

// ** Store & Actions
import moment from "moment-jalaali"
import { UncontrolledTooltip } from "reactstrap"


export const columns = [
     {
          name      : "نام",
          sortable  : true,
          minWidth  : "200px",
          sortField : "name",
          cell : row => {
               return (
                    <div className = "d-flex justify-content-left align-items-center" >
                         {/*{ renderClient(row) }*/}
                         <div className = "d-flex flex-column" >
                              <h6 className = "user-name text-truncate mb-0" >{ row.name }</h6 >
                              <small className = "text-truncate text-muted mb-0" >{ row.lastname }</small >
                         </div >
                    </div >
               )
          }
     },
   {
      sortable  : true,
      minWidth  : "200px",
      name      : "ایمیل",
      sortField : "email",
      cell      : row => <span >{ row.email || '' }</span >
   },
   {
          sortable  : true,
          minWidth  : "200px",
          name      : "عنوان",
          sortField : "title",
          cell      : row => <span >{ row.title || '' }</span >
     },        {
          sortable  : true,
          minWidth  : "200px",
          name      : "موضوع",
          sortField : "subject",
          cell      : row => <span >{ row.subject || '' }</span >
     }, {
          sortable  : true,
          minWidth  : "200px",
          name      : "نوع",
          sortField : "type",
          cell      : row => <span >{ row.type || '' }</span >
     },
   {
          sortable  : true,
          minWidth  : "200px",
          name      : "متن",
          sortField : "message",
          cell      : row => (
               <span>
      <UncontrolledTooltip target={`message-${row.id}`} placement="top" autohide={false}>

             <span >{row?.message}</span>
        
      </UncontrolledTooltip>
      <span id={`message-${row.id}`}>
             <span>{row?.message.length >= 20  ?  `${row?.message.slice(0, 20)  }...` : row?.message.slice(0, 30)}</span>
      </span>
    </span>
          )
   
     },
      {
          sortable  : true,
          minWidth  : "100px",
          name      : "تاریخ ساخت ",
          sortField : "created_at",
          cell      : row => <span >{ moment(row.created_at, 'YYYY-M-D HH:mm:ss').locale('en').format('jYYYY/jMM/jDD') || 0 }</span >
     }
]
