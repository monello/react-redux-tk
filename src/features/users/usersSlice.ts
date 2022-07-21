import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";

interface IUser {
    id: string,
    name: string;
}

const initialState: Array<IUser> = [
    { id: '1', name: 'Dude Lebowski' },
    { id: '2', name: 'Neil Young' },
    { id: '3', name: 'Dave Gray' },
];

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
});

export const selectAllUsers = (state: RootState) => state.users;

export const postsActions = usersSlice.actions;
export default usersSlice.reducer;
