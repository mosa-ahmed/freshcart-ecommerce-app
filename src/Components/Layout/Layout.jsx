import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { UserContext } from '../../Context/UserContext'
import { Offline, Online } from "react-detect-offline";

export default function Layout() {
  const {setuserToken} = useContext(UserContext)
  useEffect(() => {
    if(localStorage.getItem('userToken')){
      setuserToken(localStorage.getItem('userToken'))
    }
  }, [])
  return (
    <>
    <Navbar/>
    <div className="container">
    <Outlet/>
    </div>
    <div>
    <Offline><div className="network">
        <i className='fas fa-wifi me-2'></i> You Are Offline ! 
      </div>
    </Offline>
  </div>
    </>
  )
}
