import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
          state.user = action.payload;
        },
        setToken: (state, action) => {
          state.token = action.payload;
        },
        logout: (state, action) => {
          state.user = null;
          state.token = null;
        }
    }
})

export const { setUserDetails, setToken, logout } = userSlice.actions;
export default userSlice.reducer;