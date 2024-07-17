import {Fragment, useEffect} from "react"
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import AddOrEditRole from "@src/views/roles/AddOrEditRole"
import Loading from "@src/views/ui-elements/Loading/Loading"
import {getAllPermissions, getRole} from "@store/feature/rolesSlice"


const AddEditRole = () => {

    //variable
    const {id} = useParams()
    const {role, loading, permissions} = useSelector(state => state.roles)
    const dispatch = useDispatch()

    //functions
    useEffect(() => {
        dispatch(getAllPermissions())
        if (id) {
            dispatch(getRole(id))
        }
    }, [])

    return (
        <Fragment>
            {loading ? <Loading/> :
                id && role !== null && role !== undefined ?
                    <AddOrEditRole currentData={role}
                                   permissions={permissions.map(permission => ({label: permission.title, value: permission.key}))}
                                   isEdit={true}/> : id === undefined &&
                    <AddOrEditRole isEdit={false} permissions={permissions.map(permission => ({label: permission.title, value: permission.key}))}/>
            }
        </Fragment>
    )
}
export default AddEditRole