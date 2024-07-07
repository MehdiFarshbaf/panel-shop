// ** Reducers Imports
import navbar from "./navbar"
import layout from "./layout"
import admin from "@src/views/admin/store"
import report from "@src/views/report/store"
import users from "./feature/userSlice"
import categories from "./feature/categorySlice"
import posts from "./feature/postSlice"
import products from "./feature/ProductSlice"
import faqs from "./feature/faqSlice"

import auth from "./authentication"


const rootReducer = {
    auth,
    navbar,
    layout,
    admin,
    report,
    users,
    categories,
    posts,
    products,
    faqs
}

export default rootReducer
