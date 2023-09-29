import React, { useContext, useEffect, useState } from 'react'
import { WishlistContext } from '../../Context/WishlistContext'
import { BallTriangle } from 'react-loader-spinner'
import axios from 'axios'
import { CartContext } from '../../Context/CartContext'
import { toast } from 'react-hot-toast'

export default function Wish() {
  const {getLoggedUserWishlist,removeWishlistItem} = useContext(WishlistContext)
  const [wishlistDetails, setwishlistDetails] = useState(null)
  const {AddToCart} = useContext(CartContext)


  async function getWishlist(){
    const {data} = await getLoggedUserWishlist()
    setwishlistDetails(data.data)
  }

  async function removeItem(id){
    await removeWishlistItem(id)
    getWishlist()
  }

  async function addItemToProduct(id){
    const response = await AddToCart(id)
    if(response?.data.status === 'success'){
        toast.success('Item Added Successfully')
    }else{
        toast.error('Error Adding The Item')
    }
}

  useEffect(() => {
    getWishlist()
    console.log(wishlistDetails);
  }, [])
  

  return (
    <>{wishlistDetails?<div className="w-75 my-3 mx-auto p-4 bg-main-light">
    <h3>My Wish List</h3>
    {wishlistDetails.map((product)=> <div key={product._id} className="row border-bottom py-3 px-2">
      <div className="col-md-2">
        <img src={product.imageCover} className='w-100' alt="" />
      </div>
      <div className="col-md-10">
        <div className='d-flex justify-content-between  align-items-center'>
        <div className='d-flex flex-column  justify-content-between'>
          <div>
            <h3 className='h6 mt-3'>{product.title.split(' ').slice(0,3).join(' ')}</h3>
            <h6 className='text-main'>Price: {product.price} EGP</h6>
          </div>
          <button onClick={()=> removeItem(product._id)} className='btn align-self-start mt-5 p-0'><i className='fas fa-trash-can text-danger font-sm'></i> Remove</button>
        </div>

        <div>
          <button onClick={()=> addItemToProduct(product._id)} className='border-main p-2 btn'>Add to Cart</button>
          </div>
        </div>

      </div>
    </div>)}
  </div>:<div id='loading' className='d-flex justify-content-center align-items-center vh-100'><BallTriangle
      height={100}
      width={100}
      radius={5}
      color="#4fa94d"
      ariaLabel="ball-triangle-loading"
      wrapperClass={{}}
      wrapperStyle=""
      visible={true}
    /></div>}
      
    </>
  )
}
