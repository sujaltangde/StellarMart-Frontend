import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { saveShipInfo } from '../actions/cartAction';
import { useNavigate } from 'react-router';
import { MetaData } from '../components/MetaData';
import { Country, State } from 'country-state-city'
import { AiOutlineHome, AiOutlinePhone } from 'react-icons/ai'
import { BiSolidCity, BiWorld } from 'react-icons/bi'
import { TbMapPinCode } from 'react-icons/tb'
import { SlLocationPin } from 'react-icons/sl'
import { CheckoutSteps } from '../components/CheckoutSteps'
import { toast } from 'react-toastify';

export const Shipping = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLogin } = useSelector(state => state.user);
    const { cartItems, shippingInfo } = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city)
    const [state, setState] = useState(shippingInfo.state)
    const [country, setCountry] = useState(shippingInfo.country)
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)


    useEffect(() => {
        if (isLogin === false) {
            navigate("/auth")
        }
    }, [])


    const shippingSubmit = (e) => {
        e.preventDefault()

        if (phoneNo.length < 10 || phoneNo.length > 10) {
            toast.error("Please enter a 10-digit phone number.");
            return;
        }
        dispatch(saveShipInfo({ address, city, state, country, pinCode, phoneNo }))
        navigate("/order/confirm")
    }



    return (
        <>
            <MetaData title="Shipping Details" />


            <div className='min-h-screen pt-14 pb-14'>
                <div>
                    <div className="pt-3"><CheckoutSteps activeStep={0} /></div>

                    <form encType='multiport/form-data' onSubmit={shippingSubmit}>
                        <div className=' w-full flex flex-col md:px-0 px-5 justify-center items-center pt-8 '>
                            <div className=' md:w-1/3  w-full bg-white rounded-md shadow-md shadow-gray-400  ' >
                                <p className='text-2xl text-center py-4 font-medium'>Shipping Details</p>
                                <div className='px-8 flex flex-col gap-5 py-3 pb-10'>





                                    <div className='relative px-3 rounded border border-gray-500 py-1 flex justify-around items-center'>
                                        <AiOutlineHome className='text-gray-500' size={26} />
                                        <input
                                            type="text"
                                            placeholder='Address'
                                            required
                                            value={address}
                                            className=' w-full pl-4 outline-none py-1 pr-4'
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>
                                    <div className='relative px-3 rounded border border-gray-500 py-1 flex justify-around items-center'>
                                        <BiSolidCity className='text-gray-500' size={26} />
                                        <input
                                            type="text"
                                            placeholder='City'
                                            value={city}
                                            required
                                            className=' w-full pl-4 outline-none py-1 pr-4'
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </div>
                                    <div className='relative px-3 rounded border border-gray-500 py-1 flex justify-around items-center'>
                                        <TbMapPinCode className='text-gray-500' size={26} />
                                        <input
                                            type="text"
                                            placeholder='Pin Code'
                                            required
                                            value={pinCode}
                                            className=' w-full pl-4 outline-none py-1 pr-4'
                                            onChange={(e) => setPinCode(e.target.value)}
                                        />
                                    </div>
                                    <div className='relative px-3 rounded border border-gray-500 py-1 flex justify-around items-center'>
                                        <AiOutlinePhone className='text-gray-500' size={26} />
                                        <input
                                            type="text"
                                            placeholder='Phone Number'
                                            required
                                            value={phoneNo}
                                            className=' w-full pl-4 outline-none py-1 pr-4'
                                            onChange={(e) => setPhoneNo(e.target.value)}
                                        />
                                    </div>
                                    <div className='relative px-3 rounded border border-gray-500 py-1 flex justify-around items-center'>
                                        <BiWorld className='text-gray-500' size={26} />
                                        <select value={country} required onChange={(e) => setCountry(e.target.value)} className='w-full  bg-white pl-4 outline-none py-1 pr-4'>
                                            <option className='bg-white ' value="">Country</option>
                                            {
                                                Country &&
                                                Country.getAllCountries().map((item) => (
                                                    <option className='bg-white ' key={item.isoCode} value={item.isoCode}>
                                                        {item.name}
                                                    </option>

                                                ))
                                            }
                                        </select>
                                    </div>
                                    {country && (<div className='relative px-3 rounded border border-gray-500 py-1 flex justify-around items-center'>
                                        <SlLocationPin className='text-gray-500' size={26} />
                                        <select value={state} required onChange={(e) => setState(e.target.value)} className='w-full bg-white pl-4 outline-none py-1 pr-4'>
                                            <option className='bg-white' value="">State</option>
                                            {State &&
                                                State.getStatesOfCountry(country).map((item) => (
                                                    <option key={item.isoCode} value={item.isoCode}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>)}




                                    <div>
                                        <input className='w-full cursor-pointer bg-blue-600 py-2 text-white font-medium rounded hover:bg-blue-500 ' disabled={state ? false : true} type="submit" value="Continue" />
                                    </div>

                                </div>

                            </div>
                        </div>


                    </form>

                </div>

            </div>


        </>
    )
}
