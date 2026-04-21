import { useEffect } from 'react'
import useUI from '../hooks/useUI'

// Toast type styles
const TOAST_STYLES = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
}

const Toast = () => {
    const { toast, dismissToast } = useUI()

    // Auto dismiss after 3 seconds
    useEffect(() => {
        if (!toast) return

        const timer = setTimeout(() => {
            dismissToast()
        }, 3000)

        // Cleanup — if toast changes before 3s, clear previous timer
        return () => clearTimeout(timer)
    }, [toast])

    // Nothing to show
    if (!toast) return null

    return (
        <div className="fixed top-5 right-5 z-50 animate-fade-in">
            <div
                className={`
                    ${TOAST_STYLES[toast.type] || 'bg-gray-700'}
                    text-white px-5 py-3 rounded-lg shadow-lg
                    flex items-center gap-3 min-w-[250px] max-w-sm
                `}
            >
                {/* Message */}
                <span className="text-sm font-medium flex-1">
                    {toast.message}
                </span>

                {/* Close button */}
                <button
                    onClick={dismissToast}
                    className="text-white/80 hover:text-white text-lg leading-none"
                >
                    ✕
                </button>
            </div>
        </div>
    )
}

export default Toast