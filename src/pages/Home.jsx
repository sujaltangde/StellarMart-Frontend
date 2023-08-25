import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { HomeHeader } from '../components/HomeHeader';
import { Products } from '../components/Products';
import { MetaData } from '../components/MetaData';
import { getProducts } from '../actions/productAction';
import { useDispatch, useSelector } from 'react-redux'



export const Home = () => {

    const { products, loading, error, productsCount } = useSelector(state => state.products)

    const dispatch = useDispatch()



    useEffect(() => {

        dispatch(getProducts())

    }, [dispatch, error])


   

    
    
   
    return (
        <>
            <MetaData title="StellarMart" />
            


            <HomeHeader />


            <Products products={products} loading={loading} />

        </>
    );
}