// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// ** Axios Imports
import toast from "react-hot-toast"
import axios from "axios"

export const getAllData = createAsyncThunk('appDiscount/getAllData', async () => {
  const response = ''
  return response.data
})


export const getData = createAsyncThunk('appDiscount/getData', async params => {
  let response = ''
 
     response = await axios.get(`/admin/discount_code`, {
      params: {
        page: params.page,
        size: params.perPage
      }
    })
  
  return {
    data: response.data.data.data,
    allData: response.data.data.data,
    totalPages: response.data.data.count,
    params
    
  }
})

export const getCurrentData = createAsyncThunk('appDiscount/getCurrentData', async (id, { dispatch, getState }) => {
  const  response = await axios.get(`/admin/discount_code/${id}`)
  return {
    currentDiscount: response.data.data,
  }
})
export const ResetCurrentData = createAsyncThunk('appDiscount/getCurrentData', async () => {
  return {
    currentDiscount: null,
  }
})

export const deleteDiscount = createAsyncThunk('appDiscount/deleteDiscount', async (id, { dispatch, getState }) => {
  await axios.delete(`/admin/discount_code/${id}`)

  toast.success("با موفقیت عملیات انجام شد")
  await dispatch(getData(getState().discount.params))
  return id
})

export const appDiscountSlice = createSlice({
  name: 'appDiscount',
  initialState: {
    data: [],
    total: 1,
    params: {},
    currentDiscount: null,
    allData: [],
    isLoading: false,
  
  
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
    }).addCase(getCurrentData.fulfilled, (state, action) => {
      state.currentDiscount = action.payload.currentDiscount
    })
  }
})

export default appDiscountSlice.reducer
