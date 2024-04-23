import { createContext, useReducer, useContext, useEffect } from "react";
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.payload
    case 'HIDE':
      return null
    case 'ERROR':
      return `Anecdote must be more than 5 characters`
    default:
      return null
  }
};

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  return (
      <NotificationContext.Provider value={[notification, notificationDispatch]} >
          {props.children}
      </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const [dispatch] = useContext(NotificationContext)
  return dispatch
}

export const useNotificationDispatch = () => {
  const [, dispatch] = useContext(NotificationContext)
  
  setTimeout(() => {
      dispatch({ type: 'HIDE' })
  }, 5000)
  
  return dispatch
}

export default NotificationContext