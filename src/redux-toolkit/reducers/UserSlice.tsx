import { createSlice ,PayloadAction } from "@reduxjs/toolkit";

interface UserState{
    data: any|null;
    loading: boolean;
    error: string|null;
}

const initialState: UserState = {
    data: null,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getUserSuccess: (state, action: PayloadAction<any>) => {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        },
        getUserFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { getUserStart, getUserSuccess, getUserFailure } = userSlice.actions;

export default userSlice.reducer;