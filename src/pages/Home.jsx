import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { HomeHeader } from '../components/HomeHeader';
import { Products } from '../components/Products';
import { MetaData } from '../components/MetaData';
import { getProducts, getEveryProduct } from '../actions/productAction';
import { useDispatch, useSelector } from 'react-redux'



export const Home = () => {

    const { allProducts, loading, error } = useSelector(state => state.products)

    const dispatch = useDispatch()
    

    useEffect(() => {

        dispatch(getEveryProduct())

    }, [dispatch, error])


   

    
    
   
    return (
        <>
            <MetaData title="StellarMart" />
            


            <HomeHeader products={allProducts} />


            <Products products={allProducts.slice(0,12)} loading={loading} />

        </>
    );
}