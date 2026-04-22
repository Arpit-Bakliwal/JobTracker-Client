import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    notifications: [],
    unreadCount: 0,
}

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        // Add new notification from socket event
        addNotification: (state, action) => {
            state.notifications.unshift(action.payload)  // add to top
            state.unreadCount += 1
        },
        // Mark all as read — when user opens dropdown
        markAllRead: (state) => {
            state.unreadCount = 0
            state.notifications = state.notifications.map((n) => ({
                ...n,
                read: true,
            }))
        },
        // Clear all notifications
        clearNotifications: (state) => {
            state.notifications = []
            state.unreadCount = 0
        },
    },
})

export const { addNotification, markAllRead, clearNotifications } = notificationSlice.actions
export default notificationSlice.reducer