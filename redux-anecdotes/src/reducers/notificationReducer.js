import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice ({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification (state, action) {
            return action.payload
            },
        clearNotification (state, action) {
            return null
            }
        }
    }
)

export const { setNotification, clearNotification } = notificationSlice.actions

export const arrangeNotification = (comment, time) => {
    return async dispatch => {
        dispatch(setNotification(comment))
        setTimeout(() => dispatch(clearNotification()), time)
    }
}

export default notificationSlice.reducer