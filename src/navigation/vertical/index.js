// ** Navigation imports
import admin from "./admin"
import shop from "./shop"
import ads from "./ads"
import withdraw from "./withdraw"
import forms from "./forms"
import chat from "./chat"
import discount from "./discount"
import siteContent from "./siteContent"
import dashboards from "./dashboards"
import transaction from "@src/navigation/vertical/transaction"
import notifications from "./notifications"
import slider from "./slider"
import users from './users'
import category from './category'


// ** Merge & Export
export default [
    ...dashboards, ...users, ...category, ...slider, ...siteContent, ...admin, ...withdraw, ...shop,
    ...ads, ...transaction, ...chat, ...discount, ...forms, ...notifications
]
