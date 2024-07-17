// ** React Imports
import { lazy } from "react"

const AdminsList = lazy(() => import('../../views/admin/AdminsList'))
const AddOrEditAdmin = lazy(() => import('../../views/admin/AddEditAdmin'))


const AdminRoutes = [
    {
        key: 'admins',
        element: <AdminsList/>,
        path: '/admins'
    },
    {
        key: 'update_admin',
        element: <AddOrEditAdmin/>,
        path: '/admins/:id'
    }, {
        key: 'create_admin',
        element: <AddOrEditAdmin/>,
        path: '/admins/add'
    }
]

export default AdminRoutes
