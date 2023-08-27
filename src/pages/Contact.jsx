import React from 'react'
import { MetaData } from '../components/MetaData'

export const Contact = () => {
  return (
    <>
      <div className='min-h-screen pt-14 md:px-14 px-4 pb-20'>
      <MetaData title={"Contact Us"} />
        <div>
          <p className='pt-8 font-bold text-3xl text-blue-900'>Contact Us</p>
          <p className='pt-6 text-lg'>
            Welcome to StellarMart's Contact Us page! We're excited to assist you in any way we can. Whether you have questions, feedback, or need assistance with your order, we're here to help. Below, you'll find different ways to get in touch with us.
          </p>
        </div>



        <div className='pt-6'>
          <p className='text-xl'>
            Customer Support
          </p>

          <p className='pt-1'> Our dedicated customer support team is available to help you with any inquiries you may have. We're committed to providing you with the best shopping experience possible.
            </p>
            <p className=' '>Contact Information</p>

          <ul className='font-semibold'>
            <li>Email: support@stellarmart.com</li>
            <li>Phone: +1-800-123-4567</li>
            <li>Working Hours: Monday to Friday, 9:00 AM - 6:00 PM (EST)</li>
          </ul>
        </div>

        <div className='pt-6'>
          <p className='text-xl'>Visit Our Store</p>

          <p className='pt-1'>If you prefer an in-person shopping experience, we invite you to visit our physical store. Our knowledgeable staff will be happy to assist you and guide you through our products.</p>

          <ul className='font-medium'>

            <li>123 Shopping Avenue</li>
            <li>City, State ZIP</li>
            <li>United States</li>
          </ul>
        </div>

        <div className='pt-6'>
          <p className="text-xl">Social Media</p>
          <p className='pt-1'>
            Stay connected with StellarMart through our social media channels. Follow us to stay updated on the latest products, promotions, and news.
          </p>

          <ul className='text-lg pt-3'>
            <li className='underline font-medium  '> <span className='cursor-pointer' >Facebook</span> </li>
            <li className='underline font-medium  '><span className='cursor-pointer' >Twitter</span></li>
            <li className='underline font-medium  '><span className='cursor-pointer' >Instagram</span></li>
          </ul>
        </div>
      </div>
    </>
  )
}
