import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import { BallTriangle } from 'react-loader-spinner'


export default function Cart() {
  const {getLoggedUserCart,removeCartItem,updateProductQuantity} = useContext(CartContext)
  const [cartDetails, setcartDetails] = useState(null)

  async function getCart(){
    const {data} = await getLoggedUserCart()
    setcartDetails(data)
  }

  async function removeItem(id){
    const {data} = await removeCartItem(id)
    setcartDetails(data)
  }


  async function updateQuantity(id,count){
    let {data} = await updateProductQuantity(id,count)
    setcartDetails(data)
  }

  useEffect(() => {
    getCart()
  
  }, [])
  

  return (
    <>{cartDetails?<div className="w-75 my-3 mx-auto p-4 bg-main-light">
    <h3>Shopping Cart</h3>
    <h4 className='h6 text-main fw-bolder'>Cart Items: {cartDetails.numOfCartItems}</h4>
    <h4 className='h6 text-main fw-bolder'>Total Cart Price: {cartDetails.data.totalCartPrice} EGP</h4>
    {cartDetails.data.products.map((product)=> <div key={product.product.id} className="row border-bottom py-3 px-2">
      <div className="col-md-2">
        <img src={product.product.imageCover} className='w-100' alt="" />
      </div>
      <div className="col-md-10">
        <div className='d-flex justify-content-between  align-items-center'>
        <div className='d-flex flex-column  justify-content-between'>
          <div>
            <h3 className='h6 mt-3'>{product.product.title.split(' ').slice(0,3).join(' ')}</h3>
            <h6 className='text-main'>Price: {product.price} EGP</h6>
          </div>
          <button onClick={()=> removeItem(product.product.id)} className='btn align-self-start mt-5 p-0'><i className='fas fa-trash-can text-danger font-sm'></i> Remove</button>
        </div>

        <div>
          <button onClick={()=> updateQuantity(product.product.id,product.count+1)} className='border-main p-2 btn'>+</button>
          <span className='mx-2'>{product.count}</span>
          <button onClick={()=> updateQuantity(product.product.id,product.count-1)} className='border-main p-2 btn'>-</button>
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
