import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsForAdmin } from '../actions/productAction'
import { Loader } from '../components/Loader'
import { ProductAdminTable } from './ProductAdminTable'
import { BiMenuAltLeft } from 'react-icons/bi'
import { Sidebar } from './Sidebar'
import { MetaData } from './MetaData'


export const ProductList = () => {


  const dispatch = useDispatch()
  const { adminProducts, loading } = useSelector(state => state.products)
  const [sideTog, setSideTog] = useState(false)

  useEffect(() => {
    dispatch(getAllProductsForAdmin())
  }, [])

  return (
    <>
      <MetaData title="All Products" />
      <div className='min-h-screen pt-14'>
        <span onClick={() => setSideTog(!sideTog)} className='cursor-pointer text-orange-500 z-20 fixed '>
          <BiMenuAltLeft size={44} />
        </span>
        <Sidebar sideTog={sideTog} />
        {
          loading || adminProducts.length === 0 ? <Loader /> :

            <>
              <div className='text-center py-4 text-2xl font-medium'>
                <p>All Products</p>
              </div>
              <ProductAdminTable products={adminProducts} />

            </>

        }

      </div>

    </>
  )
}
