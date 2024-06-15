// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// ** Axios Imports
import toast from "react-hot-toast"
import axios from "axios"

export const getAllData = createAsyncThunk('appAdmin/getAllData', async () => {
  const response = ''
  return response.data
})


export const getData = createAsyncThunk('appAdmin/getData', async params => {
  const response = await axios.get(`/admins`, {
    params: {
      skip: ((params.page - 1) * params.perPage),
  
      limit: params.perPage,
      ...(params.filters && params.filters.city.length > 1 && { city: params.filters.city }),
      ...(params.filters && params.filters.first_name.length > 1 && { first_name: params.filters.first_name }),
      ...(params.filters && params.filters.last_name.length > 1 && { last_name: params.filters.last_name }),
      ...(params.filters && params.filters.mobile.length > 1 && { mobile: params.filters.mobile })
    }
  })
  return {
    data: response.data,
    allData: response.data,
    totalPages: response.total,
    params
    
  }
})

export const getDataRoles = createAsyncThunk('appAdmins/getDataRoles', async params => {
  const response = await axios.get(`/admin/roles`)
  
  return {
    dataRoles: response.data,
    allDataRoles: response.data,
    totalPagesRoles: response.data.total,
    paramsRoles:params
  }
})
export const getDataPermissions = createAsyncThunk('appAdmins/getDataPermissions', async params => {
  const response = await axios.get(`/admin/permission`)
  return {
    dataPermissions: response.data
  }
})
export const deleteAdminsRoles = createAsyncThunk('appAdmins/deleteAdminsRoles', async (id, { dispatch, getState }) => {
  await axios.delete(`/admin/role/${id}`)
  toast.success("با موفقیت عملیات انجام شد")
  await dispatch(getDataRoles(getState().admin.params))
  return id
})
export const deleteAdmin = createAsyncThunk('appAdmin/deleteAdmin', async (id, { dispatch, getState }) => {
  await axios.delete(`/admin/${id}`)
  toast.success("با موفقیت عملیات انجام شد")
  await dispatch(getData(getState().admin.params))
  return id
})

export const appAdminSlice = createSlice({
  name: 'appAdmin',
  initialState: {
    data: [],
    isLoading: false,
    total: 1,
    params: {},
    allData: [],
    dataRoles: [],
    totalRoles: 1,
    paramsRoles: {},
    allDataRoles: [],
    dataPermissions: []
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
    }).addCase(getDataRoles.pending, (state) => {
      state.isLoading = true
    }).addCase(getDataRoles.fulfilled, (state, action) => {
      state.dataRoles = action.payload.dataRoles
      state.allDataRoles = action.payload.allDataRoles
      state.totalRoles = action.payload.totalPagesRoles
      state.paramsRoles = action.payload.paramsRoles
      state.isLoading = false
    }).addCase(getDataRoles.rejected, (state) => {
      state.isLoading = false
    }).addCase(getDataPermissions.fulfilled, (state, action) => {
      state.dataPermissions = action.payload.dataPermissions
  
    })
  }
})

export default appAdminSlice.reducer
