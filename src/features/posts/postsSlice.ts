import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { sub } from 'date-fns';

export interface IReactions {
    thumbsUp: number;
    wow: number;
    heart: number;
    rocket: number;
    coffee: number;
}

export interface IPost {
    id: string;
    title: string;
    content: string;
    userId?: string;
    date: string;
    reactions: IReactions;
}

interface ReactionAddedPayload {
    postId: string;
    reaction: keyof IReactions; // Indicate that reaction must be one of the keys in the Type IReactions
}

const initialState: Array<IPost> = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: "I've heard good things.",
        date: sub(new Date(), { minutes: 10 }).toISOString(), // Current date and subtracting 10 mins
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    },
    {
        id: '2',
        title: 'Slices...',
        content: "The more I say slice, the more I want pizza.",
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    }
];

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action: PayloadAction<IPost>) => {
                state.push(action.payload);
            },
            prepare: (title: string, content: string, userId: string) => ({
                payload: {
                    id: nanoid(),
                    title,
                    content,
                    userId,
                    date: new Date().toISOString(),
                    reactions: {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                }
            })

        },
        reactionAdded(state, action) {
            const { postId, reaction }: ReactionAddedPayload = action.payload;
            const existingPost = state.find(post => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        }
    }
});

export const getAllPosts = (state: RootState) => state.posts;

export const postsActions = postsSlice.actions;
export default postsSlice.reducer;


