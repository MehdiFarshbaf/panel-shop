// ** Redux Imports
import { createAsyncThunk , createSlice } from "@reduxjs/toolkit"
// ** Axios Imports
import toast from "react-hot-toast"
import axios from "axios"

export const getData = createAsyncThunk("appWithdraw/getData", async params => {
   const response = await axios.get(`/admin/withdraw-requests`, {
      params : {
         skip  : ((params.page - 1) * params.perPage),
         limit : params.perPage,
         ...(params.filters && params.filters.first_name.length > 1 && { first_name : params.filters.first_name }),
         ...(params.filters && params.filters.last_name.length > 1 && { last_name : params.filters.last_name }),
         ...(params.filters && params.filters.amount > 1 && { amount : params.filters.amount }),
         ...(params.filters && params.filters.status.value && { status : params.filters.status.value }),
   }
   })
   
   return {
      data       : response.data.data.data,
      allData    : response.data.data.data,
      totalPages : response.data.data.count,
      params
      
   }
})



export const rejectWithdraw = createAsyncThunk("appWithdraw/rejectWithdraw", async (id, {
   dispatch,
   getState
}) => {
   const dataInfo = new FormData()
   dataInfo.append("status",'reject')
   await axios.post(`/admin/withdraw-requests/${ id }`,dataInfo)
   toast.success("با موفقیت عملیات انجام شد")
   await dispatch(getData(getState().withdraw.params))
   return id
})

export const getCurrentId = createAsyncThunk('appDiscount/getCurrentId', async (id, { dispatch, getState }) => {
   return {
      currentId: id,
   }
})

export const appWithdrawSlice = createSlice({
   name          : "appWithdraw",
   initialState  : {
      data    : [],
      total   : 1,
      params  : {},
      allData : [],
      currentId:null,
      isLoading: false,
      
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
      }).addCase(getCurrentId.fulfilled, (state, action) => {
         state.currentId = action.payload.currentId
       
      })
   }
})

export default appWithdrawSlice.reducer
