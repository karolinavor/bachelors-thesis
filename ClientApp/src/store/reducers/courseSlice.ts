import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CommentType, CourseType, FileType } from "../../types/types"

export type UserLoading = `idle` | 'pending'

export interface CourseSliceState extends CourseType {
  loading: UserLoading,
  files: FileType[],
  comments: CommentType[]
}

export const initialCourseState: CourseSliceState = {
  loading: `idle`,
  courseID: 0,
  dateAdded: undefined,
  short: "",
  title: "",
  notificationSet: false,
  files: [],
  comments: []
}

export const fetchCourse = createAsyncThunk(
  `course/fetch`,
  async (courseID: number, thunkAPI) => {
    const response = await fetchCourseFromAPI(courseID)
    return response
  }
)

export const fetchCourseFromAPI = async (courseID) => {
  return await fetch(`/api/course/${courseID}/get`, {
    method: `GET`,
  })
  .then(
    (response) => response.json())
  .then(
    (data) => {
      return data
    })
}

export const fetchCourseFiles = createAsyncThunk(
  `courseFiles/fetch`,
  async (courseID: number, thunkAPI) => {
    const response = await fetchCourseFilesFromAPI(courseID)
    return response
  }
)

export const fetchCourseFilesFromAPI = async (courseID) => {
  return await fetch(`/api/course/${courseID}/files`, {
    method: `GET`,
  })
  .then(
    (response) => response.json())
  .then(
    (data) => {
      return data
    })
}

export const fetchCourseComments = createAsyncThunk(
  `courseComments/fetch`,
  async (courseID: number, thunkAPI) => {
    const response = await fetchCourseCommentsFromAPI(courseID)
    return response
  }
)

export const fetchCourseCommentsFromAPI = async (courseID) => {
  return await fetch(`/api/course/${courseID}/comments`, {
    method: `GET`,
  })
  .then(
    (response) => response.json())
  .then(
    (data) => {
      return data
    })
}

export const courseSlice = createSlice({
  name: `course`,
  initialState: initialCourseState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourse.fulfilled, (state, action) => {
      return {
        ...state, loading: `idle`,
        courseID: action.payload.courseID,
        dateAdded: action.payload.dateAdded,
        short: action.payload.short,
        title: action.payload.title,
        notificationSet: action.payload.notificationSet,
      }
    })
    builder.addCase(fetchCourse.pending, (state) => {
      return {
        ...state, loading: `pending`
      }
    })
    builder.addCase(fetchCourseFiles.fulfilled, (state, action) => {
      return {
        ...state, loading: `idle`,
        files: action.payload
      }
    })
    builder.addCase(fetchCourseFiles.pending, (state) => {
      return {
        ...state, loading: `pending`
      }
    })
    builder.addCase(fetchCourseComments.fulfilled, (state, action) => {
      return {
        ...state, loading: `idle`,
        comments: action.payload
      }
    })
    builder.addCase(fetchCourseComments.pending, (state) => {
      return {
        ...state, loading: `pending`
      }
    })
  },
})

export const course = (state: CourseSliceState) => state

export default courseSlice.reducer