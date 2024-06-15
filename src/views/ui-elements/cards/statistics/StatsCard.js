// ** Third Party Components
import classnames from "classnames"
import { Outbox , Person , Shop , } from "@mui/icons-material";
// ** Custom Components
import Avatar from "@components/avatar"

// ** Reactstrap Imports
import { Card , CardBody , CardHeader , CardText , Col , Row } from "reactstrap"
import { useEffect , useState } from "react";
import axios from "axios";
import { numberSeparator } from "../../../../utility/formatNumber";

const StatsCard = ({ cols }) => {
  const [dataSt, setDataSt] = useState(null)
  useEffect(() => {
    axios.get(`/admin_panel`).then(response => {
      setDataSt(response.data.data)
    })
  }, [])
  const data = [
    {
      title: numberSeparator(dataSt?.users || 0)
      ,
      subtitle: 'کاربران',
      color: 'light-danger',
      icon: <Person size={24} />
    },
    {
      title:numberSeparator(dataSt?.shop || 0),
      subtitle: 'فروشگاه ها',
      color: 'light-info',
      icon: <Shop size={24} />
    },
    {
      title:numberSeparator(dataSt?.ad || 0),
      subtitle: 'آگهی ها',
      color: 'light-warning',
      icon: <Outbox size={24} />
    },
  ]

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols)
      const margin = index === 2 ? 'sm' : colMargin[0]
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1
          })}
        >
          <div className='d-flex align-items-center'>
            <Avatar color={item.color} icon={item.icon} className='me-2' />
            <div className='my-auto'>
              <h4 className='fw-bolder mb-0'>{item.title}</h4>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics'>
  
      <CardHeader>
  
        {/*<CardText className='card-text font-small-2 me-25 mb-0'>Updated 1 month ago</CardText>*/}
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default StatsCard
