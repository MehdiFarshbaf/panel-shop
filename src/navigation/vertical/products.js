// ** Icons Import
import { Shop } from "@mui/icons-material"

export default [
    {
        id: 'products',
        key:'products',
        title: 'محصولات',
        icon: <Shop size={20}/>,
        badgeText: '2',
        permissions: ['admin'],
        navLink: '/products'
    }
]