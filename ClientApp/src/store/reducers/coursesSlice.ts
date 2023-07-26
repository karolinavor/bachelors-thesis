import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CourseType } from "../../types/types"

export type UserLoading = `idle` | 'pending'

export interface CoursesSliceState {
  courses: CourseType[],
  loading: UserLoading
}

export const initialCoursesState: CoursesSliceState = {
  courses: [],
  loading: `idle`
}

export const fetchCoursesData = async () => {
  return await fetch(`/api/courses`, {
    method: `GET`,
  })
  .then(
    (response) => response.json())
  .then(
    (data) => {
      return data
    })
}

export const fetchCourses = createAsyncThunk(
  `courses/requestStatus`,
  async () => {
    const response = await fetchCoursesData()
    return response
  }
)

export const coursesSlice = createSlice({
  name: `courses`,
  initialState: initialCoursesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.fulfilled, (state, action) => {return {
      ...state, loading: `idle`, courses: action.payload
    }})
    builder.addCase(fetchCourses.pending, (state) => {return {
      ...state, loading: `pending`
    }})
  },
})

export const courses = (state: CoursesSliceState) => state

export default coursesSlice.reducer