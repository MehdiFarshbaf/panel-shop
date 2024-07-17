// ** Icons Import
import AnnouncementIcon from '@mui/icons-material/Announcement'

export default [
    {
        id: 'blogs',
        key:'posts',
        title: 'پست ها',
        icon: <AnnouncementIcon size={20}/>,
        badgeText: '2',
        permissions: ['admin'],
        navLink: '/posts'
    }
]