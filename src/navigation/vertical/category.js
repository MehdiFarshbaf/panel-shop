// ** Icons Import
import CategoryIcon from '@mui/icons-material/Category'

export default [
    {
        id: 'category',
        title: 'دسته بندی ها',
        key:'category',
        icon: <CategoryIcon size={20}/>,
        badgeText: '2',
        permissions: ['admin'],
        navLink: '/category'
    }
]