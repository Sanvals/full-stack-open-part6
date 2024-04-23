import { useSelector, useDispatch } from 'react-redux'
import { voteAnAnecdote } from '../reducers/anecdoteReducer'
import { arrangeNotification } from '../reducers/notificationReducer'
import anecdoteReducer from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter === 'ALL') {
      return state.anecdotes;
    }
    return state.anecdotes.filter(a => 
      a.content.includes(state.filter)
    );
   });

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnAnecdote(id))
    dispatch(arrangeNotification(`You voted ${anecdotes.filter(a => a.id === id)[0].content}`, 5000))
  }
  
  const orderedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)  

  return (
      <>
      <div>
        {orderedAnecdotes.map(a => (
          <div key={a.id}>
            <div>
              {a.content}
            </div>
            <div>
              has {a.votes}
              <button onClick={() => vote(a.id)}>vote</button>
            </div>
          </div>
      ))}
      </div>
      </>
  )
}

export default AnecdoteList