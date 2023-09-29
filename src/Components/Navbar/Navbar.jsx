import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext'
import { useSelector } from 'react-redux'
import { CartContext } from '../../Context/CartContext'

export default function Navbar() {
  const {userToken,setuserToken} = useContext(UserContext)
  const navigate = useNavigate()

  const {getLoggedUserCart} = useContext(CartContext)
  const [cartDetails, setcartDetails] = useState(null)

  async function getCart(){
    const {data} = await getLoggedUserCart()
    setcartDetails(data)
  }

  let {counter} = useSelector((state)=> state.counter)

  function logOut(){
    localStorage.removeItem('userToken')
    setuserToken(null)
    navigate('/login')
  }

  useEffect(() => {
    getCart()
  
  }, )
  return (<>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
      <img src={logo} alt="fresh market logo" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {userToken?<><li className="nav-item">
          <Link className="nav-link" to='/'>Home</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to='/wishlist'>WishList</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/categories">Categories</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/brands">Brands</Link>
        </li>
 
        <li className="nav-item">
          <Link className="nav-link" to='/cart'>Cart</Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link" to='/profile'>Profile</Link>
        </li>

        <li className="nav-item ms-5 fs-4 text-danger">
          <i className='fa-solid fa-cart-shopping me-2 mt-2'></i>{cartDetails?.numOfCartItems}
        </li>
        </>:''}
      </ul>

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item d-flex align-items-center cursor-pointer">
          <i className='fab fa-facebook mx-2'></i>
          <i className='fab fa-twitter mx-2'></i>
          <i className='fab fa-instagram mx-2'></i>
          <i className='fab fa-tiktok mx-2'></i>
          <i className='fab fa-youtube mx-2'></i>
         </li>
        {userToken?<li className="nav-item">
           <span className="nav-link cursor-pointer" onClick={()=> logOut()}>Logout</span>
         </li>:<><li className="nav-item">
                  <Link className="nav-link" to='/login'>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/register'>Register</Link>
                </li></>}
        </ul>
    </div>
  </div>
</nav>
  </>
  )
}
