import React from 'react'
import jwtDecode from 'jwt-decode'


export default function Profile() {
  const decoded = jwtDecode(localStorage.getItem('userToken'))
  return (<>
      <h1 className='mt-3'>Hello: {decoded.name}</h1>
  </>
  
  )
}
