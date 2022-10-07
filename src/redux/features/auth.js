import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLogged: false,
    email: null,
    displayName: null,
    userID: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setActiveUser: (state, action) => {
            const { email, displayName, userID } = action.payload;

            state.isLogged = true;
            state.email = email;
            state.userID = userID;
            if (displayName === null) {
                state.displayName = email;
            } else {
                state.displayName = displayName;
            }
        },
        clearActiveUser: (state) => {
            state.isLogged = false;
            state.email = null;
            state.displayName = null;
            state.userID = null;
        },
    },
});

export const { setActiveUser, clearActiveUser } = authSlice.actions;

export default authSlice.reducer;
