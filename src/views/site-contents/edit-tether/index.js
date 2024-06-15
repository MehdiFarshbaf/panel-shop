// ** React Imports
import {useEffect, useState} from "react"

// ** Third Party Components
import axios from "axios"

// ** Reactstrap Imports
import {Alert, Col, Row} from "reactstrap"

// ** Invoice Edit Components
import {useTranslation} from "react-i18next"
import EditCard from "./EditCard"
import ComponentSpinner from "../../../@core/components/spinner/Loading-spinner";


const SiteContentAboutsEdit = () => {
    const {i18n} = useTranslation()

    const [data, setData] = useState(null)
    const [wallets, setWallets] = useState([])
    const [loading, setLoading] = useState(true)

    const handleGetWallets = async () => {
        setLoading(true)
        try {
            const res = await axios.get("/pages/tether_wallet")
            if (res.status === 200) {
                const inWallets = Object.values(res.data.data).filter(item => {
                    if (item?.name) {
                        return {...item, label: item.network, value: item.network}
                    }
                })
                await setWallets(inWallets)
                setLoading(false)
            }
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    useEffect(() => {
        handleGetWallets()
    }, [])

    useEffect(() => {
        setData(null)
        axios.get(`/pages`, {
            headers: {
                'X-localization': i18n.language
            }
        }).then(response => {
            setData(response.data)
        })
    }, [i18n.language])

    return data !== null && data !== undefined ? (
        <div className='invoice-edit-wrapper'>
            <Row className='invoice-edit'>
                <Col xl={12} md={12} sm={12}>
                    {loading ? <ComponentSpinner className='content-loader-table'/> :
                        <EditCard initData={() => handleGetWallets()} wallets={wallets}
                                  currentData={data.tether_wallet}/>}

                </Col>
            </Row>

        </div>
    ) : (
        <Alert color='danger'>


        </Alert>
    )
}

export default SiteContentAboutsEdit
