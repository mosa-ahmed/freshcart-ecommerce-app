import {createContext} from 'react'
import axios from 'axios'

export const CartContext = createContext()

export default function CartContextProvider(props){
    let headers = {
        token:localStorage.getItem('userToken')
    }

    function AddToCart(id){
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
            productId:id
        },
        {
            headers
        }).then((response)=>response)
        .catch((err)=> err)
    }

    function getLoggedUserCart(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart',
        {
            headers
        }).then((response)=>response)
        .catch((err)=> err)
    }

    function removeCartItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers})
        .then((response)=> response)
        .catch((err)=> err)
    }

    function updateProductQuantity(productId,count){
        if(count > 0){
            return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
            count
        },{headers})
        .then((response)=> response)
        .catch((err)=> err)
        }else{
            return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
            count:1
        },{headers})
        .then((response)=> response)
        .catch((err)=> err)
        }
    }

    return <CartContext.Provider value={{AddToCart,getLoggedUserCart,removeCartItem,updateProductQuantity}}>
            {props.children}
    </CartContext.Provider>
}