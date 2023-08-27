import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEveryProduct } from '../actions/productAction'
import { Loader } from '../components/Loader'
import { PProduct } from '../components/PProduct'
import { useNavigate, useParams } from 'react-router'
import Slider from '@mui/material/Slider';

export const PProducts = () => {

    const dispatch = useDispatch()
    const { allProducts, loading } = useSelector(state => state.products)
    const [keyword, setKeyword] = useState('')
    const [prod, setProd] = useState([])
    const navigate = useNavigate()
    const { searchKey } = useParams() ;
    const [category, setCategory] = useState("")
    
  const categories = [
    "Electronics",
    "Mens",
    "Womens",
    "Books",
    "Footwear",
    "Home",
    "Sports"
  ]

    useEffect(() => {
        dispatch(getEveryProduct());

    }, [])

    useEffect(() => {
        let newData = [];
        if (searchKey) {
            newData = allProducts.filter((item) => {
                return item.name.toLowerCase().includes(searchKey.toLowerCase())
            });
        }
        if (searchKey) {
            setProd(newData)
        } else {
            setProd(allProducts)
        }


    }, [allProducts, searchKey])

    

    console.log(allProducts)

    const SearchHandler = () => {

        const newData = allProducts.filter((item) => {
            return item.name.toLowerCase().includes(keyword.toLowerCase())
        });

        if (keyword === '') {
            setProd(allProducts);
        } else {
            setProd(newData);
        }
        setKeyword("")
    }
    console.log("prod", prod)






    return (
        <>

            <div className="min-h-screen pt-14">
                {
                    loading || prod.length === 0 ? <>
                        <Loader />
                    </> : <>
                        {
                            allProducts.length !== 0 ?
                                <>

                                    <div>
                                        <div className='flex justify-center items-center pt-6'>
                                            <div className='md:w-[30vw] w-[70vw]  flex  rounded '>

                                                <input onKeyPress={(e) => e.key === 'Enter' ? SearchHandler() : null} value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder='Search for Products' className='px-2 bg-gray-100  py-2 outline-none placeholder:font-extrabold w-full rounded-l border border-gray-400 ' type="text" />

                                                <button onClick={SearchHandler} className='bg-blue-600 hover:bg-blue-400 rounded rounded-l-none cursor-pointer  px-4 text-white'>Search</button>
                                            </div>


                                        </div>
                                        <div>
                                            <button onClick={() => {
                                                navigate("/pproducts");
                                                SearchHandler()
                                            }} >Clear Search</button>
                                        </div>

                                    </div>

                                    <div className='py-12 pl-6 pr-6'>

                                        <div className='grid md:grid-cols-4 pb-14 grid-cols-2 md:gap-6 gap-4 md:pl-52 justify-items-end'>


                                            {
                                                prod && prod.map((product, i) => {
                                                    return (
                                                        <PProduct key={i} product={product} />
                                                    )
                                                })
                                            }

                                        </div>


                                    </div>

                                </> : <p>No Products</p>

                                        }
                        <div className='w-44 pl-8 absolute md:top-52 md:flex md:flex-col hidden '>
                            <p className='text-lg font-medium'>Price Range</p>
                            <Slider
                                // value={price}
                                // onChange={priceHandler}
                                valueLabelDisplay="auto"
                                aria-labelledby='range-slider'
                                min={0}
                                max={25000}

                            />

                            <p className='text-lg font-medium pt-3'>Categories</p>
                            <div className="list-none">
                                {
                                    categories.map((category) => (
                                        <li className='hover:text-red-600 font-normal cursor-pointer ' key={category} onClick={() => setCategory(category)}> {category} </li>
                                    ))
                                }
                            </div>

                            <div>
                                <p className='text-lg font-medium pt-3'>Ratings Above</p>
                                <Slider
                                    // value={ratings}
                                    // onChange={(e, newRating) => {
                                    //     setRatings(newRating);
                                    // }}
                                    aria-labelledby="continuous-slider"
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={5}

                                />
                            </div>
                            <div className='pt-6'>
                                <button className='text-left py-1  px-3 text-white font-semibold rounded hover:bg-orange-400 bg-orange-500' >Remove Filters</button>
                            </div>
                        </div>

                        {/* filter for mobile devices */}
                        <div className='md:hidden flex flex-col pl-8 left-4  pb-8'>

                            <p className='text-lg font-medium'>Price Range</p>
                            <div className='w-52 pl-8  md:hidden md:flex-col flex '>
                                <Slider
                                    // value={price}
                                    // onChange={priceHandler}
                                    valueLabelDisplay="auto"
                                    aria-labelledby='range-slider'
                                    min={0}
                                    max={25000}

                                />
                            </div>

                            <p className='text-lg font-medium pt-3'>Categories</p>
                            <div className="list-none">
                                {
                                    categories.map((category) => (
                                        <li className='hover:text-red-600 font-normal cursor-pointer ' key={category} onClick={() => setCategory(category)}> {category} </li>
                                    ))
                                }
                            </div>

                            <p className='text-lg font-medium pt-3'>Ratings Above</p>
                            <div className="w-52 pl-8  md:hidden md:flex-col flex ">

                                <Slider
                                    // value={ratings}
                                    // onChange={(e, newRating) => {
                                    //     setRatings(newRating);
                                    // }}
                                    aria-labelledby="continuous-slider"
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={5}

                                />

                            </div>
                            <div className='pt-6'>
                                <button className='text-left py-1  px-3 text-white font-semibold rounded hover:bg-orange-400 bg-orange-500' >Remove Filters</button>
                            </div>
                        </div>
                        

                    </>
                }

            </div>



        </>
    )
}