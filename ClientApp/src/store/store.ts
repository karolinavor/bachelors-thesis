import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './reducers/modalSlice'
import coursesReducer from './reducers/coursesSlice'
import courseReducer from './reducers/courseSlice'
import fileReducer from './reducers/fileSlice'
import newsReducer from './reducers/newsSlice'
import userReducer from './reducers/userSlice'
import dashboardReducer from './reducers/dashboardSlice'
import notificationsReducer from './reducers/notificationsSlice'
import toastNotificationsReducer from './reducers/toastNotificationsSlice'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    courses: coursesReducer,
    course: courseReducer,
    file: fileReducer,
    news: newsReducer,
    user: userReducer,
    dashboard: dashboardReducer,
    notifications: notificationsReducer,
    toastNotifications: toastNotificationsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector