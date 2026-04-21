import { useState } from "react"

const STATUS_STYLES = {
    APPLIED:      'bg-blue-100 text-blue-700',
    INTERVIEWING: 'bg-yellow-100 text-yellow-700',
    OFFERED:      'bg-green-100 text-green-700',
    REJECTED:     'bg-red-100 text-red-700',
    WITHDRAWN:    'bg-gray-100 text-gray-700',
}

const JobsTableRow = ({ job, onEdit, onDelete }) => {
    const [confirmDelete, setConfirmDelete] = useState(false)

    return (
        <tr className="hover:bg-gray-50 transition-colors">

            {/* Company */}
            <td className="px-4 py-3 font-medium text-gray-900">
                {job.jobUrl ? (
                    <a
                        href={job.jobUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 hover:underline"
                    >
                        {job.company}
                    </a>
                ) : (
                    job.company
                )}
            </td>

            {/* Role */}
            <td className="px-4 py-3 text-gray-700">{job.title}</td>

            {/* Status */}
            <td className="px-4 py-3">
                <span className={`
                    px-2.5 py-1 rounded-full text-xs font-semibold
                    ${STATUS_STYLES[job.status] || 'bg-gray-100 text-gray-700'}
                `}>
                    {job.status}
                </span>
            </td>

            {/* Location */}
            <td className="px-4 py-3 text-gray-600">
                {job.location || '—'}
            </td>

            {/* Applied Date */}
            <td className="px-4 py-3 text-gray-600">
                {job.appliedAt
                    ? new Date(job.appliedAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                    })
                    : '—'
                }
            </td>

            {/* Actions */}
            <td className="px-4 py-3">
                {confirmDelete ? (
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Sure?</span>
                        <button
                            onClick={() => onDelete(job.id)}
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
                            onClick={() => onEdit(job)}
                            className="text-blue-600 hover:underline text-xs font-medium"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => setConfirmDelete(true)}
                            className="text-red-500 hover:underline text-xs font-medium"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </td>

        </tr>
    )
}

export default JobsTableRow