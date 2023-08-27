import React from 'react'
import { MetaData } from '../components/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { CheckoutSteps } from '../components/CheckoutSteps'
import { useNavigate } from 'react-router'
import { LiaRupeeSignSolid } from 'react-icons/lia'


export const Confirm = () => {

    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { me } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}`

    const subTotal = () => {
        let sum = 0
        cartItems.forEach((i) => {
            sum += i.quantity * i.price
        })
        return sum ;
    }   

    const subtotal = subTotal() ;
    const shippingCharges = 20 ;
    const tax = (subtotal * 20)/100 ;
    const totalPrice = subtotal + shippingCharges + tax ; 

    const processToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax ,
            totalPrice,
        }
        sessionStorage.setItem("orderInfo",JSON.stringify(data)) ;

        navigate("/order/payment")
    } 

    

    return (
        <>
            <div className="min-h-screen pt-14">
                <MetaData title="Confirm Order" />
                <div className="pt-3"><CheckoutSteps activeStep={1} /></div>

                <div className='flex md:flex-row flex-col md:pt-12 pt-6 pb-8 md:px-8 px-2 md:gap-0 gap-3'>
                    <div className='md:w-2/3 px-3 '>
                        <div>
                            <p className='text-2xl font-medium'>Shipping Info</p>
                            <div className='md:pl-14 pt-4'>
                                <div className='grid grid-cols-2 md:w-2/5'>
                                    <span className='font-semibold'>Name:</span>
                                    <span>{me.name}</span>
                                </div>
                                <div className='grid grid-cols-2 md:w-2/5'>
                                    <span className='font-semibold'>Phone:</span>
                                    <span>{shippingInfo.phoneNo}</span>
                                </div>
                                <div className='grid grid-cols-2 md:w-2/5'>
                                    <span className='font-semibold'>Address:</span>
                                    <span>{address}</span>
                                </div>

                            </div>
                            <div className='pt-8'>
                                <p className='text-2xl font-medium'>Your Cart Items:</p>
                                {
                                    cartItems.map((item, index) => (
                                        <div key={index} className='flex justify-between md:pr-4 md:pl-20 pt-3'>
                                            <div className='flex gap-6 w-2/3 items-center '>
                                                <img src={item.image} className='md:w-2/12 w-3/12' alt="" />
                                                <p>{item.name}</p>
                                            </div>
                                            <div className='w-2/3 text-right flex justify-end items-end'>
                                           
                                           
    {item.quantity}  x  <span className='flex justify-center items-center'>₹{item.price}</span>  
                                           
                                           
                                           
                                            <span className='font-semibold pl-1'>= ₹{item.quantity * item.price}</span>



                                            
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>


                    </div>

                    <div className='md:w-1/3  px-4 py-3 '>
                        <p className='text-center pb-2 text-2xl border font-medium border-x-0 border-t-0 border-gray-500'>Order Summary</p>
                        <div className='pt-4 border border-x-0 border-t-0 border-gray-500 pb-4'>
                            <div className='flex justify-between'>
                                <span className='font-semibold'>Subtotal:</span>
                                <span>₹ {subtotal}</span>
                            </div>
                            <div className='flex justify-between pt-3'>
                                <span className='font-semibold'>Shipping Charges:</span>
                                <span>₹ {shippingCharges}</span>
                            </div>
                            <div className='flex justify-between pt-3'>
                                <span className='font-semibold'>GST:</span>
                                <span>₹ {tax}</span>
                            </div>

                        </div>
                        <div>
                            <div className='flex justify-between pt-3'>
                                <span className='font-semibold'>Total:</span>
                                <span>₹ { totalPrice }</span>
                            </div>

                        </div>
                        <div className=' pt-4'>
                            <button className='w-full cursor-pointer bg-blue-600 py-2 text-white font-medium rounded hover:bg-blue-500 ' onClick={()=>processToPayment()}  >Proceed To Payment</button>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}
