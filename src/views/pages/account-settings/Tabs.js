// ** Reactstrap Imports
import {Nav, NavItem, NavLink} from 'reactstrap'

// ** Icons Imports
import {User, Lock, Bookmark, Link, Bell} from 'react-feather'

const Tabs = ({activeTab, toggleTab}) => {
    return (
        <Nav pills className='mb-2'>
            <NavItem>
                <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')}>
                    <User size={18} className='me-50'/>
                    <span className='fw-bold'>پروفایل</span>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
                    <Lock size={18} className='me-50' />
                    <span className='fw-bold'>امنیت</span>
                </NavLink>
            </NavItem>
        </Nav>
    )
}

export default Tabs
