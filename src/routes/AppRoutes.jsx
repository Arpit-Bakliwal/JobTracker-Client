import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute, AdminRoute, GuestRoute } from "./ProtectedRouts";
import Layout from '../components/Layout';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Jobs from '../pages/Jobs';
import AdminPanel from '../pages/AdminPanel';
import NotFound from '../pages/NotFound';
import AITools from '../pages/AITools';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Default redirects */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />

                {/* Guest Only */}
                <Route element={<GuestRoute />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                {/* Protected — must be logged in */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/jobs" element={<Jobs />} />
                        <Route path="/ai" element={<AITools />} />
                        {/* Admin only — must be logged in + ADMIN role */}
                        <Route element={<AdminRoute />}>
                            <Route path="/admin" element={<AdminPanel />} />
                        </Route>
                    </Route>

                </Route>


                {/* 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
};

export default AppRoutes;