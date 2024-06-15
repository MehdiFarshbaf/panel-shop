// ** React Imports
import { Fragment , useEffect , useState } from "react"

// ** Custom Components

// ** Third Party Components
import classnames from "classnames"
import PerfectScrollbar from "react-perfect-scrollbar"
import { Bell } from "react-feather"
import moment from "moment-jalaali"

// ** Reactstrap Imports
import {
  Badge ,
  Button ,
  DropdownItem ,
  DropdownMenu ,
  DropdownToggle ,
  UncontrolledDropdown
} from "reactstrap"

// ** Avatar Imports
import axios from "axios";
import { Link } from "react-router-dom";

const NotificationDropdown = () => {
  
  
  const [dataSt, setDataSt] = useState(null)
  const [dataStCount, setDataStCount] = useState(null)
  useEffect(() => {
    axios.get(`/admin/contact_us`).then(response => {
      setDataSt(response.data.data)
    })
    axios.get(`/admin/contact_us/count`).then(response => {
      setDataStCount(response.data.data)
    })
  }, [])
  const renderNotificationItems = () => {
    return (
         <PerfectScrollbar
              component='li'
              className='media-list scrollable-container'
              options={{
                wheelPropagation: false
              }}
         >
           {dataSt && dataSt.filter(item => item.is_seen === 0).map((item, index) => {
             return (
                  <a
                       key={index}
                       className='d-flex'
                  >
                    <div
                         className={classnames('list-item d-flex align-items-start')}
                    >
                      {(
                           <Fragment>
                             <div className='list-item-body flex-grow-1'>
                               <p className='media-heading'>
                                 <span className='fw-bolder'>    {item.message}</span>
                               
                               </p>
                               <small className='notification-text'>
                                 <span className='fw-bolder'>   کاربر :  {(item.user.phone_number)} /</span>&nbsp;
                                 &nbsp;
                                 { moment(item.created_at).format("jYYYY-jMM-jDD HH:mm:ss")}
                               
                               </small>
                             
                             </div>
                           </Fragment>
                      ) }
                    </div>
                  </a>
             )
           })}
         </PerfectScrollbar>
    )
  }
  /*eslint-enable */
  
  return (
       <UncontrolledDropdown tag='li' className='dropdown-notification nav-item me-25'>
         <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()}>
           <Bell size={21} />
           {dataStCount !== null && dataStCount !== 0 &&
                <Badge pill color='danger' className='badge-up'>
                  {dataStCount}
                </Badge>
             
           }
         </DropdownToggle>
         <DropdownMenu end tag='ul' className='dropdown-menu-media mt-0'>
           <li className='dropdown-menu-header'>
             <DropdownItem className='d-flex' tag='div' header>
               <h6 className='notification-title mb-0 me-auto'>پیام ها</h6>
               <Badge tag='div' color='light-primary' pill>
                 آخرین پیام های خوانده نشده
               </Badge>
             </DropdownItem>
           </li>
           {renderNotificationItems()}
           <li className='dropdown-menu-footer'>
             <Button color='primary' block
                  tag={Link} to='/notifications/list'>
               خواندن تمامی پیام ها
             </Button>
           </li>
         </DropdownMenu>
       </UncontrolledDropdown>
  )
}

export default NotificationDropdown
