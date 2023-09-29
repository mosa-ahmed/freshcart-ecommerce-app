import React from 'react'
import Style from './CategorySlider.module.css'
import {useQuery} from 'react-query'
import axios from 'axios'
import Slider from "react-slick";


export default function CategorySlider() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay:true,
    speed: 500,
    autoplaySpeed:3000,
    slidesToShow: 7,
    slidesToScroll: 1
  };

  function getCategories(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  const {data} = useQuery('categorySlider',getCategories)
  const categories = data?.data.data
  return (
    <>
      {categories?<Slider {...settings}>
        {categories.map((category,index)=> <img alt='' height={200} src={category.image} className='w-100' key={index}/>)}
      </Slider> :'' }
    </>
  )
}
