import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdotes'

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

const sortAnecdotes = (anecdotes) => {
  return anecdotes.sort((a, b) => (
    b.votes - a.votes
  ))
}

const anecdoteSlice = createSlice({
  name: 'anectode',
  initialState: [],
  reducers: {
    // voteAnecdote(state, action) {
    //   const id = action.payload
    //   const anecdoteToChange = state.find(n => n.id === id)
    //   const changedAnecdote = {
    //     ...anecdoteToChange,
    //     votes: anecdoteToChange.votes + 1
    //   }
    //   return sortAnecdotes(state.map(anecdote => anecdote.id !== id
    //     ? anecdote
    //     : changedAnecdote
    //   ))
    // },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(sortAnecdotes(anecdotes)))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const state = getState().anecdotes

    const anecdoteToChange = state.find(n => n.id === id)

    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }

    const updatedAnecdote = await anecdoteService.update(changedAnecdote)
    const updatedAnecdotes = sortAnecdotes(state.map(anecdote => anecdote.id !== id
      ? anecdote
      : updatedAnecdote
    ))

    dispatch(setAnecdotes(sortAnecdotes(updatedAnecdotes)))
  }
}

export default anecdoteSlice.reducer
