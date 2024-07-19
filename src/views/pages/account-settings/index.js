// ** React Imports
import {Fragment, useEffect, useState} from "react"

// ** Third Party Components
import axios from "axios"

// ** Reactstrap Imports
import {Col, Row, TabContent, TabPane} from "reactstrap"

// ** Demo Components
import Tabs from "./Tabs"
import Breadcrumbs from "@components/breadcrumbs"
import AccountTabContent from "./AccountTabContent"
import NotificationsTabContent from "./NotificationsTabContent"

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/react/pages/page-account-settings.scss"
import {getUserData} from "@src/auth/utils"
import SecurityTabContent from "@src/views/pages/account-settings/SecurityTabContent"

const AccountSettings = () => {
    // ** States
    const [activeTab, setActiveTab] = useState('1')

    const toggleTab = tab => {
        setActiveTab(tab)
    }
    const user = getUserData()


    return (
        <Fragment>
            <Row>
                <Col xs={12}>
                    <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab}/>

                    <TabContent activeTab={activeTab}>
                        <TabPane tabId='1'>
                            <AccountTabContent user={user}/>
                        </TabPane>
                        <TabPane tabId='2'>
                            <SecurityTabContent/>
                        </TabPane>
                    </TabContent>
                </Col>
            </Row>
        </Fragment>
    )
}

export default AccountSettings
