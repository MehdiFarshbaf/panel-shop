// ** Redux Imports
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// export const getData = createAsyncThunk('appPages/getDataPages', async params => {
export const getData = createAsyncThunk('appPages/getDataPages', async params => {
    const response = await axios.get('/new-pages')
    const myArray = response.data.data
    console.log("my array is :", myArray)
    // const myArray = Object.entries(response.data).slice(2).map(([key, value]) => {
    //     return {
    //         key,
    //         ...value
    //     }
    // })
    return {
        data: myArray,
        allData: myArray,
        totalPages: myArray.length,
        params

    }
})
export const getDataSeo = createAsyncThunk('appPages/getDataSeoPages', async params => {
    const response = await axios.get('/seos', {
        params: {
            skip: ((params.page - 1) * params.perPage),
            limit: params.perPage
        }
    })

    return {
        dataSeo: response.data.data.data,
        allDataSeo: response.data.data.data,
        totalPagesSeo: response.data.data.count,
        paramsSeo: params

    }
})
export const deleteSeo = createAsyncThunk('appPages/deleteSeo', async (id, {dispatch, getState}) => {
    await axios.delete(`/seos/${id}`)
    await dispatch(getData(getDataSeo().pages.params))
    return id
})
export const deletePages = createAsyncThunk('appPages/deletePages', async (id, {dispatch, getState}) => {
    await axios.delete(`/about-us/${id}`)
    await dispatch(getData(getState().pages.params))
    return id
})

export const appPagesSlice = createSlice({
    name: 'appPages',
    initialState: {
        isLoading: false,
        data: [],
        total: 1,
        allData: [],
        params: {},
        dataSeo: [],
        totalSeo: 1,
        allDataSeo: [],
        paramsSeo: {}

    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getData.pending, (state) => {
            state.isLoading = true
        }).addCase(getData.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.allData = action.payload.allData
            state.total = action.payload.totalPages
            state.isLoading = false
            state.params = action.payload.params
        }).addCase(getData.rejected, (state) => {
            state.isLoading = false
        }).addCase(getDataSeo.pending, (state) => {
            state.isLoading = true
        }).addCase(getDataSeo.fulfilled, (state, action) => {
            state.dataSeo = action.payload.dataSeo
            state.allDataSeo = action.payload.allDataSeo
            state.totalSeo = action.payload.totalPagesSeo
            state.isLoading = false
            state.paramsSeo = action.payload.paramsSeo
        }).addCase(getDataSeo.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export default appPagesSlice.reducer
