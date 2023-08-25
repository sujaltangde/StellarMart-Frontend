import React from 'react'
import {removeItemsFromCart} from '../actions/cartAction'
import { useDispatch } from 'react-redux'


export const CartCard = ({item}) => {


    const dispatch = useDispatch() ;

    const RemoveItem = (id)=>{

        dispatch(removeItemsFromCart(id))
    }

  return (
    <>
            <div className=' grid md:grid-cols-2  gap-3 '>
                       <div>
                       <img src={item.image} className='md:h-36 md:w-36 h-28 w-28' alt="" />
                       </div>
                        <div className='md:pt-4 flex flex-col  gap-1'>
                        <p className='text-xl'>{item.name}</p>
                        <p>Price: ₹ {item.price}</p>
                        <span onClick={()=>RemoveItem(item.product)} className='text-red-700 cursor-pointer' >Remove</span>
                        </div>

            </div>
    
    
    </>
  )
}
