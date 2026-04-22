import UsersTableRow from './UsersTableRow'
import Pagination from '../shared/Pagination'

const UsersTable = ({ users, loading, pagination, onPageChange, onRoleChange, onDelete }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-left px-4 py-3 font-medium text-gray-600">User</th>
                            <th className="text-left px-4 py-3 font-medium text-gray-600">Role</th>
                            <th className="text-left px-4 py-3 font-medium text-gray-600">Jobs</th>
                            <th className="text-left px-4 py-3 font-medium text-gray-600">Joined</th>
                            <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="text-center py-12 text-gray-400">
                                    Loading...
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-12 text-gray-400">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <UsersTableRow
                                    key={user.id}
                                    user={user}
                                    onRoleChange={onRoleChange}
                                    onDelete={onDelete}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {pagination && (
                <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    )
}

export default UsersTable