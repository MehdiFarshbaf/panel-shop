// ** Icons Import
import {Circle} from "react-feather"
import {Discount} from "@mui/icons-material"

export default [
    {
        header: 'تخفیف ها',
        permissions: ['admin']
    },
    {
        id: 'Discount',
        title: 'کد تخفیف ',
        permissions: ['admin'],

        icon: <Discount size={20}/>,
        children: [
            {
                key: "DISCOUNTS_LIST",
                id: 'DiscountList',
                title: 'لیست کد تخفیف ها',
                icon: <Circle size={12}/>,
                permissions: ['admin'],
                navLink: '/discount/list'
            }
        ]
    }


]
