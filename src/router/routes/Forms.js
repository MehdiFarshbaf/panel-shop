// ** React Imports
import { lazy } from "react"

const FormsAdd = lazy(() => import('../../views/forms/add'))
const FormsList = lazy(() => import('../../views/forms/list'))
const FormsEdit = lazy(() => import('../../views/forms/edit'))


const FormsRoutes = [
  {
    element: <FormsList />,
    path: '/forms/list'
  },
  {
    element: <FormsEdit />,
    path: '/forms/edit/:name'
  },  {
    element: <FormsAdd />,
    path: '/forms/create'
  },

]

export default FormsRoutes
