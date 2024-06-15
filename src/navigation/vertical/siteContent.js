// ** Icons Import
import {Circle} from "react-feather"
import {Settings} from "@mui/icons-material"
import {appConfig} from '@configs/config'

let childrenPages = [
    {
        key: "SETTINGS_LIST",
        id: 'siteContentFooter',
        title: 'تنظیمات وبسایت',
        icon: <Circle size={12}/>,
        permissions: ['admin'],
        navLink: '/site-content/setting/edit'
    }
]
if (appConfig.showSeoMenu) {
     childrenPages.push({
        key: "SETTINGS_LIST",
        id: 'siteContentSeoList',
        title: 'لیست سئو',
        icon: <Circle size={12}/>,
        permissions: ['admin'],
        navLink: '/site-content/seo/list'

    })
     childrenPages.push({
        key: "SETTINGS_LIST",
        id: 'siteContentSeo',
        title: 'افزودن سئو',
        icon: <Circle size={12}/>,
        permissions: ['admin'],
        navLink: '/site-content/seo/create'
    })
}

if (appConfig.staticPages) {
    childrenPages.push({
        key: "SETTINGS_LIST",
        id: 'siteContentFooter',
        title: 'صفحات استاتیک',
        icon: <Circle size={12}/>,
        permissions: ['admin'],
        navLink: '/site-content/pages/list'
    })
}

export default [
    {
        header: 'تنظیمات',
        permissions: ['admin']
    },
    {
        id: 'SiteContent',
        title: 'سایت',
        permissions: ['admin'],
        icon: <Settings size={20}/>,
        children: childrenPages
    }
]
