import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import API from "@src/utility/API"
import {handleShowErrorMessage} from "@utils"

const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
    try {
        const {data} = await API.get("/blog")

        return data

    } catch (err) {
        await handleShowErrorMessage(err)
    }
})

const getPost = createAsyncThunk("post/getBlog", async (id) => {
    try {
        const {data} = await API.get(`/blog/${id}`)
        return data
    } catch (err) {
        await handleShowErrorMessage(err)
    }
})

const initialState = {
    loading: false,
    disable: false,
    post: {},
    posts: [],
    total: 0
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllPosts.pending, state => {
            state.loading = true
        })
        builder.addCase(getAllPosts.fulfilled, (state, {payload}) => {
            state.posts = payload.blogs
            state.total = payload.total
            state.loading = false
        })
        builder.addCase(getAllPosts.rejected, state => {
            state.loading = false
        })
        builder.addCase(getPost.pending, state => {
            state.loading = true
        })
        builder.addCase(getPost.fulfilled, (state, {payload}) => {
            state.post = payload.blog
            state.loading = false
        })
        builder.addCase(getPost.rejected, state => {
            state.post = {}
            state.loading = false
        })
    }
})
export default postSlice.reducer
export {getAllPosts, getPost}