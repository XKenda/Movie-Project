import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {}
    },
    reducers: {
        setUserState: (state, action) => {
            state.user = action.payload
        }
    }
})

export const {setUserState} = userSlice.actions;
export default userSlice.reducer;