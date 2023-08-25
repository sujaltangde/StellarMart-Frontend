import React from 'react'

export const Contact = () => {
  return (
    <>
      <div className='min-h-screen pt-14 md:px-14 px-4 pb-20'>
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
            Contact Information</p>

          <ul>
            <li>Email: support@stellarmart.com</li>
            <li>Phone: +1-800-123-4567</li>
            <li>Working Hours: Monday to Friday, 9:00 AM - 6:00 PM (EST)</li>
          </ul>
        </div>

        <div className='pt-6'>
          <p className='text-xl'>Visit Our Store</p>

          <p className='pt-1'>If you prefer an in-person shopping experience, we invite you to visit our physical store. Our knowledgeable staff will be happy to assist you and guide you through our products.</p>

          <ul>

            <li>123 Shopping Avenue</li>
            <li>City, State ZIP</li>
            <li>United States</li>
            <li>Social Media</li>
          </ul>
        </div>

        <div className='pt-6'>
          <p className="text-xl">Social Media</p>
          <p className='pt-1'>
            Stay connected with StellarMart through our social media channels. Follow us to stay updated on the latest products, promotions, and news.
          </p>

          <ul className='text-lg pt-3'>
            <li className='underline font-medium'>Facebook</li>
            <li className='underline font-medium'>Twitter</li>
            <li className='underline font-medium'>Instagram</li>
          </ul>
        </div>
      </div>
    </>
  )
}
