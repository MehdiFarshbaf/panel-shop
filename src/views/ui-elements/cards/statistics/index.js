// ** React Imports
import { Fragment } from "react"

// ** Reactstrap Imports
// ** Utils
// ** Context
import { Col , Row } from "reactstrap"
import StatsHorizontal from "../../../../@core/components/widgets/stats/StatsHorizontal"
import { Category , Outbox , Person , Shop } from "@mui/icons-material"

// ** Custom Components

// ** Icons Imports

const StatisticsCards = ({dataSt}) => {
 
  return (
    <Fragment>
      <Row >
           <Col lg='3' sm='6'>
                <StatsHorizontal icon={<Person size={21} />} color='info' stats={dataSt?.users_count} statTitle='کاربران' />
           </Col>
           <Col lg='3' sm='6'>
                <StatsHorizontal icon={<Category size={21} />} color='danger' stats={dataSt?.categories_count} statTitle='دسته بندی ها' />
           </Col>
           <Col lg='3' sm='6'>
                <StatsHorizontal icon={<Shop size={21} />} color='success' stats={dataSt?.businesses_count} statTitle='فروشگاه ها' />
           </Col>
          
           <Col lg='3' sm='6'>
                <StatsHorizontal icon={<Outbox size={21} />} color='warning' stats={dataSt?.products_count} statTitle='آگهی ها' />
           </Col>
        
      </Row>
    </Fragment>
  )
}

export default StatisticsCards
