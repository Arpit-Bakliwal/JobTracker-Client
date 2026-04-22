import { useEffect, useState } from 'react'
import useAdmin from '../hooks/useAdmin'
import useUI from '../hooks/useUI'
import UsersTable from '../components/admin/UsersTable'

const AdminPanel = () => {
    const {
        users,
        pagination,
        loading,
        handleFetchUsers,
        handleUpdateRole,
        handleDeleteUser,
    } = useAdmin()
    const { toastSuccess, toastError } = useUI()
    const [page, setPage] = useState(1)

    useEffect(() => {
        handleFetchUsers({ page, limit: 10 })
    }, [page])

    const onRoleChange = async (id, role) => {
        const result = await handleUpdateRole(id, role)
        if (result.meta.requestStatus === 'fulfilled') {
            toastSuccess('Role updated successfully')
        } else {
            toastError('Failed to update role')
        }
    }

    const onDelete = async (id) => {
        const result = await handleDeleteUser(id)
        if (result.meta.requestStatus === 'fulfilled') {
            toastSuccess('User deleted')
        } else {
            toastError('Failed to delete user')
        }
    }

    return (
        <div className="space-y-5">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-500 mt-0.5">
                    Manage users and roles
                </p>
            </div>

            {/* Stats bar */}
            <div className="bg-white rounded-xl border border-gray-200 px-5 py-4">
                <p className="text-sm text-gray-600">
                    Total users —
                    <span className="font-semibold text-gray-900 ml-1">
                        {pagination?.total ?? 0}
                    </span>
                </p>
            </div>

            {/* Users Table */}
            <UsersTable
                users={users}
                loading={loading}
                pagination={pagination}
                onPageChange={setPage}
                onRoleChange={onRoleChange}
                onDelete={onDelete}
            />

        </div>
    )
}

export default AdminPanel