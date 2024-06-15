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
import {useDispatch, useSelector} from "react-redux"
import {getData as getDataShop} from "@src/views/shop/store"
import {getData as getDataCategory} from "@src/views/categories/store"
import {
    getData as getDataAdvertisement
} from "@src/views/advertisement/store"


const SiteContentAboutsEdit = () => {
    const {i18n} = useTranslation()
    const {id} = useParams()

    const [data, setData] = useState(null)
    const [country, setCountry] = useState(null)
    const [province, setProvince] = useState(null)
    const dispatch = useDispatch()
    const {data: categories} = useSelector(state => state.categories)
    const {data: shop} = useSelector(state => state.shop)
    const {data: advertisement} = useSelector(state => state.advertisement)
    useEffect(() => {
        dispatch(getDataShop())
        dispatch(getDataCategory())
        dispatch(getDataAdvertisement())

    }, [dispatch])
    useEffect(() => {
        setData(null)
        axios.get(`/seos/${id}`, {
            headers: {
                'X-localization': i18n.language
            }

        }).then(response => {
            console.log(response)
            setData(response.data.data)
            // axios.get(`/provinces/${response.data.data?.city?.province_id}`).then(response => {
            axios.get(`/provinces/${response.data.data?.id}`).then(response => {
                setProvince(response.data.data)
            })
        })
        axios.get(`/countries`).then(response => {
            setCountry(response.data.data)
        })

    }, [i18n.language])

    return data !== null && data !== undefined && country?.length > 0 && province && advertisement?.length > 0 && shop?.length > 0
    && categories?.length > 0 ? (
        <div className='invoice-edit-wrapper'>
            <Row className='invoice-edit'>
                <Col xl={12} md={12} sm={12}>
                    <EditCard currentData={data}
                              countries={country?.length >= 1 ? country?.map((data) => ({
                                  label: data.name,
                                  value: data.id
                              })) : [{value: '', label: ""}]}
                              province={province}
                              shop={shop?.length >= 1 ? [
                                  {value: null, label: "همه"}, ...shop.map((data) => ({
                                      label: data.title,
                                      value: data.id,
                                      image: data.store_photo
                                  }))
                              ] : [{value: '', label: "", image: ''}]}
                              advertisement={advertisement?.length >= 1 ? [
                                  {
                                      value: null,
                                      label: "همه"
                                  }, ...advertisement.map((data) => ({
                                      label: data._source?.object?.slug,
                                      value: data._id,
                                      image: data._source.object?.mains?.images[0]
                                  }))
                              ] : [
                                  {
                                      value: "",
                                      label: "",
                                      image: ""
                                  }
                              ]}

                              categories={categories?.length >= 1 ? [
                                  {
                                      value: null,
                                      label: "همه"
                                  }, ...categories.map((data) => ({
                                      label: data._source?.cat_name,
                                      value: data._id,
                                      image: data._source.icon
                                  }))
                              ] : [
                                  {
                                      value: "",
                                      label: "",
                                      image: ""
                                  }
                              ]}

                    />
                </Col>
            </Row>

        </div>
    ) : (
        <Alert color='danger'>


        </Alert>
    )
}

export default SiteContentAboutsEdit
