import React from 'react'
import { MetaData } from '../components/MetaData'



export const About = () => {
  


    return (
        <>

            <div className='pt-16 min-h-screen'>
                <MetaData title={"About"} />
                <div className='md:px-14 px-4 pb-20'>
                    <p className='pt-8 font-bold text-3xl text-blue-900'>About StellarMart</p>

                    <p className='pt-6'> Welcome to StellarMart, your premier destination for an exceptional online shopping experience. At StellarMart, we believe in bringing the universe of quality products right to your fingertips.</p>

                    <div className='pt-6'>
                        <p className='text-xl'>Our Mission</p>

                        <p>Our mission is to redefine online shopping by providing a curated selection of products that meet the highest standards of quality and style. We strive to offer a seamless and enjoyable shopping journey that transcends boundaries and elevates your lifestyle.</p>
                    </div>

                    <div className='pt-6'>
                        <p className='text-xl'>What Sets Us Apart</p>

                        <p>StellarMart stands out by offering a handpicked collection of products that reflect elegance and innovation. Our team meticulously selects each item, ensuring that it meets our stringent criteria for quality, uniqueness, and value. From trendy fashion statements to cutting-edge electronics, our diverse range caters to every need.</p>
                    </div>

                    <div className='pt-6'>
                        <p className='text-xl'>Customer-Centric Approach</p>

                        <p> At the heart of StellarMart is our commitment to you, our valued customer. We prioritize your satisfaction and convenience above all else. Our user-friendly website, secure payment options, and prompt customer support ensure that your shopping experience is nothing short of stellar.</p>
                    </div>

                    <div className='pt-6'>
                        <p className='text-xl'>Explore the Stars</p>

                        <p>Dive into a world of possibilities with StellarMart. Whether you're a trendsetter, a tech enthusiast, or someone looking for the perfect gift, we have something extraordinary in store for you. Embark on a journey of discovery and upgrade your lifestyle with us.</p>
                    </div>

                    <div className='pt-6'>
                        <p> <span className='font-bold'>Thank you for choosing StellarMart.</span> Your trust fuels our mission to bring you the best of the best. Explore, shop, and experience excellence with every click.</p>

                        <p>StellarMart - Where Elegance Meets Convenience.</p>
                    </div>

                </div>
            </div>

        </>
    )
}
