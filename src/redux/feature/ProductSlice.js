import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import API from "@src/utility/API"
import {handleShowErrorMessage} from "@utils"
import {appConfig} from "@configs/config"

const getAllProducts = createAsyncThunk("product/getAllProducts", async () => {
    try {
        const {data} = await API.get("/product")
        return data

    } catch (err) {
        await handleShowErrorMessage(err)
    }
})

const getProduct = createAsyncThunk("product/getProduct", async (id) => {
    try {
        const {data} = await API.get(`/product/${id}`)
        const type = await appConfig.sendingType.find(item => item.value === data.product.sendingType)
        data.product.sendingType = type
        return data
    } catch (err) {
        await handleShowErrorMessage(err)
    }
})

const initialState = {
    loading: false,
    disable: false,
    product: {},
    products: [],
    total: 0
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllProducts.pending, state => {
            state.loading = true
        })
        builder.addCase(getAllProducts.fulfilled, (state, {payload}) => {
            state.products = payload.products
            state.total = payload.total
            state.loading = false
        })
        builder.addCase(getAllProducts.rejected, state => {
            state.loading = false
        })
        builder.addCase(getProduct.pending, state => {
            state.loading = true
        })
        builder.addCase(getProduct.fulfilled, (state, {payload}) => {
            state.product = payload.product
            state.loading = false
        })
        builder.addCase(getProduct.rejected, state => {
            state.product = {}
            state.loading = false
        })
    }
})
export default productSlice.reducer
export {getAllProducts, getProduct}