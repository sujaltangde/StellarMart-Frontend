import React from 'react'
import {Link} from 'react-router-dom'
import {BsInstagram} from 'react-icons/bs'
import {FiYoutube, FiTwitter} from 'react-icons/fi'
import {AiOutlineFacebook} from 'react-icons/ai'



export const Footer = () => {
  return (
   <>
                <div className='bg-gray-800'>
                        
                        <div className='text-white py-8 md:flex hidden md:flex-row flex-col items-center text-left  justify-between md:px-12 px-3'>

                                    <div className='w-1/3'> 
                                        <p className='font-bold'>DOWNLOAD OUR APP</p>
                                        <p className='text-sm'>Download app for Android and IOS mobile phones</p>
                                        <img src="/images/footer.png" className='h-24 pt-2' alt="" />
                                    </div>
                                    <div className='w-1/3 flex flex-col justify-center items-center '>
                                            <p className='text-5xl pb-1 font-bold '>StellarMart</p>
                                            <p className=''>High Quality is our first priority</p>
                                            <p className='pt-5 text-gray-200'>Copyright 2023 &copy; StellarMart</p>

                                    </div>
                                    <div className='w-1/3 flex flex-col md:pl-20 justify-center items-center'>
                                        <p className='underline font-bold text-lg'>Follow Us</p>
                                             <div className='flex  pt-3 gap-3'>
                                             <Link to="/"> <BsInstagram       size={20}  /> </Link>
                                             <Link to="/"> <FiYoutube         size={20}  /> </Link>
                                             <Link to="/"> <AiOutlineFacebook size={20}  /> </Link>
                                             <Link to="/"> <FiTwitter         size={20}  /> </Link>

                                             </div>
                                        <p className='pt-7'>Designed and developed by <Link to="https://sujal-tangde.netlify.app/" className='underline' >Sujal Tangde</Link> </p>
                                    </div>

                        </div>
                        <div className='text-white py-8 md:hidden flex md:flex-row flex-col items-center text-left  justify-between md:px-12 px-3'>

                                    <div className='w-full'> 
                                        <p className='font-bold'>DOWNLOAD OUR APP</p>
                                        <p className='text-sm'>Download app for Android and IOS mobile phones</p>
                                        <img src="/images/footer.png" className='h-24' alt="" />
                                    </div>
                                    
                                    <div className='w-full flex pl-5 flex-row py-5'>
                                        
                                             <div className='flex  pt-3 gap-7'>
                                             <Link to="/"> <BsInstagram       size={24}  /> </Link>
                                             <Link to="/"> <FiYoutube         size={24}  /> </Link>
                                             <Link to="/"> <AiOutlineFacebook size={24}  /> </Link>
                                             <Link to="/"> <FiTwitter         size={24}  /> </Link>

                                             </div>
                                       
                                    </div>

                                    <div className='w-full flex flex-col justify-center items-center '>
                                            <p className='text-4xl pb-1 pt-3 font-bold '>StellarMart</p>
                                            <p className=''>High Quality is our first priority</p>
                                            <p className='pt-8 text-gray-200'>Copyright 2023 &copy; StellarMart</p>
                                            <p className='pt-1 text-gray-200'>Designed and developed by <Link to="https://sujal-tangde.netlify.app/" className='underline' >Sujal Tangde</Link> </p>

                                    </div>

                        </div>

                </div>

   </>
  )
}
