import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification } from '../features/notifications/notificationSlice';
import { setCredentials } from '../features/auth/authSlice';
import { SOCKET_URL } from '../app/config';

const SocketContext = createContext();

const SOCKET_EVENTS = {
    ROLE_UPDATED:        'role:updated',
    NEW_USER_REGISTERED: 'admin:new_user',
    JOB_STATUS_CHANGED:  'admin:job_status_changed',
    NOTIFICATION:        'notification',
};

export const SocketProvider = ({ children }) => {
    const dispatch = useDispatch();
    const { accessToken, isAuthenticated, user } = useSelector((state) => state.auth);
    const socketRef = useRef();
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // Only connect if authenticated and has accesstoken
        if(!isAuthenticated && !accessToken){
            // if disconnect on logout
            if(socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
                setIsConnected(false);
            }
            return;
        }

        // Don't create duplicate connection
        if(socketRef.current?.connected) return;

        // Create Socket Connection
        const socket = io(SOCKET_URL, {
                auth: {token: accessToken},
                transports: ['websockets', 'polling'],
                reconnectionAttempts: 5,      // stop after 5 tries
                reconnectionDelay: 2000,      // wait 2s between attempts
                timeout: 10000,               // connection timeout
            }
        );

        socketRef.current = socket;

        // connection events
        socket.on("connect", () => {
            setIsConnected(true);
        });

        socket.on("disconnect", () => {
            setIsConnected(false);
        });

        socket.on("connect_error", (error) => {
            console.error('Socket connection error:', error.message)
            setIsConnected(false)
            // If auth fails — don't keep retrying, token is invalid
            if (error.message === 'Authentication failed' ||
                error.message === 'Authentication required') {
                socket.disconnect()
            }
        });

        // When max reconnection attempts reached — stop trying
        socket.on('reconnect_failed', () => {
            console.log('Socket reconnection failed — giving up');
            setIsConnected(false);
        });

        // App Events
        // User's own role was changed by admin
        socket.on(SOCKET_EVENTS.ROLE_UPDATED, (data) => {
            dispatch(setCredentials({
               user: { ...user, role: data.newRole}, 
               accessToken
            }));

            dispatch(addNotification({
                id: Date.now(),
                message: data.message,
                type: 'role_updated',
                read: false,
                createdAt: new Date().toISOString(),
            }));
        });
        
        // New user registered — admin only
        socket.on(SOCKET_EVENTS.NEW_USER_REGISTERED, (data) => {
            dispatch(addNotification({
                id: Date.now(),
                message: data.message,
                type: 'new_user',
                read: false,
                createdAt: new Date().toISOString(),
            }));
        });

        // Job status changed — admin only
        socket.on(SOCKET_EVENTS.JOB_STATUS_CHANGED, (data) => {
            dispatch(addNotification({
                id: Date.now(),
                message: data.message,
                type: 'job_status',
                read: false,
                createdAt: new Date().toISOString(),
            }));
        });

        // Generic Notification
        socket.on(SOCKET_EVENTS.NOTIFICATION, (data) => {
            dispatch(addNotification({
                id: Date.now(),
                message: data.message,
                type: 'general',
                read: false,
                createdAt: new Date().toISOString(),
            }));
        });

        // CLeanup - disconnect when component unmount or auth changes
        return () => {
            socket.disconnect()
            socketRef.current = null
            setIsConnected(false)
        };
    }, [isAuthenticated, accessToken]);

    return (
        <SocketContext.Provider value={{ socket: socketRef.current, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);

