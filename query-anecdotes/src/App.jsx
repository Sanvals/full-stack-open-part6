import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getNotes, updateNote } from './requests'

import { useNotificationDispatch } from './components/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getNotes,
    retry: 1,
    })  
    console.log(JSON.parse(JSON.stringify(result)))
  if ( result.status === 'pending' ) {
    return <div>loading data...</div>
  }
  if ( result.status === 'error' ) {
    return <div>Error found: {result.error.message}</div>
  }
  const anecdotes = result.data
  
  const voteNote = (anecdote) => {
    console.log('vote', anecdote.id)
    updateNoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    dispatch({type: 'SHOW', payload: `Voted for '${anecdote.content}'`})
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteNote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
