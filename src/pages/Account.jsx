import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Loader } from '../components/Loader'
import { Link } from 'react-router-dom'
import {MetaData} from '../components/MetaData'



export const Account = () => {

  const { me, isLogin, loading } = useSelector((state) => state.user) ; 



  const convertDateFormat = (inputDate) => {
    const parts = inputDate.split('-');
    if (parts.length !== 3) {
      return "Invalid date format";
    }

    const day = parts[2];
    const month = parts[1];
    const year = parts[0];

    return `${day}-${month}-${year}`;
  }


  return (
    <>

      <div className='pt-14 min-h-screen '>
        <MetaData title="Profile" />
        {

          loading && !isLogin ? <Loader /> :

            <>
              {me === null ? null :

                <div>
                  <p className='pt-6 text-3xl font-medium pl-8'>My Profile</p>
                  <div className='flex md:justify-between pb-14 justify-center md:flex-row flex-col pt-2  w-full '>

                    <div className=' md:w-1/2 w-full flex flex-col justify-center items-center'>
                       <div className='md:pb-12 pb-6 pt-2'>
                        <img src={me.avtar[0].url} className='h-72 w-72 rounded-full shadow-md shadow-gray-700' />
                      </div> 
                      
                      <Link to="/updateProfile" className='hover:bg-blue-700 bg-blue-800 text-white font-medium px-16 py-2'>
                        Edit Profile
                      </Link>
                    </div>
                    <div className=' md:w-1/2 w-full pl-4 flex flex-col pt-12 gap-6'>

                      <div>
                        <p className='font-normal text-2xl'>Full Name</p>
                        <p className='text-gray-700 '>{me.name}</p>
                      </div>
                      <div>
                        <p className='font-normal text-2xl'>Email</p>
                        <p className='text-gray-700 '>{me.email}</p>
                      </div>
                      <div>
                        <p className='font-normal text-2xl'>Joined On</p>
                        <p className='text-gray-700 '> {convertDateFormat(me.createdAt.substr(0, 10))}</p>
                      </div>

                      <div className=' flex flex-col gap-3 md:pt-12 pt-2 '>
                        <Link to="/orders" className='hover:bg-gray-700 bg-gray-800 w-1/2 text-white text-center py-2 font-semibold text-sm'>
                          My Orders

                        </Link>
                        <Link to="/updatePassword" className='hover:bg-gray-700 bg-gray-800 w-1/2 text-white text-center py-2 font-semibold text-sm'>
                          Change Password

                        </Link>
                      </div>


                    </div>




                  </div>



                </div>


              }
            </>
        }

      </div>


    </>
  )
}
