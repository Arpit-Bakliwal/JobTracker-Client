const API_BASE_URL = import.meta.env.VITE_API_URL;
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || window.location.origin;

export {
    API_BASE_URL,
    SOCKET_URL,
}