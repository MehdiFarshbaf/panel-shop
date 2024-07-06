// ** React Imports
import {lazy} from 'react'

const ProductList = lazy(() => import('../../views/Product/ProductList'))
const AddOrEditProduct = lazy(() => import('../../views/Product/AddEditProduct'))

const CategoryRoutes = [
    {
        key: 'products',
        element: <ProductList/>,
        path: '/products'
    },
    {
        key: 'update_product',
        element: <AddOrEditProduct/>,
        path: '/products/:id'
    }, {
        key: 'create_product',
        element: <AddOrEditProduct/>,
        path: '/products/add'
    }
]
export default CategoryRoutes