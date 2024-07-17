// ** Icons Import
import {Circle, User} from "react-feather"
import {AdminPanelSettings} from "@mui/icons-material"

export default [
    // {
    //     header: 'مدیران',
    //     permissions: ['admin']
    // },
    {
        id: 'Admin',
        title: 'مدیران',
        permissions: ['admin'],
        key: 'admins',
        icon: <AdminPanelSettings size={20}/>,
        children: [
            {
                key: "admins",
                id: 'admins',
                title: 'لیست مدیران',
                icon: <Circle size={12}/>,
                permissions: ['admin'],
                navLink: '/admins'
            },
            {
                key: "roles",
                id: 'roles',
                title: 'لیست نقش ها',
                icon: <Circle size={12}/>,
                permissions: ['admin'],
                navLink: '/roles'
            }
        ]
    }


]
