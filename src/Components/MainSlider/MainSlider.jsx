import React from 'react'
import Slider from "react-slick";
import slide1 from '../../assets/images/slider-image-3.jpeg'
import slide2 from '../../assets/images/slider-image-1.jpeg'
import slide3 from '../../assets/images/slider-image-2.jpeg'
import blog1 from '../../assets/images/1678303526206-cover.jpeg'
import blog2 from '../../assets/images/1678305677165-cover.jpeg'

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay:true,
    speed: 500,
    autoplaySpeed:3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
  return (
    <>
    <div className="row gx-0 my-4">
      <div className="col-md-9">
      <Slider {...settings}>
      <img src={slide1} className='w-100' alt=''/>
      <img src={slide2} alt="" className='w-100' />
        <img src={slide3} alt=""  className='w-100'/>
      </Slider>
      </div>
      <div className="col-md-3 my-auto">
        <img src={blog2} alt="" className='w-100' height={300}/>
        <img src={blog1} alt="" className='w-100' height={300}/>
      </div>
    </div>
    </>
  )
}
