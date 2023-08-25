import { toast } from 'react-toastify';
import {createOrderRequest, createOrderSuccess, createOrderFail, myOrderRequest, myOrderSuccess, myOrderFail, orderDetailsRequest, orderDetailsSuccess, orderDetailsFail, allOrderRequest, allOrderSuccess, allOrderFail,
    updateOrderRequest, updateOrderSuccess, updateOrderFail, deleteOrderRequest, deleteOrderSuccess, deleteOrderFail} from '../slices/OrderSlice'
import axios from 'axios'

// Create New Order
export const createOrder = (order) => async (dispatch, getState) => {
    try{
        dispatch(createOrderRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const {data} = await axios.post("https://stellarmart-b.onrender.com/api/v1/order/new",order,config)

        dispatch(createOrderSuccess(data.order)) ;
        toast.success("Payment successful! Thank you for your purchase.") ;

    }catch(err){
        dispatch(createOrderFail(err.response.data.message)) ;
        toast.error(err.response.data.message)
    }
}

// My Orders
export const myOrders = () => async (dispatch) => {
    try{    
        dispatch(myOrderRequest())
        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const {data} = await axios.get("https://stellarmart-b.onrender.com/api/v1/orders/me",config)

        dispatch(myOrderSuccess(data.orders))

    }catch(err){
        dispatch(myOrderFail(err.response.data.message))
        toast.error(err.response.data.message)
    }
}

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
    try{
        dispatch(orderDetailsRequest())
        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const {data} = await axios.get(`https://stellarmart-b.onrender.com/api/v1/order/${id}`,config) ;

        dispatch(orderDetailsSuccess(data.order)) ;
        
    }catch(err){
        dispatch(orderDetailsFail(err.response.data.message))
        toast.error(err.response.data.message)
    }
}

// Get all orders --admin
export const getAllOrders = () => async (dispatch) => {
    try{
        dispatch(allOrderRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const {data} = await axios.get("https://stellarmart-b.onrender.com/api/v1/admin/orders",config) ;

        dispatch(allOrderSuccess(data.orders))

        
    }catch(err){
        dispatch(allOrderFail(err.response.data.message)) ;
    }
}

// Update Order -- admin
export const updateOrder = (id, order) => async (dispatch) => {
    try{
        dispatch(updateOrderRequest()) ;

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const {data} = await axios.put(`https://stellarmart-b.onrender.com/api/v1/admin/order/${id}`,order,config) ;

        dispatch(updateOrderSuccess(data)) ;
        dispatch(getOrderDetails(id)) ;
        
        toast.success("Order Updated !") ;

    }catch(err){
        dispatch(updateOrderFail(err.response.data.message))
        toast.error(err.response.data.message)
    }
}

// Delete Order -- admin
export const deleteOrder = (id) => async (dispatch) => {
    try{
        dispatch(deleteOrderRequest()) ;

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const {data} = await axios.delete(`https://stellarmart-b.onrender.com/api/v1/admin/order/${id}`,config) ;

        dispatch(deleteOrderSuccess(data)) ;
        dispatch(getAllOrders()) ;
        toast.success("Order Deleted !") ;

    }catch(err){
        dispatch(deleteOrderFail(err.response.data.message))
        toast.error(err.response.data.message)
    }
}