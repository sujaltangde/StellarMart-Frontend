import React, { useState, useEffect, useRef } from 'react'
import { CheckoutSteps } from '../components/CheckoutSteps'
import { useSelector, useDispatch } from 'react-redux'
import { MetaData } from '../components/MetaData'
import { toast } from 'react-toastify'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'
import {BsCalendarEvent} from 'react-icons/bs'
import {AiOutlineCreditCard} from 'react-icons/ai'
import {MdOutlineVpnKey} from 'react-icons/md'
import { useNavigate } from 'react-router'
import {createOrder} from '../actions/orderAction'
import { removeAllItems } from '../slices/CartSlice'

export const Payment = () => {

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    const {shippingInfo, cartItems} = useSelector(state=>state.cart)
    const {me} = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const stripe = useStripe() ;
    const elements = useElements()
    const payBtn = useRef(null) ;

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    }

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemPrice: orderInfo.shippingCharges,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.totalPrice,
        totalPrice: orderInfo.totalPrice
    }
    
    const submitHandler = async (e) => {
        e.preventDefault()

        payBtn.current.disabled = true
        
        try{
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')} `
                }
            }
            
            const {data} = await axios.post("https://stellarmart-b.onrender.com/api/v1/payment/process",paymentData , config)
            const client_secret = data.client_secret ;

            if(!stripe || !elements) return ;
            const result = await stripe.confirmCardPayment(client_secret,{
                payment_method:{
                    card: elements.getElement(CardNumberElement),
                    billing_details:{
                        name: me.name,
                        email: me.email,
                        address:{
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        }
                    }
                }
            })

            if(result.error){
                payBtn.current.disabled = false ;
                // toast.error(result.error.message);
            }else{
                if(result.paymentIntent.status === "succeeded"){
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,                        
                    }
                    dispatch(createOrder(order))
                    navigate("/success")
                    localStorage.removeItem('cartItems') ;
                    dispatch(removeAllItems())
                }else{
                    toast.error("There's some issue while processing payment")
                }
            }


        }catch(err){
            payBtn.current.disabled = true
            toast.error(err.response.data.message)
        }
    }

    return (
        <>
            <MetaData title="Payment" />
            <div className='min-h-screen pt-14'>
                <div className='pt-3'>
                    <CheckoutSteps activeStep={2} />
                </div>
                <div className="grid md:justify-items-center px-6  pt-6">
                    <form onSubmit={submitHandler} className="px-8  md:w-1/3 border flex flex-col gap-5 py-3 pb-10 bg-white rounded-md shadow-md shadow-gray-400 "  action="">

                       
                            <p className='text-2xl text-center py-2 font-medium'>Card Info</p>
                            

                            <div className='relative rounded pl-3 border border-gray-500 py-1 flex justify-around items-center'>
                            <AiOutlineCreditCard  className="text-gray-500" />
                                <CardNumberElement
                                    

                                    className=' w-full pl-4 outline-none py-1 pr-4 '
                                />
                            </div>
                            <div className='relative rounded pl-3 border border-gray-500 py-1 flex justify-around items-center'>
                           <BsCalendarEvent className='text-gray-500' />
                                <CardExpiryElement
                                    

                                    className=' w-full pl-4 outline-none py-1 pr-4 '
                                />
                            </div>
                            <div className='relative rounded pl-3 border border-gray-500 py-1 flex justify-around items-center'>
                            <MdOutlineVpnKey className='text-gray-500' />
                                <CardCvcElement
                                    

                                    className=' w-full pl-4 outline-none py-1 pr-4 '
                                />
                            </div>
                       
                        
                        

                        <input type="submit" 
                            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                            ref = {payBtn}
                            className='w-full cursor-pointer bg-blue-600 py-2 text-white font-medium rounded hover:bg-blue-500'
                        />

                    </form>
                </div>

                

            </div>


        </>
    )
}
