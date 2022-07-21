import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
    count: number;
}

const initialState: CounterState = {
    count: 0
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        // place all the actions here
        increment: (state) => {
            state.count++;
        },
        decrement: (state) => {
            state.count--;
        },
    }
});


export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
