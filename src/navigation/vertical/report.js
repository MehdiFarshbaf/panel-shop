// ** Icons Import
import { Circle } from "react-feather"
import { ErrorOutline } from "@mui/icons-material"

export default [
  {
    header: 'گزارش تخلفات',
    permissions: ['admin'],
  
  },
  {
    id: 'Report',
    title: 'گزارشات پیام غیر مجاز',
    permissions: ['admin'],
  
    icon: <ErrorOutline size={20} />,
    children: [
      {
        id: 'ReportList',
        title: 'لیست گزارش ها',
        icon: <Circle size={12} />,
        permissions: ['admin'],
        navLink: '/report/list'
      }  ,
    ]
  }

 
]
