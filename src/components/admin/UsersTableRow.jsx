import { useState } from 'react'
import useAuth from '../../hooks/useAuth'

const ROLE_STYLES = {
    ADMIN: 'bg-purple-100 text-purple-700',
    USER:  'bg-blue-100 text-blue-700',
}

const UsersTableRow = ({ user, onRoleChange, onDelete }) => {
    const { user: currentUser } = useAuth()
    const [confirmDelete, setConfirmDelete] = useState(false)

    // Prevent admin from changing their own role or deleting themselves
    const isSelf = user.id === currentUser?.id

    const toggleRole = () => {
        const newRole = user.role === 'ADMIN' ? 'USER' : 'ADMIN'
        onRoleChange(user.id, newRole)
    }

    return (
        <tr className="hover:bg-gray-50 transition-colors">

            {/* Name */}
            <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                        {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">
                            {user.name}
                            {isSelf && (
                                <span className="ml-2 text-xs text-gray-400">(you)</span>
                            )}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                </div>
            </td>

            {/* Role */}
            <td className="px-4 py-3">
                <span className={`
                    px-2.5 py-1 rounded-full text-xs font-semibold
                    ${ROLE_STYLES[user.role] || 'bg-gray-100 text-gray-700'}
                `}>
                    {user.role}
                </span>
            </td>

            {/* Jobs Count */}
            <td className="px-4 py-3 text-sm text-gray-600">
                {user._count?.jobs ?? 0}
            </td>

            {/* Joined */}
            <td className="px-4 py-3 text-sm text-gray-600">
                {new Date(user.createdAt).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                })}
            </td>

            {/* Actions */}
            <td className="px-4 py-3">
                {isSelf ? (
                    <span className="text-xs text-gray-400">—</span>
                ) : confirmDelete ? (
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Sure?</span>
                        <button
                            onClick={() => onDelete(user.id)}
                            className="text-xs text-red-600 font-medium hover:underline"
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => setConfirmDelete(false)}
                            className="text-xs text-gray-500 hover:underline"
                        >
                            No
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleRole}
                            className="text-xs text-purple-600 font-medium hover:underline"
                        >
                            Make {user.role === 'ADMIN' ? 'User' : 'Admin'}
                        </button>
                        <button
                            onClick={() => setConfirmDelete(true)}
                            className="text-xs text-red-500 font-medium hover:underline"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </td>

        </tr>
    )
}

export default UsersTableRow