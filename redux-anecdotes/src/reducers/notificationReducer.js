import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    setNotification(state, action) {
      const notification = action.payload
      return notification
    },
    removeNotification() {
      return initialState
    },
  },
})


export const { setNotification, removeNotification } = notificationSlice.actions

// Trying out thunks just because
export const showNotification = (text) => {
  return (dispatch) => {
    dispatch(setNotification(text))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 1000)
  }
}

export default notificationSlice.reducer 