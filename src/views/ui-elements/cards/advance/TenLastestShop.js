// ** Third Party Components
// ** Reactstrap Imports
import { Button, Card, CardBody, CardHeader, CardTitle } from "reactstrap"

// ** Icons Imports
import { useNavigate } from "react-router-dom"

const TenLatest = ({ title, data, link, list}) => {
     const navigate = useNavigate()
  const renderStates = () => {
    return  data?.slice(0, 9)?.map(state => {
      return (
           <div key={state.title} className='browser-states d-flex flex-wrap  align-items-start '>
                <div className='d-flex  mb-1'>
                     {
                          list === "shop" ? state?.logo &&
                               <img className='rounded me-1' src={state?.logo && state?.logo} width={"30"} height='30' alt={''} /> : list === "users" ? <h5 className='align-self-center mb-0'> &nbsp;{state?.name}&nbsp;</h5> : state._source.object?.mains.images[0] &&
                                    <img className='rounded me-1' src={state._source.object?.mains.images.length >= 1 && state._source.object?.mains.images[0]}
                                         width={"30"} height='30' alt={''} />
     
                     }
                     <h5 className='align-self-center mb-0'>{
                          list === "shop" ? state?.title : list === "users" ? state?.lastname : state._source.object?.mains.title
                     }</h5>
                </div>
                <div className='d-flex align-items-center mb-1'>
                     <p className='align-self-center mb-0'>{
                          list === "shop" ? state?.description : list === "users" ? state?.phone : state._source.object?.mains.description
     
                     }</p>
                </div>
              {/*  <div className='d-flex '>
                     <p className='align-self-center mb-0'>{ moment(state.created_at).format("jYYYY/jMM/jDD") } </p>
                </div>*/}
           </div>
      )
    })
  }

  return (
    <Card className='card-browser-states'>
      <CardHeader>
        <div>
          <CardTitle tag='h4'>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardBody>{renderStates()}</CardBody>
         <Button className='m-1' color='primary' onClick={() => navigate(link)}>
              نمایش همه
         </Button>
    </Card>
  )
}

export default TenLatest
