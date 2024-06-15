// ** React Imports
import {lazy} from "react"

const AdsList = lazy(() => import('../../views/advertisement/list'))
const AdsEdit = lazy(() => import('../../views/advertisement/edit'))

const AdsRoutes = [
    {
        key: "PRODUCTS_LIST",
        element: <AdsList/>,
        path: '/ads/list'
    },
    {
        element: <AdsEdit/>,
        path: '/ads/edit/:slug/:id'
    }
]
export default AdsRoutes
