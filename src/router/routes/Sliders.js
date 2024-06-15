// ** React Imports
import { lazy } from "react"

const SliderList = lazy(() => import('../../views/sliders/Slider'))


const SlidersRoutes = [
    {

        element: <SliderList />,
        path: '/slider'
    }
]

export default SlidersRoutes