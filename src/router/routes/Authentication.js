// ** React Imports
import {lazy} from 'react'

const Login = lazy(() => import('../../views/pages/authentication/Login'))

const ForgotPassword = lazy(() => import('../../views/pages/authentication/ForgotPassword'))
const ResetPassword = lazy(() => import('../../views/pages/authentication/ResetPasswordCover'))

const AuthenticationRoutes = [
    {
        path: '/login',
        element: <Login/>,
        meta: {
            layout: 'blank',
            publicRoute: true,
            restricted: true
        }
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword/>,
        layout: 'BlankLayout',
        meta: {
            layout: 'blank',
            publicRoute: true,
            restricted: true
        }
    },
    {
        path: '/reset-password',
        element: <ResetPassword/>,
        layout: 'BlankLayout',
        meta: {
            layout: 'blank',
            publicRoute: true,
            restricted: true
        }
    }
]

export default AuthenticationRoutes
