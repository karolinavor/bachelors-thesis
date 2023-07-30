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

export const fetchCourses = createAsyncThunk(
  `courses/fetch`,
  async () => {
    const response = await fetchCoursesFromAPI()
    return response
  }
)

export const fetchCoursesFromAPI = async () => {
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

/*
export const addCourse = createAsyncThunk(
  `courses/add`,
  async (requestData, thunkAPI) => {
    const response = await addCoursesToAPI(requestData)
    return response
  }
)

export const addCoursesToAPI = async (requestData) => {
  return await fetch(`/api/course/add`, {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(requestData)
  });
}
*/

export const coursesSlice = createSlice({
  name: `courses`,
  initialState: initialCoursesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      return {
        ...state, loading: `idle`, courses: action.payload
      }
    })
    builder.addCase(fetchCourses.pending, (state) => {
      return {
        ...state, loading: `pending`
      }
    })
    /*
    builder.addCase(addCourse.fulfilled, (state, action) => {
      return {
        ...state, loading: `idle`, courses: action.payload
      }
    })
    builder.addCase(addCourse.pending, (state) => {
      return {
        ...state,
        loading: `pending`,
      }
    })
    */
  },
})

export const courses = (state: CoursesSliceState) => state

export default coursesSlice.reducer