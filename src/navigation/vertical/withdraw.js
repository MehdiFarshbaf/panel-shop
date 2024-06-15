// ** Icons Import
import { Circle } from "react-feather"
import { Wallet } from "@mui/icons-material"


export default [
  {
    header: 'درخواست برداشت',
    permissions: ['admin'],
  
  },
  {
    id: 'Withdraw',
    title: 'درخواست برداشت ',
    permissions: ['admin'],
  
    icon: <Wallet size={20} />,
    children: [
      {
        key: "WITHDRAWS_LIST",
        id: 'WithdrawList',
        title: 'لیست برداشت از کیف پول',
        icon: <Circle size={12} />,
        permissions: ['admin'],
        navLink: '/withdraw/list'
      }  ,
    ]
  }

 
]
