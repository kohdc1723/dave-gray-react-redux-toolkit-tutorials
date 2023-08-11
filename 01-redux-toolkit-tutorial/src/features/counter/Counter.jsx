import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    increment,
    decrement,
    reset,
    incrementByAmount
} from "./counterSlice";

const Counter = () => {
    const count = useSelector(state => state.counter.count);
    const [amount, setAmount] = useState(0);
    const amountValue = Number(amount) || 0;

    const dispatch = useDispatch();

    const onClickIncrement = () => dispatch(increment());
    const onClickDecrement = () => dispatch(decrement());
    const onChangeAmount = (e) => setAmount(e.target.value);
    const onClickAddAmount = () => dispatch(incrementByAmount(amountValue));
    const onClickReset = () => {
        setAmount(0);
        dispatch(reset());
    }

    return (
        <section>
            <p>{count}</p>
            <div>
                <button onClick={onClickIncrement}>+</button>
                <button onClick={onClickDecrement}>-</button>
            </div>

            <input
                type="text"
                value={amountValue}
                onChange={onChangeAmount}
            />

            <div>
                <button onClick={onClickAddAmount}>Add Amount</button>
                <button onClick={onClickReset}>Reset</button>
            </div>
        </section>
    );
};

export default Counter;