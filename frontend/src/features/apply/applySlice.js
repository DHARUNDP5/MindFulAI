import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import applyService from './applyService'

const initialState = {
  apply: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const createApply = createAsyncThunk(
  'apply/create',
  async (applyData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await applyService.createApply(applyData, token)
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

export const getApplys = createAsyncThunk(
  'apply/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await applyService.getApply(token)
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

export const applySlice = createSlice({
  name: 'apply',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createApply.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createApply.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.apply.push(action.payload)
      })
      .addCase(createApply.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getApplys.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getApplys.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.apply = action.payload
      })
      .addCase(getApplys.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })   
  },
})

export const { reset } = applySlice.actions
export default applySlice.reducer