// ** Redux Imports
import { createAsyncThunk , createSlice } from "@reduxjs/toolkit"

// ** Axios Imports
import axios from "axios"

export const getData = createAsyncThunk('appNotifications/getData', async params => {

  const response = await axios.get(`/support/contact`, {
    params : {
      skip  : ((params.page - 1) * params.perPage),
      limit : params.perPage,
      ...(params.filters && params.filters.type.length > 1 && { type : params.filters.type }),
      ...(params.filters && params.filters.email.length > 1 && { email : params.filters.email }),
      
    }
  })
  

  return {
    data: response.data.hits,
    allData: response.data.hits,
    totalPages: response.data.meta.totalrows,
    params
  
  }
})

export const getArtists = createAsyncThunk('appNotifications/getArtists', async () => {
  const response = await axios.get('/artist')
  
  return {
    artists: response.data.data.data
  }
})
export const getUsers = createAsyncThunk('appNotifications/getUsers', async () => {
  const response = await axios.get('/admin/user')
  return {
    users: response.data.data.data
  }
})

export const deleteNotifications = createAsyncThunk('appArtists/deleteNotifications', async (id, { dispatch, getState }) => {
  await axios.delete(`/admin/notification/${ id }`)
  await dispatch(getData(getState().notifications.params))
  return id
})
export const appNotificationsSlice = createSlice({
  name: 'appNotifications',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    artists: [],
    users: [],
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
           .addCase(getArtists.fulfilled, (state, action) => {
             state.artists = action.payload.artists
           })
           .addCase(getUsers.fulfilled, (state, action) => {
             state.users = action.payload.users
           })
    
  }
})

export default appNotificationsSlice.reducer
