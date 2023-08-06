import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CommentType, FileType } from "../../types/types"
import { FetchNumberOfFiles } from "./courseSlice"

export type UserLoading = `idle` | 'pending'

export interface FileSliceState extends FileType {
  loading: UserLoading,
  comments: CommentType[],
  numberOfComments: number
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
  comments: [],
  username: "",
  description: "",
  numberOfComments: 0
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
  async (data: FetchNumberOfFiles, thunkAPI) => {
    const response = await fetchFileCommentsFromAPI(data)
    return response
  }
)

export const fetchFileCommentsFromAPI = async (data) => {
  let fetchData = {
    showComments: data.showItems
  }

  return await fetch(`/api/file/${data.id}/comments`, {
    method: `POST`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(fetchData)
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
        ...state, loading: `idle`, ...action.payload
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
        comments: action.payload.comments,
        numberOfComments: action.payload.numberOfComments
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