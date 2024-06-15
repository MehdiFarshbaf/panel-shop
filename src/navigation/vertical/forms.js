// ** Icons Import
import { Circle } from "react-feather"
import { DynamicFormRounded } from "@mui/icons-material"

export default [
  {
    header: 'فرم ساز ',
    permissions: ['admin'],
  
  },
  {
    id: 'Form',
    title: 'فرم ساز',
    permissions: ['admin'],
  
    icon: <DynamicFormRounded size={20} />,
    children: [
      {
        id: 'FormList',
        title: 'لیست فرم ساز ها',
        icon: <Circle size={12} />,
        permissions: ['admin'],
        navLink: '/forms/list'
      }  ,
      {
        id: 'FormAdd',
        title: 'افزودن',
        icon: <Circle size={12} />,
        permissions: ['admin'],
    
        navLink: '/forms/create'
      }
    ]
  }

 
]
