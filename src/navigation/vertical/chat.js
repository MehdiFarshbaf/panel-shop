// ** Icons Import
import { Circle } from "react-feather"
import { Chat } from "@mui/icons-material"

export default [
  {
    header: 'چت ها',
    permissions: ['admin'],
  
  },
  {
    id: 'Chat',
    title: 'چت ',
    permissions: ['admin'],
  
    icon: <Chat size={20} />,
    children: [
      {
        key: "CHAT_MESSAGES_LIST",
        id: 'ChatList',
        title: 'لیست چت ها',
        icon: <Circle size={12} />,
        permissions: ['admin'],
        navLink: '/chat/list'
      }  ,
      {
        key: "REPORTS_LIST",
        id: 'ReportList',
        title: 'لیست گزارش ها غیر مجاز',
        icon: <Circle size={12} />,
        permissions: ['admin'],
        navLink: '/report/list'
      }  ,
    ]
  }

 
]
