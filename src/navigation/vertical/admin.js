// ** Icons Import
import {Circle, User} from "react-feather"
import {AdminPanelSettings} from "@mui/icons-material"

export default [
    {
        header: 'مدیران',
        permissions: ['admin']
    },
    {
        id: 'Admin',
        title: 'مدیران',
        permissions: ['admin'],

        icon: <AdminPanelSettings size={20}/>,
        children: [
            {
                key: "ADMINS_LIST",
                id: 'AdminList',
                title: 'لیست مدیران',
                icon: <Circle size={12}/>,
                permissions: ['admin'],
                navLink: '/admin/list'
            },
            {
                key: "ADMINS_CREATE",

                id: 'AdminAdd',
                title: 'افزودن',
                icon: <Circle size={12}/>,
                permissions: ['admin'],

                navLink: '/admin/create'
            },
            {
                key: "ROLES_LIST",
                id: 'AdminsRoleList',
                title: 'لیست نقش ها',
                icon: <Circle size={12}/>,
                permissions: ['admin'],
                navLink: '/admin/role/list'
            }, {
                key: "ROLES_CREATE",
                id: 'AddAdminsRole',
                title: 'ساخت نقش ',
                icon: <Circle size={12}/>,
                permissions: ['admin'],
                navLink: '/admin/role/create'
            }
        ]
    }


]
