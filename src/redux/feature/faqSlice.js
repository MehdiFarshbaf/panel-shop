import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import API from "@src/utility/API"
import {handleShowErrorMessage} from "@utils"

const getAllFAQ = createAsyncThunk("faq/getAllFAQ", async () => {
    try {
        const {data} = await API.get("/faq")

        return data

    } catch (err) {
        await handleShowErrorMessage(err)
    }
})

const getFAQ = createAsyncThunk("faq/getFAQ", async (id) => {
    try {
        const {data} = await API.get(`/faq/${id}`)
        return data
    } catch (err) {
        await handleShowErrorMessage(err)
    }
})

const initialState = {
    loading: false,
    disable: false,
    faq: {},
    faqs: [],
    total: 0
}

const FAQSlice = createSlice({
    name: 'faq',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllFAQ.pending, state => {
            state.loading = true
        })
        builder.addCase(getAllFAQ.fulfilled, (state, {payload}) => {
            state.faqs = payload.faqs
            state.total = payload.total
            state.loading = false
        })
        builder.addCase(getAllFAQ.rejected, state => {
            state.loading = false
        })
        builder.addCase(getFAQ.pending, state => {
            state.loading = true
        })
        builder.addCase(getFAQ.fulfilled, (state, {payload}) => {
            state.faq = payload.faq
            state.loading = false
        })
        builder.addCase(getFAQ.rejected, state => {
            state.faq = {}
            state.loading = false
        })
    }
})
export default FAQSlice.reducer
export {getAllFAQ, getFAQ}