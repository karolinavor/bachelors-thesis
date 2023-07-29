import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ModalSliceState {
  isOpen: boolean,
  type: null | string
  data?: {
    courseId?: number,
    newsId?: number,
    fileId?: number
  } | null
}

export interface ModalSliceOpenState {
  type: null | string
  data?: {
    courseId?: number,
    newsId?: number,
    fileId?: number
  } | null
}

export const modalSlice = createSlice({
  name: `modal`,
  initialState: {
    isOpen: false,
    type: null,
    data: null
  } as ModalSliceState,
  reducers: {
    modalOpen: (state, action: PayloadAction<ModalSliceOpenState>) => {
      state.isOpen = true
      state.type = action.payload.type
      state.data = action.payload.data
    },
    modalClose: (state) => {
      state.isOpen = false
      state.type = null
      state.data = null
    },
  },
})

export const { modalOpen, modalClose } = modalSlice.actions
export default modalSlice.reducer