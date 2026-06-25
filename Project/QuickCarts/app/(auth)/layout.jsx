
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const AuthLayout = ({ children }) => {
  return (
    <>
      <Navbar showOnlyIcon={true}/>
      {children}
      <Footer/>
    </>
  )
}

export default AuthLayout