import React, { useEffect } from 'react'
import { MetaData } from '../components/MetaData'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../components/Loader'
import { myOrders as MyOrders } from '../actions/orderAction'
import { OrderTable } from '../components/OrderTable'



export const Orders = () => {


  const dispatch = useDispatch()
  const { loading, myOrders } = useSelector(state => state.newOrder)
  const { me } = useSelector(state => state.user)





  useEffect(() => {
    dispatch(MyOrders())
  }, [dispatch])


  return (
    <>

      <MetaData title="My Orders" />
      <div className='min-h-screen pt-14'>
        {(loading || me === null) ?
          (<Loader />) :

          (

            <>


              <div>
                <p className="text-center py-2 pt-3 text-white font-medium text-xl bg-gray-800">{me.name}'s Orders</p>
                <div>


                  {

                    myOrders.length !== 0 ?
                      <OrderTable orders={myOrders} /> :

                      <div className='text-center pt-12 flex flex-col justify-center items-center'>
                        <img src="/images/noOrder.png" className='md:w-44 md:h-44 w-36 h-36' alt="" />
                        <div className='md:px-0 px-3'>
                          <p className='md:text-2xl text-xl  font-medium text-gray-800'>You don't have any orders yet. Why not buy one?</p>
                        </div>
                        <div className='pt-3'>
                          <Link to="/products">
                            <button className='bg-gray-800 hover:bg-gray-700 font-medium rounded text-white px-8 py-1'>Shop Now</button></Link>
                        </div>
                      </div>

                  }




                </div>

              </div>





            </>

          )}
      </div >

    </>
  )
}
