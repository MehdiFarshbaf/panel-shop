// ** Redux Imports
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import {appConfig} from "../configs/config"

export const getBookmarks = createAsyncThunk('layout/getBookmarks', async () => {
    const response = await axios.get('/api/bookmarks/data')
    return {
        data: response.data.suggestions,
        bookmarks: response.data.bookmarks
    }
})

export const updateBookmarked = createAsyncThunk('layout/updateBookmarked', async id => {
    await axios.post('/api/bookmarks/update', {id})
    return id
})

export const layoutSlice = createSlice({
    name: 'layout',
    initialState: {
        query: '',
        bookmarks: [],
        suggestions: [],
        languages: appConfig.languages,
        // languages: [],
        currencies: appConfig.currencies,
        showBanner: appConfig.showBanner
    },
    reducers: {
        handleSearchQuery: (state, action) => {
            state.query = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getBookmarks.fulfilled, (state, action) => {
                state.suggestions = action.payload.data
                state.bookmarks = action.payload.bookmarks
            })
            .addCase(updateBookmarked.fulfilled, (state, action) => {
                let objectToUpdate

                state.suggestions.find(item => {
                    if (item.id === action.payload) {
                        item.isBookmarked = !item.isBookmarked
                        objectToUpdate = item
                    }
                })

                const bookmarkIndex = state.bookmarks.findIndex(x => x.id === action.payload)

                if (bookmarkIndex === -1) {
                    state.bookmarks.push(objectToUpdate)
                } else {
                    state.bookmarks.splice(bookmarkIndex, 1)
                }
            })
    }
})

export const {handleSearchQuery} = layoutSlice.actions

export default layoutSlice.reducer
