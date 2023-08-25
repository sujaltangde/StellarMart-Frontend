import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {MdAccountBox} from 'react-icons/md'
import {FaBars} from 'react-icons/fa'
import {RxCross1} from 'react-icons/rx'
import { useSelector } from "react-redux"
import {MenuB} from './Menu'



export const Navbar = () => {

 
  
  const {isLogin} = useSelector(state => state.user)
  const {cartItems} = useSelector(state => state.cart)

  

  const [toggle, setToggle ] = useState(true)

  const logOut = () => {
       localStorage.removeItem('token')
       dispatch(setIsLoginFalse())
       dispatch(setLogoutNotifyTrue())
       navigate('/')
  }

  

  return (
    <>
      <div className='fixed min-w-full z-10 '>
      
          <div className='bg-blue-950 text-white flex md:gap-12 gap-6 py-3 justify-between md:px-6 px-2'> 
            <Link to="/" className='md:text-2xl flex gap-1 text-lg font-bold  '>
              <img  src="/favicon.png" className='md:h-8 h-7 ' alt="" />
              StellarMart</Link>
            <ul className='gap-12 pr-8 md:flex hidden   text-xl justify-center items-center'>
              <Link className='hover:text-orange-400' to="/">Home</Link>
              <Link className='hover:text-orange-400' to="/products" >Products</Link>
              <Link className='hover:text-orange-400' to="/contact" >Contact</Link>
              <Link className='hover:text-orange-400'  to="/about" >About</Link>
              
            </ul>
            <ul className='flex md:gap-8 gap-8 md:pr-9 pr-1 justify-center items-center'>
              <Link to="/cart" className={`hover:text-orange-400 ${cartItems.length !== 0? "text-green-400" : ''} `} > <AiOutlineShoppingCart size={25} /> </Link>
              
              
              {isLogin?  
              
            <MenuB/>
             
             : 
              
              <Link to="/auth" className='hover:text-orange-400' > <MdAccountBox size={25} /> </Link> }

               
              
            </ul>

          
            
            <div className='md:hidden mr-1 flex justify-center cursor-pointer items-center border px-1 rounded-md '>
              {
                toggle? <FaBars onClick={()=>setToggle(!toggle)}  size={23} />
                :
                <RxCross1 onClick={()=>setToggle(!toggle)}   size={23} />
              }
            </div>
          </div>

      </div>
      <div className={`${toggle? "hidden" : "flex"  } md:hidden fixed top-12 nav `} >
            <div className='bg-blue-950 w-screen h-screen bg-opacity-95 z-20 pt-16'>
            <ul className='gap-20  flex flex-col text-white   text-2xl justify-center items-center'>
              <Link onClick={()=>setToggle(!toggle)}  className='hover:text-orange-400 z-20' to="/">Home</Link>
              <Link onClick={()=>setToggle(!toggle)}  className='hover:text-orange-400 z-20' to="products" >Products</Link>
              <Link onClick={()=>setToggle(!toggle)}  className='hover:text-orange-400 z-20' to="/contact" >Contact</Link>
              <Link onClick={()=>setToggle(!toggle)}  className='hover:text-orange-400 z-20'  to="/about" >About</Link>
              
            </ul>
                
            </div>
      </div>
    
    </>
  )
}
