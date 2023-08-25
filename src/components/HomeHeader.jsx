import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { Link as LinkSr } from 'react-scroll'
import  Search  from './Search'

export const HomeHeader = () => {
    return (
        <div>
            <div className='pt-16 min-h-screen bg-gradient-to-br from-blue-800 to-blue-950  '>

                <div className='flex justify-center items-center flex-col text-center md:px-0 px-4 '>
                    <p className='text-white font-bold text-2xl pt-16'>Welcome to StellarMart</p>
                    <p className='text-white font-bold md:text-5xl pb-8 text-4xl pt-16'>FIND AMAZING PRODUCTS BELOW</p>

                    <Search  />
                 
                    <LinkSr spy={true} smooth={true} offset={-30} duration={300} to="products">
                        <button className='md:mt-4 mt-4 font-bold text-xl border md:px-12 px-8 py-2 bg-blue-600 text-white hover:bg-blue-800  z-10  '>
                            <IoIosArrowDown className='animate-bounce z-10 ' />
                        </button>
                    </LinkSr>

                </div>
            </div>

        </div>
    )
}
