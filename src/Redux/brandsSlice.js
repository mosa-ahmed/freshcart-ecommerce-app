import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const getBrands = createAsyncThunk('brandsSlice/getBrands',
        async ()=> {
            const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
            return data.data
        })

const initialState = {isLoading:false, isError:null, brands:[]}
const brandsSlice = createSlice({
    name:'brandsSlice',
    initialState,
    extraReducers:{
        [getBrands.pending]:(state)=>{
            state.isLoading = true
        },
        [getBrands.fulfilled]:(state,action)=>{
            state.brands = action.payload
            state.isLoading = false
        }
        
    }
})

export const brandsReducer = brandsSlice.reducer
