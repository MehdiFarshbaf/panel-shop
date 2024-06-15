// ** Redux Imports
import { createAsyncThunk , createSlice } from "@reduxjs/toolkit"
// ** Axios Imports
import axios from "axios"

export const getData = createAsyncThunk("appReport/getData", async params => {
   const response = await axios.get(`/admin/reports`, {
      params : {
         skip  : ((params.page - 1) * params.perPage),
         limit : params.perPage,
         ...(params.filters && params.filters.reason.length > 1 && { reason : params.filters.reason }),
         ...(params.filters && params.filters.allChat && { chat_id : params.filters.allChat.value }),
         
      }
   })
   
   return {
      data       : response.data.data.data,
      allData    : response.data.data.data,
      totalPages : response.data.data.count,
      params
      
   }
})



export const appReportSlice = createSlice({
   name          : "appReport",
   initialState  : {
      data    : [],
      total   : 1,
      params  : {},
      isLoading: false,
      allData : []
   },
   reducers      : {},
   extraReducers : builder => {
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

export default appReportSlice.reducer
