// ** React Imports
import { Outlet } from "react-router-dom"
import Layout from "@layouts/VerticalLayout"

// ** Menu Items Array
import navigation from "@src/navigation/vertical"
import themeConfig from "@configs/themeConfig";
import ScrollToTop from "@components/scrolltop"
import { Button } from "reactstrap";
import { ArrowUp } from "react-feather";

const VerticalLayout = props => {

  return (
       <>
          <Layout menuData={navigation} {...props}>
             <Outlet />
          </Layout>
          {themeConfig.layout.scrollTop === true ? (
               <div className='scroll-to-top'>
                  <ScrollToTop showOffset={300} className='scroll-top d-block'>
                     <Button className='btn-icon' color='primary'>
                        <ArrowUp size={14} />
                     </Button>
                  </ScrollToTop>
               </div>
          ) : null}
       </>

  )
}

export default VerticalLayout
