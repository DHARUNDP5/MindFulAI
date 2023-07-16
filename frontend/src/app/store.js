import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import jobReducer from '../features/jobs/jobSlice'
import applyReducer from '../features/apply/applySlice'
import profileReducer from '../features/profile/profileSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    apply: applyReducer,
    profile: profileReducer,
  },
})