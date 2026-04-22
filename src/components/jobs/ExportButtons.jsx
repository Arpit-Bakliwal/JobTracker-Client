import { useState, useRef } from 'react';
import { exportCSV, exportExcel, exportPDF } from '../../services/fileServices';
import api from '../../services/api';
import useUI from '../../hooks/useUI';

const EXPORT_BUTTONS = [
    { label: 'CSV',   icon: '📄', action: exportCSV },
    { label: 'Excel', icon: '📊', action: exportExcel },
    { label: 'PDF',   icon: '📑', action: exportPDF },
];

const ExportButtons = ({ onImportSuccess }) => {
    const { toastSuccess, toastError } = useUI();
    const [loadingType, setLoadingType] = useState(null);
    const fileInputRef = useRef();

    const handleExport = async (label, action) => {
        setLoadingType(label);
        try {
            await action();
            toastSuccess(`${label} exported successfully`);
        } catch (error) {
            toastError(`Failed to export ${label}`);
        } finally {
            setLoadingType(null);
        }
    };

    const handleImport = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Reset input so same file can be imported again
        e.target.value = '';

        setLoadingType('import');
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await api.post('/files/import/csv', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const { imported, skipped, failed, message } = response.data.data;

            toastSuccess(`${message} — Imported: ${imported}, Skipped: ${skipped}, Failed: ${failed}`);
            imported > 0 && onImportSuccess?.();  // refetch jobs in parent
        } catch (error) {
            toastError(error.response?.data?.message || 'Failed to import CSV');
        } finally {
            setLoadingType(null);
        }
    }

    return (
        <div className="flex items-center gap-2">
            {EXPORT_BUTTONS.map(({ label, icon, action }) => (
                <button
                    key={label}
                    onClick={() => handleExport(label, action)}
                    disabled={loadingType !== null}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <span>{icon}</span>
                    <span>{loadingType === label ? 'Exporting...' : label}</span>
                </button>
            ))}
            <button
                onClick={() => fileInputRef.current?.click()}
                disabled={loadingType !== null}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <span>📥</span>
                <span>{loadingType === 'import' ? 'Importing...' : 'Import CSV'}</span>
            </button>
            <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleImport}
                className="hidden"
            />
        </div>
    );
}

export default ExportButtons