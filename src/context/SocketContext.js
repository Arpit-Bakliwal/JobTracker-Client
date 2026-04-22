import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from '../features/notifications/notificationSlice'
import { setCredentials } from '../features/auth/authSlice'

const SocketContext;