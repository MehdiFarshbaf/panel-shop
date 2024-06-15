// ** React Imports
import { lazy } from "react"
import { Navigate } from "react-router-dom"

const NotificationsList = lazy(() => import('../../views/notifications/list'))


const NotificationsRoutes = [
  {
    key: "CONTACTUS_MESSAGES_LIST",
    element: <NotificationsList />,
    path: '/notifications/list'
  },
]

export default NotificationsRoutes
