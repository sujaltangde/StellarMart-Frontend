import React, { useState, useEffect } from 'react'
import { createNewProduct } from '../actions/productAction'
import { BiMenuAltLeft } from 'react-icons/bi'
import { Sidebar } from '../components/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { LiaRupeeSignSolid } from 'react-icons/lia'
import { FaProductHunt } from 'react-icons/fa'
import { MdOutlineDescription, MdOutlineCategory, MdOutlineStorage } from 'react-icons/md'
import {RxCross2} from 'react-icons/rx'
import { MetaData } from '../components/MetaData'



export const NewProduct = () => {

    const [sideTog, setSideTog] = useState(false)
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.products)

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);


    const categories = [
        "Electronics",
        "Mens",
        "Womens",
        "Books",
        "Footwear",
        "Home",
        "Sports"
    ]
 
    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", desc);
        myForm.set("category", category);
        myForm.set("stock", stock);

        images.forEach((image) => {
            myForm.append("images", image);
        });

        dispatch(createNewProduct(myForm));
        
        setName("")
        setPrice("")
        setDesc("")
        setImages([])
        setImagesPreview([])
        setStock(0)
        setCategory("")
    }


    const createProductImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([])
        setImagesPreview([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result])
                }
            }

            reader.readAsDataURL(file);
        })

    }




    return (
        <>
            <MetaData title="Create Product" />
            <div className='min-h-screen pt-14 bg-gray-200 pb-16'>
                <span onClick={() => setSideTog(!sideTog)} className='cursor-pointer text-orange-500 z-20 fixed '>
                    <BiMenuAltLeft size={44} />
                </span>
                <Sidebar sideTog={sideTog} />

                <div className='flex items-center w-full pt-10 justify-center md:px-0 px-5'>

                    <form action="" onSubmit={createProductSubmitHandler} className=" flex  flex-col  gap-5 px-8 bg-white rounded-md shadow-md shadow-gray-400 md:w-1/3 w-full pt-6 pb-6">
                        <div>
                            <p className='text-2xl text-center  font-medium'>Create New Product</p>
                        </div>
                        <div className='relative rounded pl-3 border border-gray-500 py-1 flex justify-around items-center'>
                            <FaProductHunt className='text-gray-500 ' size={26} />
                            <input
                                type="text"
                                placeholder='Product Name'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className=' w-full pl-4 outline-none py-1 pr-4'
                            />
                        </div>
                        <div className='relative pl-3 rounded border border-gray-500 py-1 flex justify-around items-center'>
                            <LiaRupeeSignSolid className='text-gray-500 ' size={26} />
                            <input
                                type="text"
                                placeholder='Price'
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className=' w-full pl-4 outline-none py-1 pr-4'
                            />
                        </div>
                        <div className='relative pl-3 rounded border border-gray-500 py-1 flex justify-around items-center pr-3'>
                            <MdOutlineCategory className='text-gray-500 ' size={26} />
                            <select required value={category}
                                onChange={(e) => setCategory(e.target.value)} name="" className='w-full pl-4 outline-none py-1 pr-6 bg-white cursor-pointer ' id="">
                                <option value="not selected">Select Category</option>
                                {categories.map((item)=>(
                                    <option key={item} className='cursor-pointer' value={item}>{item}</option>
                                ))}
                                    
                                
                            </select>
                        </div>
                        <div className='relative pl-3 rounded border border-gray-500 py-1 flex justify-around items-center'>
                            <MdOutlineStorage className='text-gray-500 ' size={26} />
                            <input
                                type="number"
                                placeholder='Stock'
                                required
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                className=' w-full pl-4 outline-none py-1 pr-4'
                            />
                        </div>

                        <div className='relative px-3 rounded border border-gray-500 py-1 flex justify-around items-center'>
                            <MdOutlineDescription className='text-gray-500' size={26} />
                            <textarea
                                type="text"
                                placeholder='Product Description'
                                required
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                className=' w-full pl-4 outline-none py-1 pr-4'
                                cols={5}
                                rows={2}
                            />
                        </div>


                        <div>
                            <div className='relative pl-3 rounded hover:bg-gray-100 border border-gray-500 py-1 flex justify-around flex-col items-center'>

                                <label htmlFor="fileinput" className='cursor-pointer w-full text-gray-500 flex justify-center text-center items-center gap-4 py-1'>
                                
                                    {imagesPreview.length === 0 ? "Select Images" : `${imagesPreview.length} images selected`}
                                </label>
                                <input type="file"
                                    name="avatar"
                                    accept="image/*"
                                    multiple
                                    required
                                    onChange={createProductImageChange}
                                    className='hidden w-full pl-4 outline-none py-1 pr-4  ' id='fileinput' />
                            </div>
                            <div className='flex flex-wrap justify-start items-start gap-2 pt-1'>
                                {imagesPreview.map((image, index) => (
                                    <div className='flex'>
                                    <span onClick={()=>{ 
                                       const newImagesPre = imagesPreview.filter((img)=> img !== image)                                       
                                        setImagesPreview(newImagesPre)
                                        setImages(newImagesPre)
                                    }} className='text-red-700 font-bold cursor-pointer' > <RxCross2/> </span>
                                    <img key={index} src={image} className='w-14 h-14' alt="Product Preview" />
                                    </div>
                                ))}
                            </div>
                        </div>


                        {loading ? <div className='w-full cursor-pointer bg-blue-600 py-2 text-white font-medium rounded hover:bg-blue-500 flex justify-center items-center'>
                            <div role="status">
                                <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div> : <input type="submit" value="Create Product" className='w-full cursor-pointer bg-blue-600 py-2 text-white font-medium rounded hover:bg-blue-500 ' />}



                    </form>

                </div>


            </div>



        </>
    )
}
