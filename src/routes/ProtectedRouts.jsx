import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// Protected Routes - render children if user is authenticated
// Redirect to /login if not
export const ProtectedRoute = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// Admin Route
// Renders children if user is authenticated AND is ADMIN
// Redirects to /dashboard if logged in but not admin
// Redirects to /login if not logged in at all
export const AdminRoute = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (user?.role !== "ADMIN") {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

// ─── Guest Route ───────────────────────────────────────────────────────────
// Renders children if user is NOT authenticated
// Redirects to /dashboard if already logged in
// Prevents logged in user from accessing /login or /register
export const GuestRoute = () => {
    const { isAuthenticated } = useSelector((state) => state.auth)

    return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />
};