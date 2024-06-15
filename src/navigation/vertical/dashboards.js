// ** Icons Import
import {Dashboard} from "@mui/icons-material"

export default [
    {
        id: 'dashboards',
        title: 'داشبورد',
        icon: <Dashboard size={20}/>,
        // badge: 'light-warning',
        badgeText: '2',
        permissions: ['admin'],
        navLink: '/dashboard'
    }
]
