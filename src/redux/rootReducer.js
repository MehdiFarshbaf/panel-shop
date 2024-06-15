// ** Reducers Imports
import navbar from "./navbar"
import layout from "./layout"
import shop from "@src/views/shop/store"
import withdraw from "@src/views/withdraw/store"
import admin from "@src/views/admin/store"
import chat from "@src/views/chat/store"
import forms from "@src/views/forms/store"
import report from "@src/views/report/store"
import discount from "@src/views/discount/store"
import transaction from "@src/views/transaction/store"
import advertisement from "@src/views/advertisement/store"
import notifications from "@src/views/notifications/store"
import pages from "@src/views/site-contents/store"
import users from "./feature/userSlice"
import categories from "./feature/categorySlice"

import auth from "./authentication"


const rootReducer = {
    auth,
    navbar,
    layout,
    shop,
    admin,
    report,
    discount,
    advertisement,
    transaction,
    chat,
    notifications,
    forms,
    pages,
    withdraw,
    users,
    categories
}

export default rootReducer
