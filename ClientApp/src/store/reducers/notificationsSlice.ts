import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { NewsType, NotificationType } from "../../types/types"

export type UserLoading = `idle` | 'pending'

export interface NotificationsSliceState {
  loading: UserLoading,
  notifications: NotificationType[]
}

export const initialNotificationsState: NotificationsSliceState = {
  loading: `idle`,
  notifications: []
}

export const fetchNotifications = createAsyncThunk(
  `notifications/fetch`,
  async (thunkAPI) => {
    const response = await fetchNotificationsFromAPI()
    return response
  }
)

export const fetchNotificationsFromAPI = async () => {
  return await fetch(`/api/notifications/get`, {
    method: `GET`,
  })
  .then(
    (response) => response.json())
  .then(
    (data) => {
      return data
    })
}

export const notificationsSlice = createSlice({
  name: `notifications`,
  initialState: initialNotificationsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      return {
        ...state, loading: `idle`,
        notifications: action.payload
      }
    })
    builder.addCase(fetchNotifications.pending, (state) => {
      return {
        ...state, loading: `pending`
      }
    })
  },
})

export const notifications = (state: NotificationsSliceState) => state

export default notificationsSlice.reducer