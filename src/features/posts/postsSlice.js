import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from 'date-fns';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'
const initialState = {
    postsData: [],
    status: 'idle', //idle | loading | succeeded | failed 
    error: null
}
// createAsyncThunk already creates three action creators on its own, so we use extraReducer to create corresponding reducer for these async actions.
const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data
})
const addNewPost = createAsyncThunk('posts/addPosts', async (newPost) => {
    const response = await axios.post(POSTS_URL, newPost)
    return response.data // the return from this action creator gives the value of action.payload in the extra reducer.
})
const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.postsData.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
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
                }
            }
            // prepare creates the action.payload object when you need 
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.postsData.find(post => post.id === postId)
            if (existingPost) existingPost.reactions[reaction] += 1
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString()
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post
                })
                state.postsData = state.postsData.concat(loadedPosts) // I forgot to assign value of concated array to the state.postsData and didn't got the data with no errors. So, it's is important to assign it to the state. 
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.id = nanoid()
                action.payload.date = new Date().toISOString()
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                 state.postsData.push(action.payload)
            })

    }
})
export const selectAllPosts = state => state.posts
export const { reactionAdded } = postSlice.actions
export { fetchPosts, addNewPost }
export default postSlice.reducer
