import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            // FIX: was action.payload.userdata (lowercase d) — should be userData
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            // FIX: was comma instead of semicolon
            state.userData = null;
        }
    }
})

// FIX: was authslice.action (missing 's') — should be authSlice.actions
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
