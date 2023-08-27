import React from 'react'
import { PProduct } from './PProduct'
import { Loader } from './Loader'
import { Link } from 'react-router-dom'

export const Products = ({ products, loading }) => {


  return (
    <div id="products" className='min-h-screen md:px-20 px-4 pt-4 pb-12 md:pb-20 md:pt-8'>

      {loading ? <Loader /> :
        <>
          <div className=' flex justify-center '>
            <span className=' md:text-3xl border-b border-gray-600 px-12 font-medium  text-gray-700 text-2xl pb-2 text-center'>Featured Products</span>
          </div>

          <div className='grid md:grid-cols-4 grid-cols-2 md:gap-8 gap-4 pt-8'>


            {
              products && products.map((product, i) => (
                <PProduct key={i} product={product} />
              ))
            }

          </div>
          <div className='pt-12 flex justify-center items-center'>
            <Link to="/products"><button className='bg-blue-500 hover:bg-blue-600 px-8 py-2 md:text-xl text-lg font-medium text-white' >View More</button></Link>
          </div>
        </>
      }

    </div>
  )
}
