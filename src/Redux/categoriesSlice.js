import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const getCategories = createAsyncThunk('categoriesSlice/getCategories',
        async ()=> {
            const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
            return data.data
        })

const initialState = {isLoading:false, isError:null, categories:[]}
const categoriesSlice = createSlice({
    name:'categoriesSlice',
    initialState,
    extraReducers:{
        [getCategories.pending]:(state)=>{
            state.isLoading = true
        },
        [getCategories.fulfilled]:(state,action)=>{
            state.categories = action.payload
            state.isLoading = false
        }
        
    }
})

export const categoriesReducer = categoriesSlice.reducer
