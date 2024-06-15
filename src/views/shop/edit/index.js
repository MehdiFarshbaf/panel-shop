// ** React Imports
import {useEffect, useState} from "react"
import {Link, useParams} from "react-router-dom"

// ** Third Party Components
// ** Reactstrap Imports
import {Alert, Col, Row} from "reactstrap"

// ** Invoice Edit Components
import EditCard from "./EditCard"
import axios from "axios";


const EditPage = () => {
    // ** Hooks
    const [data, setData] = useState(null)
    const [banner, setBanner] = useState(null)
    const {id} = useParams()

    const handleGetBanner = async () => {
        await axios.get(`/admin/business/${id}`).then(response => {
            setData(response.data.data)
        })
        const res = await axios.get(`/business/${id}/banner`)
        if (res.data.length > 0) {
            await setBanner(res.data[0])
        } else {
            await setBanner(false)
        }
    }
    useEffect(() => {
        handleGetBanner()
    }, [])


    return data !== null && data !== undefined ? (
        <div className='invoice-edit-wrapper'>
            <Row className='invoice-edit'>
                <Col xl={12} md={12} sm={12}>
                    <EditCard currentData={data} banner={banner}/>

                </Col>
            </Row>

        </div>
    ) : (
        <Alert color='danger'>
            <h4 className='alert-heading'>فروشگاه</h4>
            <div className='alert-body'>
                چنین فروشگاهی وجود ندارد لطفا به لیست مراجعه کنید.
                <Link to='/shop/list'>لیست فروشگاه ها</Link>
            </div>
        </Alert>
    )
}

export default EditPage
