// ** React Imports
import { lazy } from "react"


const SiteContentSeoAdd = lazy(() => import('../../views/site-contents/seo/add-seo'))
const SiteContentSeoEdit = lazy(() => import('../../views/site-contents/seo/edit-seo'))
const SiteContentSeoList = lazy(() => import('../../views/site-contents/seo/list-seo'))
const SiteContentFooterEdit = lazy(() => import('../../views/site-contents/edit'))
const SiteContentTetherEdit = lazy(() => import('../../views/site-contents/edit-tether'))
// const SiteContentAboutEdit = lazy(() => import('../../views/site-contents/edit-about'))
const SiteContentPagesList = lazy(() => import('../../views/site-contents/list'))
const SiteContentPagesEdit = lazy(() => import('../../views/site-contents/edit-pages'))
const CreatePage = lazy(() => import('../../views/site-contents/CreatePage/CreatePage'))


const SiteContentsRoutes = [
  {
    key: "SETTINGS_LIST",
    element: <SiteContentPagesList />,
    path: '/site-content/pages/list'
  }, {
    key: "SETTINGS_LIST",
    element: <CreatePage />,
    path: '/site-content/pages/create'
  },  {
    key: "SETTINGS_LIST",
    element: <SiteContentPagesEdit />,
    // path: '/site-content/pages/:key/edit'
    // path: '/site-content/pages/edit-page/:name/:language'
    path: '/site-content/pages/edit-pages/:name'
  },
  {
    key: "SETTINGS_LIST",
    element: <SiteContentFooterEdit />,
    path: '/site-content/setting/edit'
  },
  {
    key: "SETTINGS_LIST",
    element: <SiteContentSeoAdd />,
    path: '/site-content/seo/create'
  },  {
    key: "SETTINGS_LIST",
    element: <SiteContentSeoEdit />,
    path: '/site-content/seo/:id/edit'
  },  {
    key: "SETTINGS_LIST",
    element: <SiteContentSeoList />,
    path: '/site-content/seo/list'
  },
  
  // {
  //   key: "SETTINGS_LIST",
  //
  //   element: <SiteContentAboutEdit />,
  //   path: '/site-content/about-us/edit'
  // },
{
    key: "SETTINGS_LIST",
    element: <SiteContentTetherEdit />,
    path: '/site-content/wallet/tether/'
  }
  
]

export default SiteContentsRoutes
