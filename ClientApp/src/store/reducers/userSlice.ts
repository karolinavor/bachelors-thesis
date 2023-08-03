import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { UserType } from "../../types/types"

export type UserLoading = `idle` | 'pending'

export interface UserSliceState extends UserType {
  loading: UserLoading,
}

export const initialUserState: UserSliceState = {
  loading: `idle`,
  userID: 0,
  username: "",
  email: "",
  isAdmin: false
}

export const fetchUser = createAsyncThunk(
  `user/fetch`,
  async (thunkAPI) => {
    const response = await fetchUserFromAPI()
    return response
  }
)

export const fetchUserFromAPI = async () => {
  return await fetch(`/api/user`, {
    method: `GET`
  })
  .then(
    (response) => response.json())
  .then(
    (data) => {
      return data
    })
}

export const userSlice = createSlice({
  name: `file`,
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      return {
        ...state, loading: `idle`, ...action.payload
      }
    })
    builder.addCase(fetchUser.pending, (state) => {
      return {
        ...state, loading: `pending`
      }
    })
  },
})

export const user = (state: UserSliceState) => state

export default userSlice.reducer