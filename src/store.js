import {configureStore} from '@reduxjs/toolkit'
import numReducer from './slices/NumSlice.js'
import productReducer from './slices/ProductSlice.js'
import productDetailReducer from './slices/ProductDetailSlice.js'
import useReducer from './slices/UserSlice.js'
import cartReducer from './slices/CartSlice.js'
import newOrderReducer from './slices/OrderSlice.js'

const store = configureStore({
    reducer:{
        num: numReducer,
        products: productReducer,
        productDetails: productDetailReducer,
        user: useReducer,
        cart: cartReducer,
        newOrder: newOrderReducer
    } 
})

export default store