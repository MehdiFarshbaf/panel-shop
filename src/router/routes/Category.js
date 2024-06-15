// ** React Imports
import {lazy} from 'react'

const CategoryList = lazy(() => import('../../views/category/CategoryList'))
const AddOrEditCategory = lazy(() => import('../../views/category/AddEditCategory'))

const CategoryRoutes = [
    {
        key: 'category',
        element: <CategoryList/>,
        path: '/category'
    }, {
        key: 'category',
        element: <AddOrEditCategory/>,
        path: '/category/:id'
    }, {
        key: 'create_category',
        element: <AddOrEditCategory/>,
        path: '/category/add'
    }
]
export default CategoryRoutes