import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import API from "@src/utility/API"
import {handleShowErrorMessage} from "@utils"

const getAllAdmins = createAsyncThunk("admin/getAllAdmins", async () => {
    try {
        const {data} = await API.get("/admin")

        return data

    } catch (err) {
        await handleShowErrorMessage(err)
    }
})

const getAdmin = createAsyncThunk("admin/getAdmin", async (id) => {
    try {
        const {data} = await API.get(`/admin/${id}`)
        return data
    } catch (err) {
        await handleShowErrorMessage(err)
    }
})

const initialState = {
    loading: false,
    disable: false,
    admin: {},
    admins: [],
    total: 0
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllAdmins.pending, state => {
            state.loading = true
        })
        builder.addCase(getAllAdmins.fulfilled, (state, {payload}) => {
            state.admins = payload.admins
            state.total = payload.total
            state.loading = false
        })
        builder.addCase(getAllAdmins.rejected, state => {
            state.loading = false
        })
        builder.addCase(getAdmin.pending, state => {
            state.loading = true
        })
        builder.addCase(getAdmin.fulfilled, (state, {payload}) => {
            state.admin = payload.admin
            state.loading = false
        })
        builder.addCase(getAdmin.rejected, state => {
            state.admin = {}
            state.loading = false
        })
    }
})
export default adminSlice.reducer
export {getAllAdmins, getAdmin}