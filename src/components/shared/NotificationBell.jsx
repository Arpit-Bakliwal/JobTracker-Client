import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { markAllRead, clearNotifications } from '../../features/notifications/notificationSlice'

const TYPE_ICONS = {
    role_updated: '🛡️',
    new_user:     '👤',
    job_status:   '💼',
    general:      '🔔',
}

const NotificationBell = () => {
    const dispatch = useDispatch()
    const { notifications, unreadCount } = useSelector((state) => state.notifications)
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleOpen = () => {
        setIsOpen((prev) => !prev)
        if (unreadCount > 0) dispatch(markAllRead())
    }

    return (
        <div className="relative" ref={dropdownRef}>

            {/* Bell Button */}
            <button
                onClick={handleOpen}
                className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            >
                <span className="text-xl">🔔</span>
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">

                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-900">
                            Notifications
                        </h3>
                        {notifications.length > 0 && (
                            <button
                                onClick={() => dispatch(clearNotifications())}
                                className="text-xs text-gray-400 hover:text-gray-600"
                            >
                                Clear all
                            </button>
                        )}
                    </div>

                    {/* Notification List */}
                    <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="text-center py-8 text-gray-400 text-sm">
                                No notifications yet
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`
                                        flex items-start gap-3 px-4 py-3
                                        border-b border-gray-50 last:border-0
                                        ${!notification.read ? 'bg-blue-50' : ''}
                                    `}
                                >
                                    <span className="text-lg shrink-0">
                                        {TYPE_ICONS[notification.type] || '🔔'}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-700">
                                            {notification.message}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-0.5">
                                            {new Date(notification.createdAt).toLocaleTimeString('en-IN', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </p>
                                    </div>
                                    {!notification.read && (
                                        <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0 mt-1" />
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                </div>
            )}
        </div>
    )
}

export default NotificationBell