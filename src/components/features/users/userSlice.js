import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        loginuser: localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user"))
            : null,
    },
    reducers: {
        userdata: (state, actions) => {
            state.loginuser = actions.payload;
        },
    },
});

export const { userdata } = userSlice.actions;

export default userSlice.reducer;
