// ** React Imports
import { lazy } from "react"


const ChatList = lazy(() => import('../../views/chat/list'))
const ReportList = lazy(() => import('../../views/report/list'))



const ChatRoutes = [
  {
    key: "CHAT_MESSAGES_LIST",
  
    element: <ChatList />,
    path: '/chat/list'
  },
  {
    key: "REPORTS_LIST",
    element: <ReportList />,
    path: '/report/list'
  },
]

export default ChatRoutes
