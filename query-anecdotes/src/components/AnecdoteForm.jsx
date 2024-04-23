import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createNote } from '../requests'
import { useNotificationDispatch } from '../components/NotificationContext'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newNoteMutation = useMutation({ 
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    if (!content) {
      return
    }
    if (content.length < 5) {
      dispatch({type: 'SHOW', payload: 'Anecdote must be at least 5 characters long'})
      return
    }
    newNoteMutation.mutate({ content, votes: 0})
    dispatch({type: 'SHOW', payload: `Created '${content}'`})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
