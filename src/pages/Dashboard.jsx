import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { Sidebar } from '../components/Sidebar'
import { BiMenuAltLeft } from 'react-icons/bi'
import { Loader } from '../components/Loader'
import { Doughnut, Line } from 'react-chartjs-2';
import { getAllProductsForAdmin } from '../actions/productAction'
import { getAllOrders } from '../actions/orderAction'
import { getAllUsers } from '../actions/userAction'
import {MetaData} from '../components/MetaData'
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register CategoryScale
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title,
  Tooltip,
  Legend, ArcElement);

export const Dashboard = () => {

  const { me } = useSelector(state => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminProducts } = useSelector(state => state.products)
  const { allOrders } = useSelector(state => state.newOrder)
  const { allUsers } = useSelector(state => state.user)

  const [sideTog, setSideTog] = useState(false)

  let outOfStock = 0 ;

  adminProducts && adminProducts.forEach(item => {
    if(item.stock === 0){
      outOfStock += 1 ;
    }
  });

  useEffect(()=>{
    dispatch(getAllProductsForAdmin())
    dispatch(getAllOrders())
    dispatch(getAllUsers())
},[dispatch])




let totalAmount = 0 ;
allOrders && allOrders.forEach(item => [
  totalAmount += item.totalPrice
])

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49"],
        data: [0, totalAmount]
      }
    ]
  }

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A684", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, adminProducts.length - outOfStock],
      },

    ]
  }


  if (me !== null) {
    if (me.role !== "admin") {
      navigate("/");
      console.log("Hey")
    }
  }

  return (
    <>

      <div className='min-h-screen pt-14'>
      <MetaData title="Dashboard" />

        {me ? <>
          <div className='flex justify-start '>
            <span onClick={() => setSideTog(!sideTog)} className='cursor-pointer z-20 fixed '>
              <BiMenuAltLeft size={44} />
            </span>

            <Sidebar sideTog={sideTog} />

            <div className='w-full'>

              <div className='py-6' >
                <p className='text-center text-2xl'>Dashboard</p>
              </div>
              <div className='flex flex-col text-center font-medium  bg-blue-500 text-white py-2'>
                <p>Total Revenue</p>
                <p>₹ {totalAmount} </p>
              </div>

              <div className='grid md:grid-cols-3 grid-cols-1 text-xl md:gap-0 gap-3 justify-items-center md:px-64 py-6'>

                <div className='bg-red-500 rounded-full font-medium flex justify-center items-center text-white w-40 h-40 '>
                  <div className='flex flex-col justify-center items-center'>
                    <p>Products</p>
                    <p>{adminProducts && adminProducts.length}</p>
                  </div>
                </div>
                <div className='bg-yellow-500 rounded-full font-medium flex justify-center items-center text-white w-40 h-40 '>
                  <div className='flex flex-col justify-center items-center'>
                    <p>Orders</p>
                    <p>{allOrders && allOrders.length}</p>
                  </div>
                </div>
                <div className='bg-gray-700 rounded-full font-medium flex justify-center items-center text-white w-40 h-40 '>
                  <div className='flex flex-col justify-center items-center'>
                    <p>Users</p>
                    <p>{allUsers && allUsers.length}</p>
                  </div>
                </div>

              </div>

              <div className='flex justify-center w-full'>
                <div className='md:mx-auto mx-3 md:w-[70vw] w-full py-5 '>
                  <Line data={lineState} />
                </div>
              </div>

              <div>
                <div className='mx-auto  md:w-[30vw] w-full py-5 '>
                  <Doughnut data={doughnutState} />
                </div>
              </div>


            </div>

          </div>

        </> : <Loader />}
      </div>

    </>
  )
}
