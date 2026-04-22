import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, updateUserRole, deleteUser } from "../features/admin/adminThunks";

const useAdmin = () => {
    const dispatch = useDispatch();
    const { users, pagination, loading, error } = useSelector((state) => state.admin);

    const handleFetchUsers = (params) => dispatch(fetchUsers(params));
    const handleUpdateRole = (id, role) => dispatch(updateUserRole({id, role}));
    const handleDeleteUser = (id) => dispatch(deleteUser(id));

    return {
        users,
        pagination,
        loading,
        error,
        handleFetchUsers,
        handleUpdateRole,
        handleDeleteUser,
    };
};

export default useAdmin;