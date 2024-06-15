// ** React Imports
import { Fragment } from "react"

// ** Third Party Components
import * as Icon from "react-feather"

// ** Custom Component

// ** Reactstrap Imports
import { NavItem , NavLink } from "reactstrap"

// ** Store & Actions

const NavbarBookmarks = props => {
  // ** Props
  const { setMenuVisibility } = props
  return (
       <Fragment>
         <ul className='navbar-nav d-xl-none'>
           <NavItem className='mobile-menu me-auto'>
             <NavLink className='nav-menu-main menu-toggle hidden-xs is-active' onClick={() => setMenuVisibility(true)}>
               <Icon.Menu className='ficon' />
             </NavLink>
           </NavItem>
         </ul>
       
       </Fragment>
  )
}

export default NavbarBookmarks
