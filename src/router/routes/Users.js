// ** React Imports
import {lazy} from 'react'

const UsersList = lazy(() => import('../../views/users/UsersList'))
const UserDetails = lazy(() => import('../../views/users/UserDetails'))

const UserRoutes = [
    {
        key: 'users',
        element: <UsersList/>,
        path: '/users'
    }, {
        key: 'users',
        element: <UserDetails/>,
        path: '/users/:id'
    }
]
export default UserRoutes