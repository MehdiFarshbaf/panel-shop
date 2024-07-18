import {Fragment, useEffect} from "react"
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import Loading from "@src/views/ui-elements/Loading/Loading"
import {getAdmin} from "@store/feature/adminSlice"
import AddOrEditAdmin from "@src/views/admin/AddOrEditAdmin"
import {getAllRoles} from "@store/feature/rolesSlice"


const AddEditAdmin = () => {

    //variable
    const {id} = useParams()
    const {admin, loading} = useSelector(state => state.admins)
    const {roles} = useSelector(state => state.roles)
    const dispatch = useDispatch()

    //functions
    useEffect(() => {
        dispatch(getAllRoles())
        if (id) {
            dispatch(getAdmin(id))
        }
    }, [])

    return (
        <Fragment>
            {loading ? <Loading/> :
                id && admin !== null && admin !== undefined ?
                    <AddOrEditAdmin roles={roles.map(role => ({value: role._id, label: role.name}))} currentData={admin}
                                    isEdit={true}/> : id === undefined &&
                    <AddOrEditAdmin roles={roles.map(role => ({value: role._id, label: role.name}))} isEdit={false}/>
            }
        </Fragment>
    )
}
export default AddEditAdmin