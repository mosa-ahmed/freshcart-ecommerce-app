import { createSlice } from "@reduxjs/toolkit";


const initialState = {counter:0,userName:''}
const counterSlice = createSlice({
    name:'counterSlice',
    initialState,
    reducers:{
        increase:(state,actions)=>{
            state.counter += actions.payload
            console.log('increase');
        },
        decrease:()=>{
            console.log('decrease');
        }
    }
})

export const counterReducer = counterSlice.reducer
export const {increase,decrease} = counterSlice.actions