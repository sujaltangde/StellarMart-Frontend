import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import { LiaRupeeSignSolid } from 'react-icons/lia'
import { Rating } from '@mui/material';


export const PProduct = ({ product }) => {
    return (
        <>


            <Link to={`/product/${product._id}`} className='border p-3 shadow-md shadow-gray-300 hover:shadow-gray-500  hover:-translate-y-2 rounded' >
                <div className='flex flex-col gap-5'>
                    <div className='md:px-6 md:py-4'>
                        <img src={product.images[0].url} alt={product.name} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='md:text-xl text-lg'>{product.name}</div>
                        <div className='flex flex-wrap justify-start items-center'> <Rating value={product.rating} size="medium" readOnly /> <span className='text-sm font-sans'>({product.numOfReviews} Reviews) </span> </div>
                        <div className='flex justify-start items-center text-lg text-orange-600 font-bold'>
                            <span><LiaRupeeSignSolid /></span>
                            <span>{product.price}</span>
                        </div>
                    </div>

                </div>

            </Link>



        </>
    )
}
