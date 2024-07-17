// ** React Imports
import {lazy} from 'react'

const RolesList = lazy(() => import('../../views/roles/RolesList'))
const AddOrEditRole = lazy(() => import('../../views/roles/AddEditRole'))

const RoleRoutes = [
    {
        key: 'roles',
        element: <RolesList/>,
        path: '/roles'
    }, {
        key: 'update_role',
        element: <AddOrEditRole/>,
        path: '/roles/:id'
    }, {
        key: 'create_role',
        element: <AddOrEditRole/>,
        path: '/roles/add'
    }
]
export default RoleRoutes