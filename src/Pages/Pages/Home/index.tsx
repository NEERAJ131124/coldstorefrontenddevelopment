import React from 'react'
import Home from '../../../Components/Pages/Home'
import AuthHeader from '../../../Layout/AuthHeader/Index'
import Footer from '../../../Layout/Footer'
import HomePageSample from '../../../Components/Pages/Home/Index1'

export default function HomePage() {
  return (
    <>
    <AuthHeader/>
        <div className='page-body'>
      <HomePageSample />
    </div>
    <Footer/>

    </>
  )
}