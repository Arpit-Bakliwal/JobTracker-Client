import { useDispatch, useSelector } from "react-redux";
import { login, register, logout } from "../features/auth/authThunks";

const useAuth = () => {
    const dispatch = useDispatch();
    const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);

    const handleLogin = (credentials) => dispatch(login(credentials));
    const handleRegister = (userData) => dispatch(register(userData));
    const handleLogout = () => dispatch(logout());

    return{
        user,
        isAuthenticated,
        loading,
        error,
        handleLogin,
        handleRegister,
        handleLogout
    };
};

export default useAuth;