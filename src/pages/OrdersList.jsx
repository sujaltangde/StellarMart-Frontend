import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders, updateOrder, deleteOrder } from '../actions/orderAction'
import { Loader } from '../components/Loader'
import { OrderAdminTable } from '../components/OrderAdminTable'
import { BiMenuAltLeft } from 'react-icons/bi'
import { Sidebar } from '../components/Sidebar'
import { MetaData } from '../components/MetaData'

export const OrdersList = () => {

  const dispatch = useDispatch()
  const { allOrders, loading } = useSelector(state => state.newOrder)
  const [sideTog, setSideTog] = useState(false)

  useEffect(() => {
    dispatch(getAllOrders())
  }, [])



  return (
    <>
      <MetaData title="All Orders" />
      <div className='min-h-screen pt-14'>
        <span onClick={() => setSideTog(!sideTog)} className='cursor-pointer z-20 fixed '>
          <BiMenuAltLeft size={44} />
        </span>
        <Sidebar sideTog={sideTog} />
        {
          loading || allOrders.length === 0 ? <Loader /> :

            <>
              <div className='text-center py-4 text-2xl font-medium'>
                <p>All Orders</p>
              </div>
              <OrderAdminTable orders={allOrders} />

            </>

        }

      </div>
    </>
  )
}
