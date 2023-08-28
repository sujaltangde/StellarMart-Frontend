import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEveryProduct } from '../actions/productAction'
import { Loader } from '../components/Loader'
import { PProduct } from '../components/PProduct'
import { useNavigate, useParams } from 'react-router'
import Slider from '@mui/material/Slider';
import { BsCart4 } from 'react-icons/bs'
import ReactPaginate from 'react-paginate';


export const PProducts = () => {

    const dispatch = useDispatch()
    const { allProducts, loading } = useSelector(state => state.products)
    const [keyword, setKeyword] = useState('')
    const [prod, setProd] = useState([])
    const navigate = useNavigate()
    const { searchKey } = useParams();

    const [category, setCategory] = useState("")
    const [price, setPrice] = useState([0, 25000])
    const [ratings, setRatings] = useState(0)
    const [categoryTog, setCategoryTog] = useState("")


    const [pageNumber, setPageNumber] = useState(0);

    const productsPerPage = 8
    const pagesVisited = pageNumber * productsPerPage





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



    const SearchHandler = () => {

        const newData = allProducts.filter((item) => {
            return item.name.toLowerCase().includes(keyword.toLowerCase())
        });
        if (newData.length === 0) {

        }
        if (keyword === '') {
            setProd(allProducts);
        } else {
            setProd(newData);
        }
        setKeyword("")
    }



    const filter = () => {
        const fil = {
            category,
            price,
            ratings
        }

        const filteredArr = allProducts.filter((item) => (
            item.category === category && item.rating >= ratings && (item.price >= price[0] && item.price <= price[1])
        ))


        setProd(filteredArr)
        setPageNumber(0); // Reset page number to 0 after applying the filter
        // Update the pageCount based on the length of the filtered products array
        const filteredPageCount = Math.ceil(filteredArr.length / productsPerPage);
        setPageCount(filteredPageCount);


    }



    const clearFil = () => {
        navigate("/products");
        SearchHandler()

        setCategory("")
        setPrice([0, 25000])
        setRatings("")
        setCategoryTog("")

    }


    const displayProducts = prod.slice(pagesVisited, pagesVisited + productsPerPage)

    const pageCount = Math.ceil(prod.length / productsPerPage)

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }


    return (
        <>

            <div className="min-h-screen pt-14">
                {
                    loading ? <>
                        <Loader />
                    </> : <>
                        {
                            allProducts.length !== 0 ?
                                <>

                                    <div>
                                        <div className='flex justify-center items-center pt-4'>
                                            <div className='md:w-[30vw] w-[70vw]  flex  rounded '>

                                                <input onKeyPress={(e) => e.key === 'Enter' ? SearchHandler() : null} value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder='Search for Products' className='px-2 bg-gray-100  py-2 outline-none placeholder:font-extrabold w-full rounded-l border border-gray-400 ' type="text" />

                                                <button onClick={SearchHandler} className='bg-blue-600 hover:bg-blue-400 rounded rounded-l-none cursor-pointer  px-4 text-white'>Search</button>
                                            </div>


                                        </div>


                                    </div>

                                    <div className='pb-12 pt-8 pl-6 pr-6'>


                                        <div className='text-2xl pb-4 flex flex-col justify-center items-center '>

                                            <span className='border md:pt-0  flex justify-center items-center border-gray-500 pb-1 border-x-0 border-t-0 px-12' >
                                                <BsCart4 /> Products</span>



                                        </div>


                                        <div className={`grid ${prod.length === 0 ? "grid-cols-1" : "grid-cols-2 md:grid-cols-4" }  pb-14  md:gap-6 gap-4 md:pl-52 justify-items-end`}>


                                            {
                                                prod.length !== 0 ?
                                                    <>
                                                        {

                                                            displayProducts.map((product, i) => {
                                                                return (
                                                                    <PProduct key={i} product={product} />
                                                                )
                                                            })


                                                        }
                                                    </> : 
                                                    <div className='flex justify-center text-center py-16 w-full items-center text-2xl'>
                                                        Unfortunately, we couldn't find any products that match your current preferences.
                                                    </div>


                                            }

                                        </div>


                                    </div>

                                </> : <p>No Products</p>

                        }
                        <div className='w-44 pl-8 absolute md:top-48 md:flex md:flex-col hidden '>
                            <p className='text-lg font-medium'>Price Range</p>
                            <Slider
                                value={price}
                                onChange={(e, newPrice) => {
                                    setPrice(newPrice)
                                }}
                                valueLabelDisplay="auto"
                                aria-labelledby='range-slider'
                                min={0}
                                max={25000}

                            />

                            <p className='text-lg font-medium pt-3'>Categories</p>
                            <div className="list-none">
                                {
                                    categories.map((category) => (
                                        <li className={`${categoryTog === category ? "text-red-600" : ""} hover:text-red-600  font-normal cursor-pointer `} key={category}

                                            onClick={() => {
                                                setCategory(category);
                                                setCategoryTog(category);
                                            }
                                            }
                                        > {category} </li>
                                    ))
                                }
                            </div>

                            <div>
                                <p className='text-lg font-medium pt-3'>Ratings Above</p>
                                <Slider
                                    value={ratings}
                                    onChange={(e, newRating) => {
                                        setRatings(newRating);
                                    }}
                                    aria-labelledby="continuous-slider"
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={5}

                                />
                            </div>
                            <div className='pt-3'>
                                <button onClick={filter} className='text-left py-1  px-3 text-white font-semibold rounded hover:bg-orange-400 bg-orange-500' >Apply Filter</button>
                            </div>
                            <div className='pt-3 pb-12 '>
                                <button onClick={clearFil} className='text-left py-1  px-3 text-white font-semibold rounded hover:bg-orange-400 bg-orange-500' >Remove Filter</button>
                            </div>
                        </div>

                        {/* filter for mobile devices */}
                        <div className='md:hidden flex flex-col pl-8 left-4  pb-8'>

                            <p className='text-lg font-medium'>Price Range</p>
                            <div className='w-52 pl-8  md:hidden md:flex-col flex '>
                                <Slider
                                    value={price}
                                    onChange={(e, newPrice) => {
                                        setPrice(newPrice)
                                    }}
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
                                        <li className={`${categoryTog === category ? "text-red-600" : ""}  hover:text-red-600 font-normal cursor-pointer `} key={category}

                                            onClick={() => {
                                                setCategory(category);
                                                setCategoryTog(category);
                                            }}> {category} </li>
                                    ))
                                }
                            </div>

                            <p className='text-lg font-medium pt-3'>Ratings Above</p>
                            <div className="w-52 pl-8  md:hidden md:flex-col flex ">

                                <Slider
                                    value={ratings}
                                    onChange={(e, newRating) => {
                                        setRatings(newRating);
                                    }}
                                    aria-labelledby="continuous-slider"
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={5}

                                />

                            </div>
                            <div className='pt-6'>
                                <button onClick={filter} className='text-left py-1  px-3 text-white font-semibold rounded hover:bg-orange-400 bg-orange-500' >Apply Filter</button>
                            </div>
                            <div className='pt-6'>
                                <button onClick={clearFil} className='text-left py-1  px-3 text-white font-semibold rounded hover:bg-orange-400 bg-orange-500' >Remove Filter</button>
                            </div>
                        </div>


                        <div className='flex justify-center items-center py-12'>

                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCount}
                                onPageChange={changePage}

                                containerClassName=' paginationBtn  '
                                
                                previousLinkClassName=''
                                nextLinkClassName=''
                                disabledClassName=''
                                activeLinkClassName='hover'
                            />
                        </div>


                    </>
                }




            </div>



        </>
    )
}