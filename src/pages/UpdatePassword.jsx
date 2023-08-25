import React, { useEffect, useState } from 'react'
import { MetaData } from '../components/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../components/Loader'
import { AiOutlineEyeInvisible, AiOutlineLock, AiOutlineEye, AiOutlineUnlock } from 'react-icons/ai'
import { BiKey } from 'react-icons/bi'
import { changePassword } from '../actions/userAction'



export const UpdatePassword = () => {

    const { loading } = useSelector(state => state.user)

    const dispatch = useDispatch();

    const [oldPassword, setOldPass] = useState("");
    const [newPassword, setNewPass] = useState("");
    const [confirmPassword, setConfirmPass] = useState("");

    const [onePassType, setOnePassType] = useState("password")
    const [twoPassType, setTwoPassType] = useState("password")
    const [threePassType, setThreePassType] = useState("password")

    const changePass = (e) => {
        e.preventDefault()

        const changePassData = {
            oldPassword,
            newPassword,
            confirmPassword
        }
        dispatch(changePassword(changePassData))
    }

    return (
        <>
            <MetaData title="Change Password" />
            <div className='pt-14 min-h-screen bg-gray-200'>

                {loading ? <Loader /> : <div className=' w-full flex flex-col md:px-0 px-5 justify-center items-center pt-20 '>

                    <div className=' md:w-1/3  w-full bg-white rounded-md shadow-md shadow-gray-400  ' >
                        <p className='text-2xl text-center py-4 font-medium'>Change Password</p>
                        <div className='px-8 flex flex-col gap-5 py-3 pb-10'>




                            <div className='relative px-3 rounded border border-gray-500 py-1 flex justify-around items-center'>
                                <BiKey className='text-gray-500' size={26} />
                                <input
                                    type={onePassType}
                                    placeholder='Old Password'
                                    required
                                    onChange={(e) => setOldPass(e.target.value)}
                                    className=' w-full pl-4 outline-none py-1 pr-4'
                                />

                                {onePassType === "password" ?
                                    <AiOutlineEyeInvisible onClick={() => setOnePassType("text")} className='text-gray-500 cursor-pointer' size={26} /> :
                                    <AiOutlineEye onClick={() => setOnePassType("password")} className='text-gray-500 cursor-pointer' size={26} />

                                }
                            </div>
                            <div className='relative px-3 rounded border border-gray-500 py-1 flex justify-around items-center'>
                                <AiOutlineUnlock className='text-gray-500' size={26} />
                                <input
                                    type={twoPassType}
                                    placeholder='New Password'
                                    required
                                    onChange={(e) => setNewPass(e.target.value)}
                                    className=' w-full pl-4 outline-none py-1 pr-4'
                                />

                                {twoPassType === "password" ?
                                    <AiOutlineEyeInvisible onClick={() => setTwoPassType("text")} className='text-gray-500 cursor-pointer' size={26} /> :
                                    <AiOutlineEye onClick={() => setTwoPassType("password")} className='text-gray-500 cursor-pointer' size={26} />

                                }
                            </div>
                            <div className='relative px-3 rounded border border-gray-500 py-1 flex justify-around items-center'>
                                <AiOutlineLock className='text-gray-500' size={26} />
                                <input
                                    type={threePassType}
                                    placeholder='Confirm Password'
                                    required
                                    className=' w-full pl-4 outline-none py-1 pr-4'
                                    onChange={(e) => setConfirmPass(e.target.value)}
                                />

                                {threePassType === "password" ?
                                    <AiOutlineEyeInvisible onClick={() => setThreePassType("text")} className='text-gray-500 cursor-pointer' size={26} /> :
                                    <AiOutlineEye onClick={() => setThreePassType("password")} className='text-gray-500 cursor-pointer' size={26} />

                                }
                            </div>




                            <div>
                                {loading ? <div className='w-full cursor-pointer bg-blue-600 py-2 text-white font-medium rounded hover:bg-blue-500 flex justify-center items-center'>
                                    <div role="status">
                                        <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div> :
                                    <button onClick={(e) => changePass(e)} value="Update " className='w-full cursor-pointer bg-blue-600 py-2 text-white font-medium rounded hover:bg-blue-500 '>Change </button>}
                            </div>

                        </div>

                    </div>

                </div>}


            </div>




        </>
    )
}
