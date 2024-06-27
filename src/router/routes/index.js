// ** React Imports
import {Fragment} from "react"

// ** Routes Imports
import DashboardRoutes from "./Dashboards"
import AuthenticationRoutes from "./Authentication"

// ** Layouts
import BlankLayout from "@layouts/BlankLayout"
import VerticalLayout from "@src/layouts/VerticalLayout"
import HorizontalLayout from "@src/layouts/HorizontalLayout"
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper"

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute"
import PrivateRoute from "@components/routes/PrivateRoute"

// ** Utils
import {isObjEmpty} from "@utils"
import PagesRoutes from "./Pages"
import AdminRoutes from "./Admin"
import ShopRoutes from "./Shop"
import SliderRoutes from "./Sliders"
import AdsRoutes from "./Ads"

import TransactionRoutes from "@src/router/routes/Transaction"
import ChatRoutes from "@src/router/routes/Chat"
import DiscountRoutes from "@src/router/routes/Discount"
import SiteContentsRoutes from "@src/router/routes/SiteContent"
import NotificationsRoutes from "@src/router/routes/Notifications"
import FormsRoutes from "@src/router/routes/Forms"
import WithdrawRoutes from "@src/router/routes/Withdraw"
import UserRoutes from "@src/router/routes/Users"
import CategoryRoutes from "@src/router/routes/Category"
import PostRoutes from "@src/router/routes/Post"
import {Navigate} from "react-router-dom"

const getLayout = {
    blank: <BlankLayout/>,
    vertical: <VerticalLayout/>,
    horizontal: <HorizontalLayout/>
}

// ** Document title
const TemplateTitle = ''

// ** Default Route
const DefaultRoute = '/dashboard'

// ** Merge Routes
const Routes = [
    ...AuthenticationRoutes,
    ...DashboardRoutes,
    ...AdminRoutes,
    ...ShopRoutes,
    ...SliderRoutes,
    ...TransactionRoutes,
    ...ChatRoutes,
    ...DiscountRoutes,
    ...NotificationsRoutes,
    ...SiteContentsRoutes,
    ...FormsRoutes,
    ...AdsRoutes,
    ...PagesRoutes,
    ...WithdrawRoutes,
    ...UserRoutes,
    ...CategoryRoutes,
    ...PostRoutes
]

const getRouteMeta = route => {
    if (isObjEmpty(route.element.props)) {
        if (route.meta) {
            return {routeMeta: route.meta}
        } else {
            return {}
        }
    }
}

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
    const LayoutRoutes = []
    const data = JSON.parse(localStorage.getItem('userData'))

    if (Routes) {
        Routes.filter(route => {
            if (route.key) {
                if (data?.role !== undefined && data?.role?.permissions?.find(permission => permission.key.trim() === route.key.trim())) {
                    let isBlank = false
                    if (
                        (route.meta && route.meta.layout && route.meta.layout === layout) ||
                        ((route.meta === undefined || route.meta.layout === undefined) && defaultLayout === layout)
                    ) {
                        let RouteTag = PrivateRoute

                        // ** Check for public or private route
                        if (route.meta) {
                            route.meta.layout === 'blank' ? (isBlank = true) : (isBlank = false)
                            RouteTag = route.meta.publicRoute ? PublicRoute : PrivateRoute
                        }
                        if (route.element) {
                            const Wrapper =
                                // eslint-disable-next-line multiline-ternary
                                isObjEmpty(route.element.props) && isBlank === false
                                    ? // eslint-disable-next-line multiline-ternary
                                    LayoutWrapper
                                    : Fragment

                            route.element = (
                                <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
                                    <RouteTag route={route}>{route.element}</RouteTag>
                                </Wrapper>
                            )
                        }

                        // Push route to LayoutRoutes
                        LayoutRoutes.push(route)
                    }
                    return LayoutRoutes
                } else {
                    <Navigate to={'/auth/not-auth'}/>
                }
            } else {
                let isBlank = false
                // ** Checks if Route layout or Default layout matches current layout
                if (
                    (route.meta && route.meta.layout && route.meta.layout === layout) ||
                    ((route.meta === undefined || route.meta.layout === undefined) && defaultLayout === layout)
                ) {
                    let RouteTag = PrivateRoute

                    // ** Check for public or private route
                    if (route.meta) {
                        route.meta.layout === 'blank' ? (isBlank = true) : (isBlank = false)
                        RouteTag = route.meta.publicRoute ? PublicRoute : PrivateRoute
                    }
                    if (route.element) {
                        const Wrapper =
                            // eslint-disable-next-line multiline-ternary
                            isObjEmpty(route.element.props) && isBlank === false
                                ? // eslint-disable-next-line multiline-ternary
                                LayoutWrapper
                                : Fragment

                        route.element = (
                            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
                                <RouteTag route={route}>{route.element}</RouteTag>
                            </Wrapper>
                        )
                    }

                    // Push route to LayoutRoutes
                    LayoutRoutes.push(route)
                }
                return LayoutRoutes
            }

        })
    }
    return LayoutRoutes
}

const getRoutes = layout => {
    const defaultLayout = layout || 'vertical'
    const layouts = ['vertical', 'horizontal', 'blank']

    const AllRoutes = []

    layouts.forEach(layoutItem => {
        const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout)

        AllRoutes.push({
            path: '/',
            element: getLayout[layoutItem] || getLayout[defaultLayout],
            children: LayoutRoutes
        })
    })
    return AllRoutes
}

export {DefaultRoute, TemplateTitle, Routes, getRoutes}
