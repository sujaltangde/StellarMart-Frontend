import React, { useState } from 'react'
import { CartCard } from '../components/CartCard'
import { useDispatch, useSelector } from 'react-redux'
import { removeAllItemsFromCart, addItemsToCart } from '../actions/cartAction'
import { Link, useNavigate } from 'react-router-dom'
import { MetaData } from '../components/MetaData'
import { toast } from 'react-toastify'

export const Cart = () => {

    const dispatch = useDispatch()

    const { cartItems } = useSelector((state) => state.cart)
    const { isLogin } = useSelector((state) => state.user)

    const navigate = useNavigate() ;

    const grossTotal = () => {
        let sum = 0
        cartItems.forEach((i) => {
            sum += i.quantity * i.price
        })
        return sum ;
    }

    const increaseQuantity = (id, quantity, stock) => {
       const newQuantity = quantity + 1 ;
       if(stock <= quantity){
        return;
       }
       dispatch(addItemsToCart(id,newQuantity))
    };

    const decreaseQuantity = (id, quantity, stock) => {
        const newQuantity = quantity - 1 ;
        if (1 >= quantity) return;
        if(stock <= quantity){
         return;
        }
        dispatch(addItemsToCart(id,newQuantity))
    };


    const handleCheckOut = () => {
        if(isLogin === false){
            navigate("/auth")
            toast.info("Please log in to proceed with checkout.")
        }
       else{
        navigate("/order/shipping") ;
       }
    }

    return (


        <>
            <MetaData title={"My Cart"} />
            <div className='min-h-screen pt-14 '>

                
                {



                    cartItems.length !== 0 ?

                        (
                            <><div className='w-full bg-blue-600 text-white grid grid-cols-3  text-center py-2 font-medium'>
                            <div className=''>Product</div>
                            <div>Quantity</div>
                            <div>Subtotal</div>
                        </div>
                                <div className='grid grid-cols-1 pb-16 pt-3 gap-3'>
                                    {cartItems.map((item, i) => (
                                        <div key={i} className='gap-2 py-2 grid grid-cols-3 justify-items-end md:justify-items-center md:px-0 px-4 '>
                                            <CartCard item={item} />
                                            <div className=''>
                                                <div className=" justify-center pt-10 items-center">

                                                    <div className=''>
                                                        <button className='px-2  font-bold text-lg md:text-xl bg-black text-white' onClick={()=>decreaseQuantity(item.product,item.quantity,item.stock)}>-</button>
                                                        <input readOnly type="number" className='text-center outline-none font-bold md:w-14 w-10 cursor-default ' value={item.quantity} />
                                                        <button className='px-2  font-bold text-lg md:text-xl bg-black text-white' onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
                                                    </div>

                                                </div>

                                            </div>
                                            <div className='flex justify-center  pt-10 font-medium text-xl'>₹{item.quantity * item.price}</div>
                                        </div>
                                    ))}
                                    <div className='flex justify-end pb-8 pr-44'>


                                        <span className='border md:w-1/3 text-right pt-2 text-xl pb-6 font-medium border-blue-400 border-b-0 border-x-0'>
                                            Gross Total: ₹{grossTotal()}
                                        </span>

                                    </div>
                                    <div className=' flex justify-around '>
                                        <button className='bg-red-600 text-white py-1 font-medium px-8 rounded' onClick={() => dispatch(removeAllItemsFromCart())}>Remove All</button>


                                        <button onClick={()=>handleCheckOut()} className='bg-blue-600 text-white py-1 font-medium px-8 rounded' >Check Out</button>

                                        
                                    </div>


                                </div>

                            </>

                        )




                        : (<div className='text-center flex flex-col justify-center items-center pt-16 font-medium md:text-3xl text-2xl'>Your cart is currently empty.
                            <img src="/images/emptyCart.svg" className=' w-56 md:w-64 md:h-64 h-56 ' alt="" />
                            <div className='pt-6'>
                            <Link to="/products" className='text-white px-8 text-lg py-2 rounded hover:bg-gray-700 bg-gray-800  ' >Shop Now</Link>
                            </div>
                        </div>)

                }
            </div >






        </ >
    )
}
