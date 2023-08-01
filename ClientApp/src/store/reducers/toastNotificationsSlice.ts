import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { ToastNotificationItem } from "../../components/ToastNotification/ToastNotification"

export interface ToastNotificationSliceState {
  toastNotifications: ToastNotificationItem[]
}

export const toastNotificationSlice = createSlice({
  name: `toastNotifications`,
  initialState: {
    toastNotifications: []
  } as ToastNotificationSliceState,
  reducers: {
    toastNotificationAdd: (state, action: PayloadAction<ToastNotificationItem>) => {
      state.toastNotifications.push(action.payload)
    },
    toastNotificationRemove: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        notifications: state.toastNotifications.filter(item => item.notificationID !== action.payload)
      }
    },
  },
})

export const { toastNotificationAdd, toastNotificationRemove } = toastNotificationSlice.actions
export default toastNotificationSlice.reducer