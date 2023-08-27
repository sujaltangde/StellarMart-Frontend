import React from 'react'
import { removeItemsFromCart } from '../actions/cartAction'
import { useDispatch } from 'react-redux'


export const CartCard = ({ item }) => {


  const dispatch = useDispatch();

  const RemoveItem = (id) => {

    dispatch(removeItemsFromCart(id))
  }

  return (
    <>
      <div className=' grid md:grid-cols-2  gap-3 '>
        <div className='flex items-center'> 
          <img src={item.image} className='md:h-36 md:w-36 h-28 w-28' alt="" />
        </div>
        <div className='md:pt-4 flex flex-col  gap-1'>
          <p className='text-xl font-serif'>{item.name}</p>
          <p className='font-serif '>Price: ₹ {item.price}</p>
          <span onClick={() => RemoveItem(item.product)} className='text-red-700 font-serifcursor-pointer cursor-pointer hover:text-red-800' >Remove</span>
        </div>

      </div>


    </>
  )
}
