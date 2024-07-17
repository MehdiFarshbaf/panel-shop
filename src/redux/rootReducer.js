// ** Reducers Imports
import navbar from "./navbar"
import layout from "./layout"
import report from "@src/views/report/store"
import users from "./feature/userSlice"
import categories from "./feature/categorySlice"
import posts from "./feature/postSlice"
import products from "./feature/ProductSlice"
import faqs from "./feature/faqSlice"
import roles from "./feature/rolesSlice"
import admins from "./feature/adminSlice"

import auth from "./authentication"


const rootReducer = {
    auth,
    navbar,
    layout,
    report,
    users,
    categories,
    posts,
    products,
    faqs,
    roles,
    admins
}

export default rootReducer
