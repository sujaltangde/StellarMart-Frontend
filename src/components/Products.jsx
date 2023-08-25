import React from 'react'
import { Product } from './Product'
import { Loader } from './Loader'

export const Products = ({ products, loading }) => {


  return (
    <div id="products" className='min-h-screen md:px-20 px-4 pt-4 pb-12 md:pb-20 md:pt-8'>

      { loading?  <Loader/>  :
        <>
          <p className='underline md:text-3xl text-gray-600 text-2xl pb-6 text-center'>Featured Products</p>

          <div className='grid md:grid-cols-4 grid-cols-2 md:gap-14 gap-2'>


            {
              products && products.map((product, i) => (
                <Product key={i} product={product} />
              ))
            }

          </div>
        </>
      }

    </div>
  )
}
