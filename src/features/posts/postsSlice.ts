import { createSlice, nanoid, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { sub } from 'date-fns';
import { RootState } from "../../app/store";

const POSTS_URL = 'http://jsonplaceholder.typicode.com/posts';

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

export interface IFetchPostsPayload {
    userId: number,
    id: number,
    title: string,
    body: string;
    content?: string;
    date: string,
    reactions: IReactions;
}

interface ReactionAddedPayload {
    postId: string;
    reaction: keyof IReactions; // Indicate that reaction must be one of the keys in the Type IReactions
}

export interface IStore {
    posts: IPost[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: IStore = {
    posts: [],
    status: 'idle',
    error: null
};

export const fetchPosts = createAsyncThunk<IFetchPostsPayload[]>(
    // Arg1: A string that will be used as the prefix to the generated action:
    // pending - 'posts/fetchPosts/pending'
    // fullfilled - 'posts/fetchPosts/fullfilled'
    // rejected - 'posts/fetchPosts/rejected'
    'posts/fetchPosts',
    // Arg2: Payload Creator Callback
    // this function should return a Promise (that contains some data), or ...
    // a Rejected-Promise that contains an error
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(POSTS_URL);
            return response.data;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost);
    return response.data;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action: PayloadAction<IPost>) => {
                state.posts.push(action.payload);
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
            const existingPost = state.posts.find(post => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        }
    },
    extraReducers(builder) {
        builder
            // .addCase statements respond the the various states (actions dispatched by the AsyncThunk) and returend and different intervals,
            // the the AsyncThunk that is define above, outside the slice
            // * here we respond to the "pending" response status
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            // * here we respond to the "fullfilles" (success) response status
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Adding date and reactions
                let min = 1;
                // Here we need to add some extra data that is not being returend in the payload of the API
                const loadedPosts = action.payload.map((post) => {
                    post.content = post.body;
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    };
                    return post;
                }) as unknown as IPost;

                // First clear all the posts in the state (MRL: I had to ad this because for some reason the fetchPosts() is called twice)
                state.posts = [];
                // Add any fetched posts to the array
                state.posts = state.posts.concat(loadedPosts);
            })
            // * here we respond to the "rejected" (error) response status
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
        // .addCase(addNewPost.fulfilled, (state, action) => {
        //     action.payload.userId = Number(action.payload.userId);
        //     action.payload.date = new Date().toISOString();
        //     action.payload.reactions = {
        //         thumbsUp: 0,
        //         hooray: 0,
        //         heart: 0,
        //         rocket: 0,
        //         eyes: 0
        //     };
        //     console.log(action.payload);
        //     state.posts.push(action.payload);
        // });
    }
});

export const getAllPosts = (state: RootState) => state.posts.posts;
export const getPostStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

export const postsActions = postsSlice.actions;
export default postsSlice.reducer;


