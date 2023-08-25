import React from 'react'
import {BiLoaderAlt} from 'react-icons/bi'

export const Loader = () => {
  return (
    <div className='pt-16 min-h-screen flex justify-center '>

       <img src="/images/pulse.svg" alt="" className=' pb-72' width={"150px"} />
     
                      {/* <BiLoaderAlt size={80}   className='animate-spin text-blue-800 font-bold' /> */}
     
    </div>
  )
}
