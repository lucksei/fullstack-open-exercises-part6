import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    addNotification(state, action) {
      const notification = action.payload
      return notification
    },
    clearNotification() {
      return initialState
    },
  },
})


export const { addNotification, clearNotification } = notificationSlice.actions

// Trying out thunks just because
export const setNotification = (text, time) => {
  return (dispatch) => {
    dispatch(addNotification(text))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 1000 * time)
  }
}

export default notificationSlice.reducer 