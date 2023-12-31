import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import jobService from './jobService'

const initialState = {
  jobs: [],
  assigned: [],
  recommend: [],
  completed: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const createJob = createAsyncThunk(
  'jobs/create',
  async (jobData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await jobService.createJob(jobData, token)
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

export const getJobs = createAsyncThunk(
  'jobs/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await jobService.getJobs(token)
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

export const deleteJob = createAsyncThunk(
  'jobs/delete',
  async (jobId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await jobService.deleteJob(jobId, token)
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

export const updateJob = createAsyncThunk(
  'jobs/update',
  async (jobId, jobData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await jobService.updateJob( jobId, jobData, token)
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

export const assignedJobs = createAsyncThunk(
  'jobs/assigned',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await jobService.assignedJobs(token)
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

export const recommendJobs = createAsyncThunk(
  'jobs/recommend',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await jobService.recommendJobs(token)
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

export const completeJob = createAsyncThunk(
  'jobs/complete',
  async (jobId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await jobService.completeJob(jobId, token)
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

export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.jobs.push(action.payload)
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getJobs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.jobs = action.payload
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.jobs = state.jobs.filter(
          (job) => job._id !== action.payload.id
        )
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })      
      .addCase(updateJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.jobs = action.payload
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })    
       .addCase(recommendJobs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(recommendJobs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.recommend = action.payload
      })
      .addCase(recommendJobs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(assignedJobs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(assignedJobs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.assigned = action.payload
      })
      .addCase(assignedJobs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(completeJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(completeJob.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.completed = action.payload
      })
      .addCase(completeJob.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })  
  },
})

export const { reset } = jobSlice.actions
export default jobSlice.reducer