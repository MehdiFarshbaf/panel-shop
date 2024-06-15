// ** React Imports
// eslint-disable-next-line no-duplicate-imports

// ** Reactstrap Imports
import {Col, Row} from "reactstrap"

// ** Context
// ** Demo Components
import StatisticsCards from "../../ui-elements/cards/statistics"
import TenLatest from "../../ui-elements/cards/advance/TenLastestShop"
import {useEffect, useState} from "react"

import API from "@src/utility/API"

// ** Styles

const EcommerceDashboard = () => {

    //variables
    const [loading, setLoading] = useState(true)

    //functions
    const getDashboardData = async () => {
        try {
            setLoading(true)
            const res = await API.get("/dashboard")
            console.log(res)
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }
    useEffect(() => {
        getDashboardData()
    }, [])

    return (
        <div id='dashboard-ecommerce'>
            <Row className='match-height'>
                <Col xl='12' md='12' xs='12'>
                    <StatisticsCards cols={{xl: '3', sm: '6'}}/>
                </Col>
                <Col lg='4' md='6' xs='12'>
                    <TenLatest cols={{xl: '3', sm: '6'}}
                               title={"آخرین فروشگاه ها"} link={"/shop/list"} list={"shop"}/>
                </Col>

            </Row>
        </div>
    )
}

export default EcommerceDashboard
