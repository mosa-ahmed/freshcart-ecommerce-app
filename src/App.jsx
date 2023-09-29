import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import Notfound from './Components/Notfound/Notfound'
import Cart from './Components/Cart/Cart'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Profile from './Components/Profile/Profile'
import UserContextProvider from './Context/UserContext'
import {Toaster} from 'react-hot-toast'

import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CartContextProvider from './Context/CartContext'
import { Provider } from 'react-redux'
import { store } from './Redux/Store'
import WishlistContextProvider from './Context/WishlistContext'
import Wish from './Components/Wish/Wish'


const routers = createBrowserRouter([
  {path:'/', element:<Layout/>, children:[
    {index:true, element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'wishlist', element:<ProtectedRoute><Wish/></ProtectedRoute>},
    {path:'categories', element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'brands', element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'cart', element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'productdetails/:id', element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'profile', element:<ProtectedRoute><Profile/></ProtectedRoute>},
    {path:'register', element:<Register/>},
    {path:'login', element:<Login/>},
    {path:'*', element:<Notfound/>}
  ]}
])

export default function App() {
  
  return (
    <UserContextProvider>
      <WishlistContextProvider>
      <CartContextProvider>
        <Provider store={store}>
          <RouterProvider router={routers}>  
          </RouterProvider>
          <Toaster/>
        </Provider>
      </CartContextProvider>
      </WishlistContextProvider>
    </UserContextProvider>

  )
}
