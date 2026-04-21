import { useState, useEffect } from 'react'

const JOB_STATUSES = ['APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'REJECTED', 'WITHDRAWN'];

const INITIAL_FORM = {
    company: '',
    title: '',
    status: 'APPLIED',
    jobUrl: '',
    location: '',
    salary: '',
    notes: '',
    appliedAt: '',
};

const JobModal = ({ isOpen, onClose, onSubmit, job = null }) => {
    // job prop — if passed, we are in EDIT mode. if null, ADD mode.
    const isEditMode = Boolean(job);
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [isLoading, setIsLoading] = useState(false);

    // When job prop changes — populate form for edit mode
    // When job is null — reset form for add mode
    useEffect(() => {
        if (job) {
            setFormData({
                company: job.company || '',
                role: job.title || '',
                status: job.status || 'APPLIED',
                jobUrl: job.jobUrl || '',
                location: job.location || '',
                salary: job.salary || '',
                notes: job.notes || '',
                appliedAt: job.appliedAt
                    ? new Date(job.appliedAt).toISOString().split('T')[0]
                    : '',
            });
        } else {
            setFormData(INITIAL_FORM);
        }
    }, [job, isOpen])  // re-run when modal opens or job changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await onSubmit(formData);
        setIsLoading(false);
    };

    // Close on backdrop click
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {isEditMode ? 'Edit Job' : 'Add New Job'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                    >
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">

                    {/* Company + Role — side by side */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Company <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="company"
                                type="text"
                                required
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Company Name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Role <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="role"
                                type="text"
                                required
                                value={formData.role}
                                onChange={handleChange}
                                placeholder="Designation"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Status + Applied Date — side by side */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {JOB_STATUSES.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Applied Date
                            </label>
                            <input
                                name="appliedAt"
                                type="date"
                                value={formData.appliedAt}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                        </label>
                        <input
                            name="location"
                            type="text"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Bangalore / Remote"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Salary */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Salary
                        </label>
                        <input
                            name="salary"
                            type="text"
                            value={formData.salary}
                            onChange={handleChange}
                            placeholder="20-30 LPA"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Job URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Job URL
                        </label>
                        <input
                            name="jobUrl"
                            type="url"
                            value={formData.jobUrl}
                            onChange={handleChange}
                            placeholder="https://careers.example.com/..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Notes
                        </label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="Relavent notes..."
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                            {isLoading
                                ? 'Saving...'
                                : isEditMode ? 'Save Changes' : 'Add Job'
                            }
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default JobModal