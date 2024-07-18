import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import API from "@src/utility/API"
import {handleShowErrorMessage} from "@utils"

const getAllRoles = createAsyncThunk("role/getAllRoles", async () => {
    try {
        const {data} = await API.get("/role")

        return data

    } catch (err) {
        await handleShowErrorMessage(err)
    }
})

const getAllPermissions = createAsyncThunk("role/getAllPermissions", async () => {
    try {
        const {data} = await API.get("/permission")

        return data

    } catch (err) {
        await handleShowErrorMessage(err)
    }
})

const getRole = createAsyncThunk("role/getRole", async (id) => {
    try {
        const {data} = await API.get(`/role/${id}`)
        return data
    } catch (err) {
        await handleShowErrorMessage(err)
    }
})

const initialState = {
    loading: false,
    disable: false,
    role: {},
    roles: [],
    permissions: [],
    total: 0
}

const RolesSlice = createSlice({
    name: 'role',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllRoles.pending, state => {
            state.loading = true
        })
        builder.addCase(getAllRoles.fulfilled, (state, {payload}) => {
            state.roles = payload.roles
            state.total = payload.total
            state.loading = false
        })
        builder.addCase(getAllRoles.rejected, state => {
            state.loading = false
        })
        builder.addCase(getRole.pending, state => {
            state.loading = true
        })
        builder.addCase(getRole.fulfilled, (state, {payload}) => {
            state.role = payload.role
            state.loading = false
        })
        builder.addCase(getRole.rejected, state => {
            state.role = {}
            state.loading = false
        })
        builder.addCase(getAllPermissions.pending, state => {

        })
        builder.addCase(getAllPermissions.fulfilled, (state, {payload}) => {
            state.permissions = payload.permissions

        })
        builder.addCase(getAllPermissions.rejected, state => {

        })
    }
})
export default RolesSlice.reducer
export {getAllRoles, getRole, getAllPermissions}