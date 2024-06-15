// ** React Imports
import { lazy } from "react"

const AdminAdd = lazy(() => import('../../views/admin/add'))
const AdminList = lazy(() => import('../../views/admin/list'))
const AdminEdit = lazy(() => import('../../views/admin/edit'))
const AdminRoleList = lazy(() => import('../../views/admin/role/list'))
const AdminRoleEdit = lazy(() => import('../../views/admin/role/edit'))
const AdminRoleAdd = lazy(() => import('../../views/admin/role/add'))

const AdminRoutes = [
  {
    key: "ADMINS_LIST",
    element: <AdminList />,
    path: '/admin/list'
  },
  {
    key: "ADMINS_UPDATE",
    element: <AdminEdit />,
    path: '/admin/edit/:id'
  },  {
    key: "ADMINS_CREATE",
    element: <AdminAdd />,
    path: '/admin/create'
  },
  {
    key: "ROLES_LIST",
    element:
      <AdminRoleList /> ,
    path: '/admin/role/list'
  },
  {
    key:"ROLES_CREATE",
    element:  <AdminRoleAdd />,
    path: '/admin/role/create'
  },
  {
    key:"ROLES_SHOW",
    element:
           <AdminRoleEdit />,
    path: '/admin/role/edit/:id'
  }
]

export default AdminRoutes
