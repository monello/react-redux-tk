import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { sub } from 'date-fns';

interface IPosts {
    id: string;
    title: string;
    content: string;
    userId?: string;
    date: string;
}

const initialState: Array<IPosts> = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: "I've heard good things.",
        date: sub(new Date(), { minutes: 10 }).toISOString() // Current date and subtracting 10 mins
    },
    {
        id: '2',
        title: 'Slices...',
        content: "The more I say slice, the more I want pizza.",
        date: sub(new Date(), { minutes: 5 }).toISOString()
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
            prepare: (title: string, content: string, userId: string) => ({
                payload: {
                    id: nanoid(),
                    title,
                    content,
                    userId,
                    date: new Date().toISOString()
                }
            })

        },
    }
});

export const getAllPosts = (state: RootState) => state.posts;

export const postsActions = postsSlice.actions;
export default postsSlice.reducer;


