import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CommentType, NewsType } from "../../types/types"

export type UserLoading = `idle` | 'pending'

export interface DashboardSliceState {
  loading: UserLoading,
  comments: CommentType[]
}

export const initialDashboardState: DashboardSliceState = {
  loading: `idle`,
  comments: []
}

export const fetchDashboardComments = createAsyncThunk(
  `latestComments/fetch`,
  async (thunkAPI) => {
    const response = await fetchDashboardCommentsFromAPI()
    return response
  }
)

export const fetchDashboardCommentsFromAPI = async () => {
  return await fetch(`/api/comments/latest`, {
    method: `GET`
  })
  .then(
    (response) => response.json())
  .then(
    (data) => {
      return data
    })
}

export const dashboardSlice = createSlice({
  name: `dashboard`,
  initialState: initialDashboardState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDashboardComments.fulfilled, (state, action) => {
      return {
        ...state, loading: `idle`,
        comments: action.payload
      }
    })
    builder.addCase(fetchDashboardComments.pending, (state) => {
      return {
        ...state, loading: `pending`
      }
    })
  },
})

export const dashboard = (state: DashboardSliceState) => state

export default dashboardSlice.reducer