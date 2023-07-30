import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CommentType, FileType } from "../../types/types"

export type UserLoading = `idle` | 'pending'

export interface FileSliceState extends FileType {
  loading: UserLoading,
  comments: CommentType[]
}

export const initialFileState: FileSliceState = {
  loading: `idle`,
  courseFileID: 0,
  dateAdded: undefined,
  filetype: "",
  size: 0,
  numberOfDownloads: 0,
  notificationSet: false,
  courseID: 0,
  name: "",
  userID: 0,
  url: "",
  likes: 0,
  dislikes: 0,
  reacted: 0,
  comments: []
}

export const fetchFile = createAsyncThunk(
  `file/fetch`,
  async (courseFileID: number, thunkAPI) => {
    const response = await fetchFileFromAPI(courseFileID)
    return response
  }
)

export const fetchFileFromAPI = async (courseFileID) => {
  return await fetch(`/api/file/${courseFileID}/get`, {
    method: `GET`,
  })
  .then(
    (response) => response.json())
  .then(
    (data) => {
      return data
    })
}

export const fetchFileComments = createAsyncThunk(
  `fileComments/fetch`,
  async (courseFileID: number, thunkAPI) => {
    const response = await fetchFileCommentsFromAPI(courseFileID)
    return response
  }
)

export const fetchFileCommentsFromAPI = async (courseFileID) => {
  return await fetch(`/api/file/${courseFileID}/comments`, {
    method: `GET`,
  })
  .then(
    (response) => response.json())
  .then(
    (data) => {
      return data
    })
}

export const fileSlice = createSlice({
  name: `file`,
  initialState: initialFileState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFile.fulfilled, (state, action) => {
      return {
        ...state, loading: `idle`,
        courseFileID: action.payload.courseFileID,
        dateAdded: action.payload.dateAdded,
        filetype: action.payload.filetype,
        size: action.payload.size,
        numberOfDownloads: action.payload.numberOfDownloads,
        notificationSet: action.payload.notificationSet,
        courseID: action.payload.courseID,
        name: action.payload.name,
        userID: action.payload.userID,
        url: action.payload.url,
        likes: action.payload.likes,
        dislikes: action.payload.dislikes,
        reacted: action.payload.reacted,
      }
    })
    builder.addCase(fetchFile.pending, (state) => {
      return {
        ...state, loading: `pending`
      }
    })
    builder.addCase(fetchFileComments.fulfilled, (state, action) => {
      return {
        ...state, loading: `idle`,
        comments: action.payload
      }
    })
    builder.addCase(fetchFileComments.pending, (state) => {
      return {
        ...state, loading: `pending`
      }
    })
  },
})

export const file = (state: FileSliceState) => state

export default fileSlice.reducer