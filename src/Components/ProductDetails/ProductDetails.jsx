import axios from 'axios'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import Slider from "react-slick";
import {Helmet} from "react-helmet";
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';


export default function ProductDetails() {

  const settings = {
    dots: true,
    infinite: true,
    autoplay:true,
    speed: 500,
    autoplaySpeed:3000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const {AddToCart} = useContext(CartContext)

  async function AddProductToCart(id){

    const reponse = await AddToCart(id)
    if(reponse.data?.status)
    {
      toast.success('Product Successfully Added !')
    }
    else
    {
      toast.error("This didn't work.")
    }

  }

  const {id} = useParams()
  function getProductDetails(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  const {isLoading, isError, data} = useQuery('productDetails',()=> getProductDetails(id))
  const productDetails = data?.data.data

  return (<>

<Helmet>
    <title>{productDetails?.title}</title>
</Helmet>

  {productDetails?<div className='row py-2 align-items-center'>
    <div className="col-md-4">
    <Slider {...settings}>
      {productDetails.images.map((img,index)=> <img key={index} alt={productDetails.title} src={img} className='w-100'/>)}
    </Slider>    
    </div>
    <div className="col-md-8">
      <h2 className='h5'>{productDetails.title}</h2>
      <p>{productDetails.description}</p>

      <h6 className='text-main'>{productDetails.category.name}</h6>
      <h6 className='text-main'>Price: {productDetails.price} EGP</h6>

      <div className='d-flex justify-content-between'>
        <span>Ratings Quantity: {productDetails.ratingsQuantity}</span>
        <span><i className='fas fa-star rating-color'></i>{productDetails.ratingsAverage}</span>
      </div>

      <button onClick={()=> AddProductToCart(productDetails.id)} className='btn bg-main w-100 text-white mt-3'>Add to Cart</button>
    </div>
  </div>:''}
  </>
    
  )
}
