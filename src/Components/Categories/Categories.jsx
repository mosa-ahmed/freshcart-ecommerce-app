import React, {useEffect} from 'react'
import { getCategories } from '../../Redux/categoriesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { BallTriangle } from 'react-loader-spinner'


export default function Categories() {
  const dispatch = useDispatch()
  const {isLoading,isError,categories} = useSelector((state)=> state.categories)

  useEffect(() => {
    dispatch(getCategories())
  
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
      <div className="row pt-4">
        {categories.map((brand,index)=> <div key={index} className='col-md-2'>
          <div className="brand cursor-pointer">
            <img src={brand.image} height={250} alt={brand.name} className='w-100'/>
            <h4 className='h6 my-2'>{brand.name}</h4>

          </div>
        </div>)}
      </div>
            }
    </>
  )
}
