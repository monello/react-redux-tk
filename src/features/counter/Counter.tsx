import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { increment, decrement } from "./counterSlice";

const Counter = () => {
    const count = useSelector((state: RootState) => state.counter.count);
    const dispatch = useDispatch();

    return (
        <section>
            <p>{count}</p>
            <div>
                <button onClick={() => dispatch(increment())}>+</button>
                <button onClick={() => dispatch(decrement())}>-</button>
            </div>
        </section>
    );
};

export default Counter;
