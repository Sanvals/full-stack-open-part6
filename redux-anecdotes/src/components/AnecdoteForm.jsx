import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { arrangeNotification } from '../reducers/notificationReducer'

import noteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const anecdote = async (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        dispatch(createNewAnecdote(content))
        dispatch(arrangeNotification('New note created!', 5000))
    }

    return (
    <>
        <h2>create new</h2>
        <form onSubmit={anecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
        </form>
    </>
    )
}

export default AnecdoteForm