import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    count: 0
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment(state) {
            state.count = state.count + 1
        },
        decrement(state) {
            state.count = state.count - 1
        },
        incrementByAmount(state, action) {
            state.count = state.count + action.payload
        },
        resetCount(state) {
            state.count = 0
        }
    }
})

export const selectCount = (state)=> state.counter.count

export const { increment, decrement, incrementByAmount, resetCount }  = counterSlice.actions

export default counterSlice.reducer