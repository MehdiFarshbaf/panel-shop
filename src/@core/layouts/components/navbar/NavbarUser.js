// ** Dropdowns Imports
import UserDropdown from "./UserDropdown"

// ** Third Party Components
import { Moon , Sun } from "react-feather"

// ** Reactstrap Imports
import { NavItem , NavLink } from "reactstrap"

import NotificationDropdown from "@layouts/components/navbar/NotificationDropdown";
import IntlDropdown from "@layouts/components/navbar/IntlDropdown";

const NavbarUser = props => {
  // ** Props
  const { skin, setSkin } = props

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }
   
   const data = JSON.parse(localStorage.getItem('userData'))
  
  return (
    <ul className='nav navbar-nav align-items-center ms-auto'>
      {/*<IntlDropdown />*/}
      <NavItem className=' d-lg-block'>
        <NavLink className='nav-link-style'>
          <ThemeToggler />
        </NavLink>
      </NavItem>
      {/*<NavbarSearch />*/}
      {/*<CartDropdown />*/}
       {
            data?.role?.permissions?.find(permission => permission.key.trim() === "CONTACTUS_MESSAGES_LIST".trim()) &&
            <NotificationDropdown />
          
       }
      <UserDropdown />
    </ul>
  )
}
export default NavbarUser
