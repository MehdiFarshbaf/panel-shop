import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import API from "@src/utility/API"
import {handleShowErrorMessage} from "@utils"


const initialState = {
    loading: false,
    users: [],
    user: {},
    total: 0
}

const getAllUsers = createAsyncThunk("users/getUsers", async () => {
    try {
        const {data} = await API.get("/user")
        return data
    } catch (err) {
        await handleShowErrorMessage(err)
    }
})
const getUser = createAsyncThunk("users/getUser", async (id) => {
    try {
        const {data} = await API.get(`/user/${id}`)
        return data
    } catch (err) {
        await handleShowErrorMessage(err)
    }
})

// const deleteUser = createAsyncThunk("users/delete", async (userData) => {
const deleteUser = createAsyncThunk("users/delete", async (id) => {
    // const {_id, firstName} = userData

    console.log("delete in slice")

    // try {
    //     const {data} = await API.delete(`/user/${id}`)
    //     if (data.success) toast.success(data.message)
    //     return data
    // } catch (err) {
    //     await handleShowErrorMessage(err)
    // }
})

const userSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllUsers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.users = action.payload.users
            state.total = action.payload.total
            state.loading = false
        })
        builder.addCase(getAllUsers.rejected, state => {
            state.users = []
            state.loading = false
        })
        builder.addCase(getUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.loading = false
        })
        builder.addCase(getUser.rejected, (state, action) => {
            // console.log(action)
            state.user = false
            // toast.error(action.payload.message)
            state.loading = false
        })
        builder.addCase(deleteUser.pending, state => {
            state.loading = true
        })
        builder.addCase(deleteUser.fulfilled, state => {
            state.user = false
            state.loading = false
        })
        builder.addCase(deleteUser.rejected, state => {
            state.loading = false
        })
    }
})

export default userSlice.reducer

export {getAllUsers, getUser, deleteUser}