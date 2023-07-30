import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CommentType, FileType } from "../../types/types"

export type UserLoading = `idle` | 'pending'

export interface FileSliceState extends FileType {
  loading: UserLoading,
  comments: CommentType[]
}

export const initialFileState: FileSliceState = {
  loading: `idle`,
  courseFileId: 0,
  dateAdded: undefined,
  filetype: "",
  size: 0,
  numberOfDownloads: 0,
  notificationSet: false,
  courseId: 0,
  name: "",
  userId: 0,
  url: "",
  likes: 0,
  dislikes: 0,
  reacted: false,
  comments: []
}

export const fetchFile = createAsyncThunk(
  `file/fetch`,
  async (fileId: number, thunkAPI) => {
    const response = await fetchFileFromAPI(fileId)
    return response
  }
)

export const fetchFileFromAPI = async (fileId) => {
  return await fetch(`/api/file/${fileId}/get`, {
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
  async (fileId: number, thunkAPI) => {
    const response = await fetchFileCommentsFromAPI(fileId)
    return response
  }
)

export const fetchFileCommentsFromAPI = async (fileId) => {
  return await fetch(`/api/file/${fileId}/comments`, {
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
        courseFileId: action.payload.courseFileId,
        dateAdded: action.payload.dateAdded,
        filetype: action.payload.filetype,
        size: action.payload.size,
        numberOfDownloads: action.payload.numberOfDownloads,
        notificationSet: action.payload.notificationSet,
        courseId: action.payload.courseId,
        name: action.payload.name,
        userId: action.payload.userId,
        url: action.payload.url,
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