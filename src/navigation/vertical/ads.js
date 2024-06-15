// ** Icons Import
import { Circle } from "react-feather"
import { Outbox } from "@mui/icons-material"

export default [
  {
    header: 'آگهی',
    permissions: ['admin'],
  
  },
  {
    id: 'Ads',
    title: 'آگهی ',
    permissions: ['admin'],
  
    icon: <Outbox size={20} />,
    children: [
      {
        id: 'AdsList',
        title: 'لیست آگهی ها',
        icon: <Circle size={12} />,
        permissions: ['admin'],
        key: "PRODUCTS_LIST",
        navLink: '/ads/list'
      }  ,
  
    ]
  }

 
]
