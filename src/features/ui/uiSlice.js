import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    toast: null,       // { message, type: 'success' | 'error' | 'info' }
    isModalOpen: false,
    modalType: null,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        showToast: (state, action) => {
            state.toast = action.payload
        },
        clearToast: (state) => {
            state.toast = null
        },
        openModal: (state, action) => {
            state.isModalOpen = true
            state.modalType = action.payload
        },
        closeModal: (state) => {
            state.isModalOpen = false
            state.modalType = null
        },
    },
})

export const { showToast, clearToast, openModal, closeModal } = uiSlice.actions
export default uiSlice.reducer