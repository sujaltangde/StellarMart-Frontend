import axios from 'axios'
import { allProductRequest, allProductSuccess, allProductFail, clearErrors, newReviewRequest, newReviewSuccess, newReviewFail, adminProductRequest, adminProductSuccess, adminProductFail, newProductRequest, newProductSuccess, newProductFail, deleteProductRequest, deleteProductSuccess, deleteProductFail, updateProductRequest, updateProductSuccess,updateProductFail, deleteReviewRequest, deleteReviewSuccess, deleteReviewFail, allReviewRequest, allReviewSuccess, allReviewFail, getCategoryProductsRequest, getCategoryProductsSuccess, getCategoryProductsFail, everyProductRequest, everyProductSuccess, everyProductFail } from '../slices/ProductSlice.js'
import { productDetailsRequest, productDetailsSuccess, productDetailsFail, } from '../slices/ProductDetailSlice.js'
import { toast } from 'react-toastify'


// Getting All Products
export const getProducts = (keyword = "", currentPage = 1, price = [0, 25000], category , ratings = 0) => async (dispatch) => {
    try {
        dispatch(allProductRequest());

        let link = `https://stellarmart-b.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${ratings}`

        if (category) {
            link = `https://stellarmart-b.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${ratings}`
        }


        const { data } = await axios.get(link) 

        console.log(data)

        // console.log(data)
        dispatch(allProductSuccess(data));

    } catch (err) {
        dispatch(allProductFail(err.message))
    }
}


// Getting Product Details
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch(productDetailsRequest())
        const { data } = await axios.get(`https://stellarmart-b.onrender.com/api/v1/products/${id}`)

        dispatch(productDetailsSuccess(data.product));

    } catch (err) {
        dispatch(productDetailsFail(err.message))
    }
}


// New Review
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch(newReviewRequest())

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const { data } = await axios.put("https://stellarmart-b.onrender.com/api/v1/review", reviewData, config);

        dispatch(newReviewSuccess(data.success))
        toast.success("Review Added !")

    } catch (err) {
        dispatch(newReviewFail(err.response.data.message));
    }
}


// Get All Products For Admin
export const getAllProductsForAdmin = () => async (dispatch) => {
    try {
        dispatch(adminProductRequest());

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const { data } = await axios.get("https://stellarmart-b.onrender.com/api/v1/admin/products", config)
        
        dispatch(adminProductSuccess(data.products));

    } catch (err) {
        dispatch(adminProductFail(err.response.data.message))
    }
}


// Create New Product
export const createNewProduct = (productData) => async (dispatch) => {
    try {
        dispatch(newProductRequest())

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const { data } = await axios.post("https://stellarmart-b.onrender.com/api/v1/products/new", productData, config)
        toast.success("New Product Created !")
        dispatch(newProductSuccess(data));
    } catch (err) {
        dispatch(newProductFail(err.response.data.message))
        toast.error(err.response.data.message)
    }
}


// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
    try {
            dispatch(deleteProductRequest()) ;

            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }

            const { data } = await axios.delete(`https://stellarmart-b.onrender.com/api/v1/products/${id}`,config) ;

            dispatch(deleteProductSuccess(data))
            toast.success("Product Deleted !");
            dispatch(getAllProductsForAdmin())
    } catch (err) {
        dispatch(deleteProductFail(err.response.data.message))
        toast.error("err.response.data.message")
    }
}


// Update Product
export const updateProduct = (id,newData) => async (dispatch)=>{
    try{
        dispatch(updateProductRequest()) ;

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const { data } = await axios.put(`https://stellarmart-b.onrender.com/api/v1/products/${id}`,newData,config) ;
        
        dispatch(updateProductSuccess(data)) ;
        dispatch(getAllProductsForAdmin())
        toast.success("Product Updated !") ;

        
    }catch(err){
        dispatch(updateProductFail(err.response.data.message)) ;
        toast.error(err.response.data.message)
        console.log(err.response.data.message)
    }
}


// Get All Reviews --Admin
export const getAllReviews = (id) => async (dispatch) => {
    try{
        dispatch(allReviewRequest())

        const {data} = await axios.get(`https://stellarmart-b.onrender.com/api/v1/reviews?id=${id}`)

        dispatch(allReviewSuccess(data.reviews)) ;

    }catch(err){
        dispatch(allReviewFail(err.response.data.message))
    }
}


// Delete Reviews of Product --Admin
export const deleteReviews = (reviewId,productId) => async (dispatch) => {
    try{
        dispatch(deleteReviewRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const {data} = await axios.delete(`https://stellarmart-b.onrender.com/api/v1/reviews?id=${reviewId}&productId=${productId}`,config)

        dispatch(deleteReviewSuccess(data)) ;
        dispatch(getAllReviews(productId))
        toast.success("Review Deleted !")

    }catch(err){
        dispatch(deleteReviewFail(err.response.data.message))
        toast.error(err.response.data.message)
    }
}


// Get Category Products
export const getCategoryProducts = (category) => async (dispatch) => {
    try{
        dispatch(getCategoryProductsRequest())


        const {data} = await axios.get(`https://stellarmart-b.onrender.com/api/v1/productsByCategory?category=${category}`) ;

        dispatch(getCategoryProductsSuccess(data.products)) ;
       

    }catch(err){
        dispatch(getCategoryProductsFail(err.response.data.message))
    }
}


// Get Every Product 
export const getEveryProduct = () => async (dispatch) => {
    try{
        dispatch(everyProductRequest())

        const {data} = await axios.get("https://stellarmart-b.onrender.com/api/v1/getEveryProduct") ;

        dispatch(everyProductSuccess(data))


    }catch(err){
        dispatch(everyProductFail(err.response.data.message))
    }
}


// Clearing Errors
export const clearError = () => async (dispatch) => {
    dispatch(clearErrors())
}