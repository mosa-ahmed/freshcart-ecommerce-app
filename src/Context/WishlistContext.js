import {createContext} from 'react'
import axios from 'axios'

export const WishlistContext = createContext()

export default function WishlistContextProvider(props){
    let headers = {
        token:localStorage.getItem('userToken')
    }
    
    function AddToWishlist(id){
        return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
        {
            productId:id
        },
        {
            headers
        })
    }
    
    function getLoggedUserWishlist(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',
        {
            headers
        }).then((response)=>response)
        .catch((err)=> err)
    }

    function removeWishlistItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers})
        .then((response)=> response)
        .catch((err)=> err)
    }

    return <WishlistContext.Provider value={{AddToWishlist,getLoggedUserWishlist,removeWishlistItem}}>
            {props.children}
    </WishlistContext.Provider>
}