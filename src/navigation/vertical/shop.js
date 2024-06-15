// ** Icons Import
import { Circle } from "react-feather"
import { Shop , } from "@mui/icons-material"

export default [
  {
    header: 'فروشگاه',
    permissions: ['admin'],
  
  },
  {
    id: 'Shop',
    title: 'فروشگاه',
    permissions: ['admin'],
  
    icon: <Shop size={20} />,
    children: [
      {
        key: "BUSINESSES_LIST",
        id: 'ShopList',
        title: 'لیست فروشگاه',
        icon: <Circle size={12} />,
        permissions: ['admin'],
  
        navLink: '/shop/list'
      }
    ]
  }

 
]
