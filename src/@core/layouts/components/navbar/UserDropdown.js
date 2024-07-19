// ** React Imports
import {Link} from "react-router-dom"
import {useEffect, useState} from "react"

// ** Custom Components
import Avatar from "@components/avatar"

// ** Utils
import {isUserLoggedIn} from "@utils"

// ** Store & Actions
import {useDispatch} from "react-redux"
import {handleLogout} from "@store/authentication"

// ** Third Party Components
import {Power, Settings, User} from "react-feather"

// ** Reactstrap Imports
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap"

// ** Default Avatar Image
import profile from "@src/assets/images/avatars/avatar-blank.png"

const UserDropdown = ({}) => {

    const dispatch = useDispatch()
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        if (isUserLoggedIn() !== null) {
            setUserData(JSON.parse(localStorage.getItem('userData')))
        }
    }, [])


    //** Vars
    return (
        <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
            <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
                <div className='user-nav d-sm-flex d-none'>
                    <span className='user-name fw-bold'>{userData ? userData.fullname : ""}</span>
                    <span className='user-status'>{userData ? userData.email : ""}</span>
                </div>
                <Avatar img={userData?.image !== "" ? userData?.url : profile} imgHeight='40' imgWidth='40'
                        status='online'/>
            </DropdownToggle>
            <DropdownMenu end>
                {
                    <DropdownItem tag={Link} to='/pages/account-settings'>
                        <Settings size={14} className='me-75'/>
                        <span className='align-middle'>تنظیمات</span>
                    </DropdownItem>
                }

                <DropdownItem tag={Link} to='/login' onClick={() => dispatch(handleLogout())}>
                    <Power size={14} className='me-75'/>
                    <span className='align-middle'>خروج</span>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}

export default UserDropdown
