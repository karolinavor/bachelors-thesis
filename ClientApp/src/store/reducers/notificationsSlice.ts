import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { NotificationType } from "../../types/types"

export type UserLoading = `idle` | 'pending'

export interface NotificationsSliceState {
  notifications: NotificationType[],
  loading: UserLoading
}

export const initialNotificationsState: NotificationsSliceState = {
  notifications: [],
  loading: `idle`
}

export const fetchNotificationsData = async () => {
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

export const fetchNotifications = createAsyncThunk(
  `notifications/requestStatus`,
  async () => {
    const response = await fetchNotificationsData()
    return response
  }
)

export const notificationsSlice = createSlice({
  name: `notifications`,
  initialState: initialNotificationsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {return {
      ...state, loading: `idle`, notifications: action.payload
    }})
    builder.addCase(fetchNotifications.pending, (state) => {return {
      ...state, loading: `pending`
    }})
  },
})

export const notifications = (state: NotificationsSliceState) => state

export default notificationsSlice.reducer