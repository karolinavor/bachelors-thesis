import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './reducers/modalSlice'
import coursesReducer from './reducers/coursesSlice'
import toastNotificationsReducer from './reducers/toastNotificationsSlice'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    courses: coursesReducer,
    notifications: toastNotificationsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector