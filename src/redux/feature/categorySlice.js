import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import API from "@src/utility/API"
import {handleShowErrorMessage} from "@utils"

const getAllCategories = createAsyncThunk("category/getAllCategories", async () => {
    try {
        const {data} = await API.get("/category")
        return data
    } catch (err) {
        await handleShowErrorMessage(err)
    }
})
const getCategory = createAsyncThunk("category/getCategory", async (id) => {
    try {
        const {data} = await API.get(`/category/${id}`)
        return data
    } catch (err) {
        await handleShowErrorMessage(err)
    }
})

const createCategory = createAsyncThunk("category/create", async (categoryData) => {
    try {

    } catch (err) {
        await handleShowErrorMessage(err)
    }
})

const initialState = {
    loading: false,
    disable:false,
    category: {},
    categories: [],
    total: 0
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllCategories.pending, state => {
            state.loading = true
        })
        builder.addCase(getAllCategories.fulfilled, (state, {payload}) => {
            state.categories = payload.categories
            state.total = payload.total
            state.loading = false
        })
        builder.addCase(getAllCategories.rejected, state => {
            state.loading = false
        })
        builder.addCase(getCategory.pending, state => {
            state.loading = true
        })
        builder.addCase(getCategory.fulfilled, (state, {payload}) => {
            state.category = payload.category
            state.loading = false
        })
        builder.addCase(getCategory.rejected, state => {
            state.category = {}
            state.loading = false
        })
        builder.addCase(createCategory.pending, state => {
            state.disable = true
        })
        builder.addCase(createCategory.rejected,state => {
            state.disable = flase
        })
    }
})

export default categorySlice.reducer
export {getAllCategories, getCategory}