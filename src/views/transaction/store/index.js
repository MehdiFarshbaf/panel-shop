// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// ** Axios Imports
import toast from "react-hot-toast"
import axios from "axios"
import moment from "moment-jalaali"


export const getData = createAsyncThunk("appTransaction/getData", async params => {
   const response = await axios.get(`/admin/transaction`, {
      params : {
         skip  : ((params.page - 1) * params.perPage),
         limit : params.perPage,
         ...(params.filters && params.filters.first_name.length > 1 && { first_name : params.filters.first_name }),
         ...(params.filters && params.filters.last_name.length > 1 && { last_name : params.filters.last_name }),
         ...(params.filters && params.filters.price > 1 && { price : params.filters.price }),
         ...(params.filters && params.filters.status.value && { status : params.filters.status.value }),
         ...(params.filters && params.filters.date.length >= 1 && { from_created_at:
                 moment(params.filters.date[0]?.unix * 1000).format("YYYY-MM-DD ") }),
         ...(params.filters && params.filters.date.length >= 1 && { to_created_at:
                 moment(params.filters.date[1]?.unix * 1000).format("YYYY-MM-DD ") }),
      }
   })
   
   return {
      data       : response.data.data.data,
      allData    : response.data.data.data,
      totalPages : response.data.data.count,
      params
      
   }
})


export const deleteTransaction = createAsyncThunk("appTransaction/deleteTransaction", async (id, {
   dispatch,
   getState
}) => {
   await axios.delete(`/admin/transaction/${ id }`)
   toast.success("با موفقیت عملیات انجام شد")
   await dispatch(getData(getState().transaction.params))
   return id
})

export const appTransactionSlice = createSlice({
   name          : "appTransaction",
   initialState  : {
      data    : [],
      total   : 1,
      params  : {},
      allData : [],
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
      })
   }
})

export default appTransactionSlice.reducer
