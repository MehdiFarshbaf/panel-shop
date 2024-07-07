import {AdminPanelSettings, Settings} from "@mui/icons-material"
import {Circle} from "react-feather"

export default [
    {
        id: 'setting',
        title: 'تنظیمات سایت',
        permissions: ['admin'],
        icon: <Settings size={20}/>,
        children: [
            {
                key: "faqs",
                id: 'faqs',
                title: 'سوالات متداول',
                icon: <Circle size={12}/>,
                permissions: ['admin'],
                navLink: '/faqs'
            }
        ]
    }
]