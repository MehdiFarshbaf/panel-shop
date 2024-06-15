// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// ** Axios Imports
import toast from "react-hot-toast"
import axios from "axios"

export const getData = createAsyncThunk('appShop/getData', async params => {
  let response = ''
  if (params) {
     response = await axios.get(`/admin/business`, {
      params : {
        skip  : ((params.page - 1) * params.perPage),
        limit : params.perPage,
        ...(params.filters && params.filters.city.value && { city : params.filters.city.value }),
        ...(params.filters && params.filters.is_special.value && { is_special : params.filters.is_special.value }),
        ...(params.filters && params.filters.store_name && { store_name : params.filters.store_name }),
        ...(params.filters && params.filters.last_name && { last_name : params.filters.last_name }),
        ...(params.filters && params.filters.mobile && { mobile : params.filters.mobile }),
        ...(params.filters && params.filters.status.value && { status : params.filters.status.value }) 
      
      }
    })
  } else {
    response = await axios.get(`/admin/business`)
  }
  
  return {
    data: response.data.data.data,
    allData: response.data.data.data,
    totalPages: response.data.data.count,
    params
    
  }
})

export const changeShop = createAsyncThunk('appShop/changeShop', async (id, { dispatch, getState }) => {
  const dataInfo = new FormData()
  dataInfo.append("_method", "put")
  dataInfo.append("store_id", id)
  await axios.post(`/admin/business`, dataInfo)
  toast.success("با موفقیت عملیات انجام شد")
  await dispatch(getData(getState().shop.params))
  return id
})
export const deleteShop = createAsyncThunk('appShop/deleteShop', async (id, { dispatch, getState }) => {
  await axios.delete(`/admin/business/${id}`)
  toast.success("با موفقیت عملیات انجام شد")
  await dispatch(getData(getState().shop.params))
  return id
})

export const appShopSlice = createSlice({
  name: 'appShop',
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

export default appShopSlice.reducer
