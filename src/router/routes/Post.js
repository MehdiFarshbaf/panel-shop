// ** React Imports
import {lazy} from 'react'

const PostList = lazy(() => import('../../views/posts/PostsList'))
const AddOrEditPost = lazy(() => import('../../views/posts/AddEditPost'))

const CategoryRoutes = [
    {
        key: 'blogs',
        element: <PostList/>,
        path: '/posts'
    },
    {
        key: 'update_blog',
        element: <AddOrEditPost/>,
        path: '/posts/:id'
    }, {
        key: 'create_blog',
        element: <AddOrEditPost/>,
        path: '/posts/add'
    }
]
export default CategoryRoutes