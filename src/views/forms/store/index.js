// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// ** Axios Imports
import toast from "react-hot-toast"
import axios from "axios"

export const getData = createAsyncThunk('appForms/getData', async params => {
  let response = ''
  if (params) {
    response = await axios.get(`/Ads/all-forms`, {
      params: {
        page: params.page,
        size: params.perPage,
      }
    })
  } else {
    response = await axios.get(`/Ads/all-forms`)
  }
  return {
    data: response.data.hits,
    allData: response.data.hits,
    totalPages: response.data.total.value,
    params
    
  }
})


export const deleteForms = createAsyncThunk('appForms/deleteForms', async (id, { dispatch, getState }) => {
  await axios.delete(`Ads/forms?id=${id}`)
  toast.success("با موفقیت عملیات انجام شد")
  await dispatch(getData(getState().forms.params))
  return id
})

export const appFormsSlice = createSlice({
  name: 'appForms',
  initialState: {
    data: [],
    total: 1,
    params: {},
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
    })
  }
})

export default appFormsSlice.reducer
