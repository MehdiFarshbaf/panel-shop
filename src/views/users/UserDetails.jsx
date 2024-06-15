import {Fragment, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link, useParams, useNavigate} from "react-router-dom"
import Loading from "@src/views/ui-elements/Loading/Loading"
import {Card, CardBody, CardFooter, CardHeader, Col, Row} from "reactstrap"
import {getUser} from "@store/feature/userSlice"
import {handleDeleteAPI, handleShowErrorMessage, showPersianDate} from "@utils"

const UserDetails = () => {

    const dispatch = useDispatch()
    const {user, loading} = useSelector(state => state.users)
    const {id} = useParams()
    const navigation = useNavigate()

    //functions
    const handleDeleteUser = async () => {
        try {
            // const data = await dispatch(deleteUser({_id, firstName})).unwrap()
            // const data = await dispatch(deleteUser(id)).unwrap()
            const data = await handleDeleteAPI(`/user/${user.id}`)
            if (data.success) navigation("/users")
        } catch (err) {
            await handleShowErrorMessage(err)
        }
    }

    useEffect(() => {
        dispatch(getUser(id))
    }, [])

    return (
        <Fragment>
            {loading ? <Loading/> : <Card>
                <CardHeader>
                    <h4>اطلاعات {user.fullname}</h4>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md={6} sm={12} className="zindex-sm-3">
                            <p>نام : {user?.firstName}</p>
                            <p>نام خانوادگی : {user?.lastName}</p>
                            <p>ایمیل : {user?.email}</p>
                            <p>موبایل : {user?.mobile}</p>
                            <p>آدرس : {user?.address}</p>
                            <p className="rtl">تاریخ عضویت
                                : {showPersianDate(user.createdAt)}</p>
                            <p>تاریخ آخرین به روز رسانی
                                : {showPersianDate(user.updatedAt)}</p>
                        </Col>
                        <Col md={6} sm={12} className="zindex-sm-2">2</Col>
                    </Row>
                </CardBody>
                <CardFooter className="cardFooter">
                    <Link disabled={loading} to="/users" className="btn btn-outline-primary btn-md">لیست کاربران</Link>
                    <button disabled={loading} onClick={() => handleDeleteUser()}
                            className="btn btn-danger btn-md mx-2">حذف کاربر
                    </button>
                </CardFooter>
            </Card>}
        </Fragment>
    )
}
export default UserDetails