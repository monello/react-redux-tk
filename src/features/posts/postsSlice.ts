import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { nanoid } from '@reduxjs/toolkit';

interface IPosts {
    id: string;
    title: string;
    content: string;
}

const initialState: Array<IPosts> = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: "I've heard good things."
    },
    {
        id: '2',
        title: 'Slices...',
        content: "The more I say slice, the more I want pizza.",
    }
];

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action: PayloadAction<IPosts>) => {
                state.push(action.payload);
            },
            prepare: (title: string, content: string) => ({
                payload: {
                    id: nanoid(),
                    title,
                    content
                }
            })

        },
    }
});

export const getAllPosts = (state: RootState) => state.posts;

export const postsActions = postsSlice.actions;
export default postsSlice.reducer;


