import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCount, increment, incrementByAmount, resetCount, decrement } from './counterSlice';
import "./counter.css"
const Counter = () => {
    const count = useSelector(selectCount)
    const dispatch = useDispatch()
    const [incrementValue, setIncrementValue] = useState("")
    const addValue = Number(incrementValue) || 0
    const resetAll = () => {
        setIncrementValue(0)
        dispatch(resetCount())
    }
    return (
        <div className='counter-wrapper'>
            <h2>{count}</h2>
            <div className='button-wrapper'>
                <button onClick={() => dispatch(increment())}>Increment</button>
                <button onClick={() => dispatch(decrement())}>Decrement</button>
            </div>
            <input type="text" value={incrementValue} onChange={(e) => setIncrementValue(e.target.value)} />
            <div className='button-wrapper'>
                <button onClick={() => dispatch(incrementByAmount(addValue))}>Increment by {incrementValue}</button>
                <button onClick={resetAll}>Reset</button>
            </div>
        </div>
    )
}

export default Counter