const JobsHeader = ({ onAddClick }) => {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
                <p className="text-sm text-gray-500 mt-0.5">
                    Track your job applications
                </p>
            </div>
            <button
                onClick={onAddClick}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
            >
                + Add Job
            </button>
        </div>
    )
}

export default JobsHeader