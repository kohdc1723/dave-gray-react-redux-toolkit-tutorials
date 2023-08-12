import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
    posts: [],
    status: "idle", // idle || loading || succeeded || failed
    error: null
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    try {
        const response = await axios.get(POSTS_URL);
        
        return [...response.data];
    } catch (err) {
        return err.message;
    }
});

export const createPost = createAsyncThunk("posts/createPost", async (post) => {
    try {
        const response = await axios.post(POSTS_URL, post);

        return response.data;
    } catch (err) {
        return err.message;
    }
});

export const updatePost = createAsyncThunk("posts/updatePost", async (post) => {
    const { id } = post;

    try {
        const response = await axios.put(`${POSTS_URL}/${id}`, post);

        return response.data;
    } catch (err) {
        return post;
    }
});

export const deletePost = createAsyncThunk("posts/deletePost", async (post) => {
    const { id } = post;

    try {
        const response = await axios.delete(`${POSTS_URL}/${id}`);
        if (response?.status === 200) return post;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
});

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addReaction: (state, action) => {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find(post => post.id === postId);

            if (existingPost) ++existingPost.reactions[reaction];
        }
    },
    extraReducers: (builder) => {
        // fetchPosts
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.status = "loading";
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = "succeeded";

            let min = 1;
            const loadedPosts = action.payload.map(post => {
                post.date = sub(new Date(), { minutes: min++ }).toISOString();
                post.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                };

                return post;
            });

            state.posts = loadedPosts;
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });

        // createPost
        builder.addCase(createPost.fulfilled, (state, action) => {
            action.payload.userId = Number(action.payload.userId);
            action.payload.date = new Date().toISOString();
            action.payload.reactions = {
                thumbsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
                coffee: 0
            };

            state.posts.push(action.payload);
        });

        // updatePost
        builder.addCase(updatePost.fulfilled, (state, action) => {
            if (!action.payload?.id) {
                console.log("update could not complete");
                console.log(action.payload);

                return;
            }

            const { id } = action.payload;
            action.payload.date = new Date().toISOString();
            const posts = state.posts.filter(post => post.id !== id);
            state.posts = [...posts, action.payload];
        });

        // deletePost
        builder.addCase(deletePost.fulfilled, (state, action) => {
            if (!action.payload?.id) {
                console.log("delete could not complete");
                console.log(action.payload);

                return;
            }

            const { id } = action.payload;
            const posts = state.posts.filter(post => post.id !== id);
            state.posts = posts;
        });
    }
});

export const selectAllPosts = state => state.posts.posts;
export const selectPostsStatus = state => state.posts.status;
export const selectPostsError = state => state.posts.error;
export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);

export const { 
    addReaction
} = postsSlice.actions;

export default postsSlice.reducer;