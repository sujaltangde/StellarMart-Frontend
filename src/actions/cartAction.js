import { addToCart, removeFromCart, removeAllItems, saveShippingInfo } from '../slices/CartSlice'
import axios from 'axios'
import { toast } from 'react-toastify'


export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {

    const { data } = await axios.get(`https://stellarmart-b.onrender.com/api/v1/products/${id}`)

    dispatch(addToCart({
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.stock,
        quantity
    }))

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    
}


export const removeItemsFromCart = (id) => async (dispatch) => {
    const items = JSON.parse(localStorage.getItem('cartItems'))
    const modifiedItems = items.filter((item) => (
        item.product !== id
    ))

    localStorage.setItem('cartItems', JSON.stringify(modifiedItems))
    dispatch(removeFromCart());
    toast.success("Item removed")
}

export const removeAllItemsFromCart = () => async (dispatch) => {    
    localStorage.removeItem('cartItems') ;
    dispatch(removeAllItems())
    toast.success("All items removed")
}

export const removeAllWhenLogout = () => async (dispatch) => {    
    localStorage.removeItem('cartItems') ;
    localStorage.removeItem('shippingInfo') ;
    dispatch(removeAllItems())
}

export const saveShipInfo = (data) => async (dispatch) => {
    dispatch(saveShippingInfo(data)) ;

    localStorage.setItem('shippingInfo', JSON.stringify(data))

}