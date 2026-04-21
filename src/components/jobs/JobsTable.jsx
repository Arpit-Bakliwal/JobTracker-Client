import JobsTableRow from './JobsTableRow'
import Pagination from '../shared/Pagination'

const JobsTable = ({ jobs, loading, currentPage, totalPages, onPageChange, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-left px-4 py-3 font-medium text-gray-600">Company</th>
                            <th className="text-left px-4 py-3 font-medium text-gray-600">Job Title</th>
                            <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                            <th className="text-left px-4 py-3 font-medium text-gray-600">Location</th>
                            <th className="text-left px-4 py-3 font-medium text-gray-600">Applied</th>
                            <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="text-center py-12 text-gray-400">
                                    Loading...
                                </td>
                            </tr>
                        ) : jobs.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-12 text-gray-400">
                                    No jobs found. Add your first application!
                                </td>
                            </tr>
                        ) : (
                            jobs.map((job) => (
                                <JobsTableRow
                                    key={job.id}
                                    job={job}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </div>
    )
}

export default JobsTable