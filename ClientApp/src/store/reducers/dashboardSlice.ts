import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CommentType, CourseType, FileType, NewsType } from "../../types/types"

export type UserLoading = `idle` | 'pending'

export interface DashboardSliceState {
  loading: UserLoading,
  comments: CommentType[],
  courses: CourseType[],
  files: FileType[]
}

export const initialDashboardState: DashboardSliceState = {
  loading: `idle`,
  comments: [],
  courses: [],
  files: []
}

export const fetchDashboardComments = createAsyncThunk(
  `dashComments/fetch`,
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

export const fetchDashboardCourses = createAsyncThunk(
  `dashCourses/fetch`,
  async (thunkAPI) => {
    const response = await fetchDashboardCoursesFromAPI()
    return response
  }
)

export const fetchDashboardCoursesFromAPI = async () => {
  return await fetch(`/api/courses/latest`, {
    method: `GET`
  })
  .then(
    (response) => response.json())
  .then(
    (data) => {
      return data
    })
}

export const fetchDashboardFiles = createAsyncThunk(
  `dashFiles/fetch`,
  async (thunkAPI) => {
    const response = await fetchDashboardFilesFromAPI()
    return response
  }
)

export const fetchDashboardFilesFromAPI = async () => {
  return await fetch(`/api/files/latest`, {
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
    builder.addCase(fetchDashboardCourses.fulfilled, (state, action) => {
      return {
        ...state, loading: `idle`,
        courses: action.payload
      }
    })
    builder.addCase(fetchDashboardCourses.pending, (state) => {
      return {
        ...state, loading: `pending`
      }
    })
    builder.addCase(fetchDashboardFiles.fulfilled, (state, action) => {
      return {
        ...state, loading: `idle`,
        files: action.payload
      }
    })
    builder.addCase(fetchDashboardFiles.pending, (state) => {
      return {
        ...state, loading: `pending`
      }
    })
  },
})

export const dashboard = (state: DashboardSliceState) => state

export default dashboardSlice.reducer