import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: "1", name: "Kim" },
    { id: "2", name: "Lee" },
    { id: "3", name: "Park" }
];

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        
    }
});

export const selectAllUsers = state => state.users;

export default usersSlice.reducer;