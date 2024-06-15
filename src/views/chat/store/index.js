// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// ** Axios Imports
import axios from "axios"


export const getData = createAsyncThunk("appChat/getData", async params => {
   const response = await axios.get(`/chat/admin-messages`, {
      params : {
         skip  : ((params.page - 1) * params.perPage),
         limit : params.perPage,
         ...(params.filters && params.filters.text.length > 1 && { text : params.filters.text }),
         ...(params.filters && params.filters.allChat && { chat_id : params.filters.allChat.value }),
         ...(params.filters && params.filters.sender && { sender : params.filters.sender.value })
      }
   })

   return {
      data       : response.data.data.data,
      allData    : response.data.data.data,
      totalPages : response.data.data.count,
      params
      
   }
})

export const getUsers = createAsyncThunk('appChat/getUsersChat', async () => {
   const response = await axios.get('/admin/user')
   return {
      user: response.data.data.data
   }
})

export const getAllChat = createAsyncThunk('appChat/getAllChat', async () => {
   const response = await axios.get('/chat')
   
   return {
      allChat:response.data.hits.length >= 1 ? response.data.hits[0] : response.data.hits
   }
})

export const appChatSlice = createSlice({
   name          : "appChat",
   initialState  : {
      data    : [],
      total   : 1,
      params  : {},
      allData : [],
      allChat : [],
      user:[]
   },
   reducers      : {},
   extraReducers : builder => {
      builder.addCase(getData.fulfilled, (state, action) => {
         state.data = action.payload.data
         state.allData = action.payload.allData
         state.total = action.payload.totalPages
         state.params = action.payload.params
      })
             .addCase(getUsers.fulfilled, (state, action) => {
                state.user = action.payload.user
             })
               .addCase(getAllChat.fulfilled, (state, action) => {
                state.allChat = action.payload.allChat
             })
          
   }
})

export default appChatSlice.reducer
