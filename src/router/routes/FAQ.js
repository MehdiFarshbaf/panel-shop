// ** React Imports
import {lazy} from 'react'

const FAQList = lazy(() => import('../../views/faqs/FAQList'))
const AddOrEditFAQ = lazy(() => import('../../views/faqs/AddEditFAQ'))

const CategoryRoutes = [
    {
        key: 'faqs',
        element: <FAQList/>,
        path: '/faqs'
    }, {
        key: 'update_faq',
        element: <AddOrEditFAQ/>,
        path: '/faqs/:id'
    }, {
        key: 'create_faq',
        element: <AddOrEditFAQ/>,
        path: '/faqs/add'
    }
]
export default CategoryRoutes