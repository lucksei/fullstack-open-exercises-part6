import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

// Function that creates the 'reducer' and the 'action creators' with 
// the toolkit structure of 'name/reducerFunctionName'
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilter(state, action) {
      const filter = action.payload
      return filter
    }
  }
})

export const { changeFilter } = filterSlice.actions
export default filterSlice.reducer