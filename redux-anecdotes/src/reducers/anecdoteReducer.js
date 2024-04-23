import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice ({
  name: 'anecdotes',
  initialState: [],
  reducers: {
      addVote (state, action) {
        const id = action.payload
        return state.map(a => a.id !== id ? a : { ...a, votes: a.votes + 1 })
      },
      addAnecdote(state, action) {
        return [...state, action.payload]
      },
      setAnecdotes(state, action) {
        return action.payload
      }
    }
  }
)

export const { addVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch(setAnecdotes(notes))
  }
}

export const createNewAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnedote(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnAnecdote = id => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.voteAnecdote(id)
    dispatch(addVote(id))
  }
}

export default anecdoteSlice.reducer