import { configureStore } from '@reduxjs/toolkit'
import userSlice from './rudecers/user.reducer'

// redux to prevent get user every render  // it may have no benefit in production
export const store = configureStore({
    reducer: {
        user: userSlice,
    },
})