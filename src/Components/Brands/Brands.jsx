import React, {useEffect} from 'react'
import { getBrands } from '../../Redux/brandsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { BallTriangle } from 'react-loader-spinner'


export default function Brands() {
  const dispatch = useDispatch()
  const {isLoading,isError,brands} = useSelector((state)=> state.brands)

  useEffect(() => {
    dispatch(getBrands())
  
  }, [])
  
  return (
    <>
    {isLoading? <div className='d-flex vh-100 w-100 align-items-center justify-content-center'>
      <BallTriangle
            height={100}
            width={100}
            radius={5}
            color='#4fa94d'
            ariaLabel='ball-triangle-loading'
            wrapperClass={{}}
            wrapperStyle=''
            visible={true}/>
            </div>:
      <div className="row">
        {brands.map((brand,index)=> <div key={index} className='col-md-2'>
          <div className="brand cursor-pointer">
            <img src={brand.image} alt={brand.name} className='w-100'/>
            <h4 className='h6 my-2'>{brand.name}</h4>

          </div>
        </div>)}
      </div>
            }
    </>
  )
}
