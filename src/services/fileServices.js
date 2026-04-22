import api from './api'

// ── Generic file downloader ────────────────────────────────────────────────
// Takes endpoint and filename, handles blob download
const downloadFile = async (endpoint, filename) => {
    const response = await api.get(endpoint, {
        responseType: 'blob',  
    })

    // Create blob URL from response data
    const blob = new Blob([response.data])
    const url = window.URL.createObjectURL(blob)

    // Create temporary anchor tag and trigger download
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()

    // Cleanup — remove link and revoke URL to free memory
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
}

// ── Export functions ───────────────────────────────────────────────────────
export const exportCSV = () =>
    downloadFile('/files/export/csv', `jobs-${new Date().toISOString().split('T')[0]}.csv`)

export const exportExcel = () =>
    downloadFile('/files/export/excel', `jobs-${new Date().toISOString().split('T')[0]}.xlsx`)

export const exportPDF = () =>
    downloadFile('/files/export/pdf', `jobs-${new Date().toISOString().split('T')[0]}.pdf`)