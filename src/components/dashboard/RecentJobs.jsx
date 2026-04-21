const STATUS_STYLES = {
    APPLIED:   'bg-blue-100 text-blue-700',
    SCREENING: 'bg-purple-100 text-purple-700',
    INTERVIEW: 'bg-yellow-100 text-yellow-700',
    OFFER:     'bg-green-100 text-green-700',
    REJECTED:  'bg-red-100 text-red-700',
    WITHDRAWN: 'bg-gray-100 text-gray-700',
}

const RecentJobs = ({ jobs }) => {
    if (!jobs?.length) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h2 className="text-base font-semibold text-gray-900 mb-4">
                    Recent Applications
                </h2>
                <p className="text-sm text-gray-400 text-center py-6">
                    No applications yet. Add your first job!
                </p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
                Recent Applications
            </h2>
            <div className="divide-y divide-gray-100">
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        className="flex items-center justify-between py-3"
                    >
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {job.company}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {job.title}
                            </p>
                        </div>
                        <div className="flex items-center gap-3 ml-4 shrink-0">
                            <span className={`
                                px-2.5 py-1 rounded-full text-xs font-semibold
                                ${STATUS_STYLES[job.status] || 'bg-gray-100 text-gray-700'}
                            `}>
                                {job.status}
                            </span>
                            <span className="text-xs text-gray-400">
                                {job.appliedAt
                                    ? new Date(job.appliedAt).toLocaleDateString('en-IN', {
                                        day: '2-digit',
                                        month: 'short',
                                    })
                                    : '—'
                                }
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecentJobs