import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    usersList: [],
    error: null,
    status: 'idle'
}
const USER_URL = 'https://jsonplaceholder.typicode.com/users'
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USER_URL)
    return response.data
})
const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.usersList = action.payload
        })
    }
})

export const selectAllUsers = state => state.users.usersList

export default userSlice.reducer

