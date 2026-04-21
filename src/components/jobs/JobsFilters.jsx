const JOB_STATUSES = ['APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED', 'WITHDRAWN']

const JobsFilters = ({ searchInput, status, onSearchChange, onStatusChange }) => {
    return (
        <div className="flex gap-3 flex-wrap">
            <input
                type="text"
                placeholder="Search company or role..."
                value={searchInput}
                onChange={(e) => onSearchChange(e.target.value)}
                className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
                value={status}
                onChange={(e) => onStatusChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Statuses</option>
                {JOB_STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                ))}
            </select>
        </div>
    )
}

export default JobsFilters