// ** React Imports
import { Link } from 'react-router-dom'
import { useEffect, Fragment, useState } from 'react'

// ** Third Party Components
import InputNumber from 'rc-input-number'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ShoppingCart, X, Plus, Minus } from 'react-feather'

// ** Reactstrap Imports
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem, Badge, Button } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'


// ** Styles
import '@styles/react/libs/input-number/input-number.scss'

const CartDropdown = () => {
  // ** State
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // ** ComponentDidMount
  useEffect(() => {

  }, [])

  // ** Function to toggle Dropdown
  const toggle = () => setDropdownOpen(prevState => !prevState)



  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} tag='li' className='dropdown-cart nav-item me-25'>
    </Dropdown>
  )
}

export default CartDropdown
