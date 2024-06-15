// ** Icons Import
import { Circle } from "react-feather"
import { AttachMoney } from "@mui/icons-material"

export default [
  {
    header: 'تراکنش ها',
    permissions: ['admin'],
  
  },
  {
    id: 'Transaction',
    title: 'تراکنش ',
    permissions: ['admin'],
  
    icon: <AttachMoney size={20} />,
    children: [
      {
        key: "TRANSACTIONS_LIST",
        id: 'TransactionList',
        title: 'لیست تراکنش ها',
        icon: <Circle size={12} />,
        permissions: ['admin'],
        navLink: '/transaction/list'
      }  ,
    ]
  }

 
]
