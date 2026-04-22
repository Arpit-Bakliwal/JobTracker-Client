import { useState } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import NotificationBell from "./shared/NotificationBell";

import useAuth from '../hooks/useAuth'
import useUI from '../hooks/useUI'

// Navigate Links - admin links only visible to Admin
const getNavLinks = (role) => {
    const links = [
        { to: '/dashboard', label: 'Dashboard', icon: '📊' },
        { to: '/jobs', label: 'Jobs', icon: '💼' },
        { to: '/ai', label: 'AI Tools',   icon: '🤖' },
    ]

    if (role === 'ADMIN') {
        links.push({ to: '/admin', label: 'Admin', icon: '🛡️' })
    }

    return links
};

const Layout = () => {
    const navigate = useNavigate();
    const { user, handleLogout } = useAuth();
    const { toastSuccess } = useUI();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navLinks = getNavLinks(user?.role)

    const onLogout = async () => {
        await handleLogout();
        toastSuccess('Logged out successfully');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">

            {/* Sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-20 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <aside
                className={`
                    fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200
                    z-30 flex flex-col
                    transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0 lg:static lg:z-auto lg:h-screen
                `}
            >
                {/* Logo */}
                <div className="h-16 flex items-center px-6 border-b border-gray-200 shrink-0">
                    <span className="text-xl font-bold text-blue-600">
                        JobTracker
                    </span>
                </div>

                {/* Nav Links — grows to fill available space */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsSidebarOpen(false)}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-2.5 rounded-lg
                                text-sm font-medium transition-colors duration-150
                                ${isActive
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }
                            `}
                        >
                            <span>{link.icon}</span>
                            <span>{link.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* User info + logout — naturally pinned to bottom via flex */}
                <div className="p-4 border-t border-gray-200 shrink-0">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {user?.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onLogout}
                        className="w-full text-sm text-red-500 hover:text-red-600 hover:bg-red-50 py-2 rounded-lg transition-colors duration-150"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* ── Main Area ─────────────────────────────────────────── */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Navbar */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:px-6 gap-4">

                    {/* Hamburger — mobile only */}
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                    >
                        <span className="text-xl">☰</span>
                    </button>

                    <div className="flex-1" />
                    <NotificationBell />
                    {/* Role badge */}
                    <span className={`
                        text-xs font-semibold px-2.5 py-1 rounded-full
                        ${user?.role === 'ADMIN'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-blue-100 text-blue-700'
                        }
                    `}>
                        {user?.role}
                    </span>

                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-6 overflow-auto">
                    <Outlet />  {/* Dashboard / Jobs / AdminPanel renders here */}
                </main>

            </div>
        </div>
    )
};

export default Layout;