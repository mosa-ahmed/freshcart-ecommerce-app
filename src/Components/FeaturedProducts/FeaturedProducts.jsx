import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useQuery} from 'react-query'
import {useContext} from 'react'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import {Link} from 'react-router-dom'
import { WishlistContext } from '../../Context/WishlistContext'

export default function FeaturedProducts() {
    const {AddToCart} = useContext(CartContext)
    const {AddToWishlist,getLoggedUserWishlist} = useContext(WishlistContext)
    const [liked, setliked] = useState([])

    async function addItemToProduct(id){
        const response = await AddToCart(id)
        if(response?.data.status === 'success'){
            toast.success('Item Added Successfully')
        }else{
            toast.error('Error Adding The Item')
        }
    }

    async function addItemToWishlist(id){
        const response = await AddToWishlist(id)
        if(response?.data.status === 'success'){
            toast.success('Item Added Successfully')
            setliked(response.data.data)
        }else{
            toast.error('Error Adding The Item')
        }
    }

    function getFeaturedProducts(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }

    async function getWishlist(){
        const {data} = await getLoggedUserWishlist()
        let wishList = []
        data.data.map((item)=>wishList.push(item.id))
        setliked(wishList)
      }

    useEffect( () => {
        getWishlist()
    }, [])
    

    const {data,isLoading,isError,isFetching} = useQuery('featuredProducts', getFeaturedProducts)

  return (
    <div className='py-5'>
        <h2>Featured Products</h2>
        <div className="row">
            {data?.data.data.map((product)=> <div key={product.id} className='col-sm-6 col-md-4 col-lg-2'>
                <div className="product cursor-pointer py-3 px-2">
                <Link to={`/productDetails/${product.id}`}>

                    <img src={product.imageCover} alt={product.title} className='w-100'/>

                    <span className='text-main font-sm fw-bolder'>{product.category.name}</span>
                    <h3 className='h6'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
                    </Link>

                    <div className="d-flex justify-content-between mt-3">
                        <span>{product.price} EGP</span>
                        <span><i onClick={()=> addItemToWishlist(product.id)} className={liked?.includes(product.id)?'fas fa-heart text-danger me-2':'fas fa-heart me-2'}></i><i className='fas fa-star rating-color'></i>  {product.ratingsAverage}</span>
                    </div>
                    <button onClick={()=> addItemToProduct(product.id)} className='btn bg-main text-white w-100 btn-sm mt-2'>Add to Cart</button>
                </div>
            </div>)}
        </div>
    </div>
  )
}
