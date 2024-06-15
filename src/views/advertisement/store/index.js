// ** Redux Imports
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
// ** Axios Imports
import toast from "react-hot-toast"
import axios from "axios"

export const getAllData = createAsyncThunk('appCategories/getAllData', async () => {
    const response = ''
    return response.data
})


export const getData = createAsyncThunk('appCategories/getData', async params => {
    let response = ''
    if (params) {
        if (params.status === 'pending') {
            response = await axios.get(`/Ads/pending-products`, {
                params: {
                    page: params.page,
                    size: params.perPage
                }
            })
        } else if (params.status === 'rejected') {
            response = await axios.get(`/Ads/rejected-products`, {
                params: {
                    page: params.page,
                    size: params.perPage
                }
            })
        } else if (params.status === 'expire') {
            response = await axios.get(`/Ads/expired-products`, {
                params: {
                    page: params.page,
                    size: params.perPage
                }
            })
        } else {
            response = await axios.get(`/Ads/products`, {
                params: {
                    page: params.page,
                    size: params.perPage
                }
            })
        }
    } else {

        response = await axios.get(`/Ads/products`)
    }

    return {
        data: response.data.hits,
        allData: response.data.hits,
        totalPages: response.data.total.value,
        params

    }
})

export const confirmAdver = createAsyncThunk('appCategories/confirmAdver', async (id, {dispatch, getState}) => {
    const dataInfo = new FormData()
    dataInfo.append("product_id", id)
    dataInfo.append("status", 'accepted')
    await axios.post(`/Ads/products/changeProductStatus`, dataInfo)

    toast.success("با موفقیت عملیات انجام شد")
    await dispatch(getData(getState().advertisement.params))
    return id
})
export const rejectAdver = createAsyncThunk('appCategories/rejectAdver', async (id, {dispatch, getState}) => {
    const dataInfo = new FormData()
    dataInfo.append("product_id", id)
    dataInfo.append("status", 'rejected')
    await axios.post(`/Ads/products/changeProductStatus`, dataInfo)

    toast.success("با موفقیت عملیات انجام شد")
    await dispatch(getData(getState().advertisement.params))
    return id
})
export const deleteAdver = createAsyncThunk('appCategories/deleteAdver', async (id, {dispatch, getState}) => {
    const dataInfo = new FormData()
    dataInfo.append("product_id", id)
    await axios.post(`/Ads/products/delete`, dataInfo)

    toast.success("با موفقیت عملیات انجام شد")
    await dispatch(getData(getState().advertisement.params))
    return id
})

export const appCategoriesSlice = createSlice({
    name: 'appCategories',
    initialState: {
        data: [],
        total: 1,
        params: {},
        allData: [],
        isLoading: false


    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getData.pending, (state) => {
            state.isLoading = true
        }).addCase(getData.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.allData = action.payload.allData
            state.total = action.payload.totalPages
            state.params = action.payload.params
            state.isLoading = false

        }).addCase(getData.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export default appCategoriesSlice.reducer
