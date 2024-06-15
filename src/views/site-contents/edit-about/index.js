// ** React Imports
import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"

// ** Third Party Components
import axios from "axios"

// ** Reactstrap Imports
import {Alert, Col, Row} from "reactstrap"

// ** Invoice Edit Components
import EditCard from "./EditCard"
import {useTranslation} from "react-i18next"


const SiteContentAboutsEdit = () => {
    // const {i18n} = useTranslation()

    // const [data, setData] = useState(null)

    // useEffect(() => {
    //     setData(null)
    //     axios.get(`/show_about`, {
    //         headers: {
    //             'X-localization': i18n.language
    //         }
    //     }).then(response => {
    //         setData(response.data.data)
    //     })
    // }, [i18n.language])


    // return data !== null && data !== undefined ? (
    return (
        <div className='invoice-edit-wrapper'>
            <Row className='invoice-edit'>
                <Col xl={12} md={12} sm={12}>
                    {/*<EditCard currentData={data} lang={i18n.language}/>*/}
                </Col>
            </Row>

        </div>
    )
}

export default SiteContentAboutsEdit
