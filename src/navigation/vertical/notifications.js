// ** Icons Import
import { Circle , AlertCircle } from "react-feather"

export default [
  {
    header: 'پیام ها',
       permissions: ['admin'],
     
  },
  {
    id: 'Notifications',
    title: 'پیام',
       permissions: ['admin'],
     
       icon: <AlertCircle size={20} />,
    children: [
      {
         key: "CONTACTUS_MESSAGES_LIST",
         
        id: 'NotificationsList',
        title: 'لیست پیام ها',
        icon: <Circle size={12} />,
           permissions: ['admin'],
           navLink: '/notifications/list'
      },
    ]
  },

 
]
