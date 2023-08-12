import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = {
    posts: [],
    status: "idle", // idle || loading || succeeded || failed
    error: null
};

// const initialState = [
//     {
//         id: 1,
//         title: "React",
//         content: "React is ...",
//         date: sub(new Date(), { minutes: 10 }).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0
//         }
//     },
//     {
//         id: 2,
//         title: "RTK",
//         content: "RTK is ...",
//         date: sub(new Date(), { minutes: 5 }).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0
//         }
//     }
// ];

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        createPost: {
            prepare: (title, content, userId) => {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                };
            },
            reducer: (state, action) => {
                state.posts.push(action.payload);
            }
        },
        addReaction: (state, action) => {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find(post => post.id === postId);

            if (existingPost) ++existingPost.reactions[reaction];
        }
    }
});

export const selectAllPosts = state => state.posts.posts;

export const { 
    createPost,
    addReaction
} = postsSlice.actions;

export default postsSlice.reducer;