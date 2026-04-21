import { useDispatch, useSelector } from "react-redux";
import { showToast, clearToast, openModal, closeModal  } from "../features/ui/uiSlice";

const useUi = () => {
    const dispatch = useDispatch();
    const { toast, isModalOpen, modalType } = useSelector((state) => state.ui);

    const toastSuccess = (message) => dispatch(showToast({ message, type: "success" }));
    const toastError = (message) => dispatch(showToast({ message, type: "error" }));
    const toastInfo = (message) => dispatch(showToast({ message, type: "info" }));
    const dismissToast = () => dispatch(clearToast());

    const handleOpenModal = (type) => dispatch(openModal(type));
    const handleCloseModal = () => dispatch(closeModal());

    return {
        toast,
        isModalOpen,
        modalType,
        toastSuccess,
        toastError,
        toastInfo,
        dismissToast,
        handleOpenModal,
        handleCloseModal,
    };
 }

 export default useUi;