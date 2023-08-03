import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { NewsType } from "../../types/types"

export type UserLoading = `idle` | 'pending'

export interface NewsSliceState {
  loading: UserLoading,
  news: NewsType[]
}

export const initialNewsState: NewsSliceState = {
  loading: `idle`,
  news: []
}

export const fetchLatestNews = createAsyncThunk(
  `latestNews/fetch`,
  async (thunkAPI) => {
    const response = await fetchLatestNewsFromAPI()
    return response
  }
)

export const fetchLatestNewsFromAPI = async () => {
  return await fetch(`/api/news`, {
    method: `GET`
  })
  .then(
    (response) => response.json())
  .then(
    (data) => {
      return data
    })
}

export const fetchAllNews = createAsyncThunk(
  `allNews/fetch`,
  async (thunkAPI) => {
    const response = await fetchAllNewsFromAPI()
    return response
  }
)

export const fetchAllNewsFromAPI = async () => {
  return await fetch(`/api/news/all`, {
    method: `GET`,
  })
  .then(
    (response) => response.json())
  .then(
    (data) => {
      return data
    })
}

export const newsSlice = createSlice({
  name: `news`,
  initialState: initialNewsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLatestNews.fulfilled, (state, action) => {
      return {
        ...state, loading: `idle`,
        news: action.payload
      }
    })
    builder.addCase(fetchLatestNews.pending, (state) => {
      return {
        ...state, loading: `pending`
      }
    })
    builder.addCase(fetchAllNews.fulfilled, (state, action) => {
      return {
        ...state, loading: `idle`,
        news: action.payload
      }
    })
    builder.addCase(fetchAllNews.pending, (state) => {
      return {
        ...state, loading: `pending`
      }
    })
  },
})

export const news = (state: NewsSliceState) => state

export default newsSlice.reducer