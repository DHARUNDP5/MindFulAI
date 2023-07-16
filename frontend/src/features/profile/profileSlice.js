import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import profileService from './profileService'

const initialState = {
  profile: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const createProfile = createAsyncThunk(
  'profile/create',
  async (profileData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await profileService.createProfile(profileData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getProfile = createAsyncThunk(
  'profile/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await profileService.getProfile(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateProfile = createAsyncThunk(
  'profile/update',
  async (profileData, profileId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await profileService.updateProfile(profileData, profileId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.profile.push(action.payload)
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.profile = action.payload
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.profile = action.payload
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })    
  },
})

export const { reset } = profileSlice.actions
export default profileSlice.reducer