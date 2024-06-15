// ** Icons Import
import GroupIcon from '@mui/icons-material/Group'

export default [
    {
        id: 'user',
        title: 'کاربران',
        icon: <GroupIcon size={20}/>,
        badgeText: '2',
        permissions: ['admin'],
        navLink: '/users'
    }
]

