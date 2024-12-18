import React from 'react'
import Home from '../../../Components/Pages/Home'
import AuthHeader from '../../../Layout/AuthHeader/Index'
import Footer from '../../../Layout/Footer'

export default function HomePage() {
  return (
    <>
    <AuthHeader/>
        <div className='page-body'>
      <Home />
    </div>
    <Footer/>

    </>
  )
}