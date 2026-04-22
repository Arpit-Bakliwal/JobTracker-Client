import { useState, useEffect } from 'react'
import useJobs from '../hooks/useJobs'
import useUI from '../hooks/useUI'
import JobsHeader from '../components/jobs/JobsHeader'
import JobsFilters from '../components/jobs/JobsFilters'
import JobsTable from '../components/jobs/JobsTable'
import JobModal from '../components/jobs/JobModal'

// Debounce hook — delays search until user stops typing
const useDebounce = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(timer)
    }, [value, delay])
    return debouncedValue
}

const Jobs = () => {
    const {
        jobs,
        totalPages,
        loading,
        filters,
        handleFetchJobs,
        handleCreateJob,
        handleUpdateJob,
        handleDeleteJob,
        handleSetFilters,
    } = useJobs()
    const { toastSuccess, toastError } = useUI()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedJob, setSelectedJob] = useState(null)
    const [searchInput, setSearchInput] = useState('')

    const debouncedSearch = useDebounce(searchInput)

    // Fetch whenever filters change
    useEffect(() => {
        handleFetchJobs(filters)
    }, [filters])

    // Sync debounced search into filters
    useEffect(() => {
        handleSetFilters({ search: debouncedSearch, page: 1 })
    }, [debouncedSearch])

    const openAddModal = () => {
        setSelectedJob(null)
        setIsModalOpen(true)
    }

    const openEditModal = (job) => {
        setSelectedJob(job)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedJob(null)
    }

    const handleSubmit = async (formData) => {
        const result = selectedJob
            ? await handleUpdateJob(selectedJob.id, formData)
            : await handleCreateJob(formData)

        if (result.meta.requestStatus === 'fulfilled') {
            toastSuccess(selectedJob ? 'Job updated' : 'Job added')
            closeModal()
            handleFetchJobs(filters)
        } else {
            toastError(selectedJob ? 'Failed to update job' : 'Failed to add job')
        }
    }

    const handleDelete = async (id) => {
        const result = await handleDeleteJob(id)
        if (result.meta.requestStatus === 'fulfilled') {
            toastSuccess('Job deleted')
            handleFetchJobs(filters)
        } else {
            toastError('Failed to delete job')
        }
    }

    return (
        <div className="space-y-5">
            <JobsHeader onAddClick={openAddModal} onImportSuccess={() => handleFetchJobs(filters)} />

            <JobsFilters
                searchInput={searchInput}
                status={filters.status}
                onSearchChange={setSearchInput}
                onStatusChange={(val) => handleSetFilters({ status: val, page: 1 })}
            />

            <JobsTable
                jobs={jobs ?? []}
                loading={loading}
                currentPage={filters.page}
                totalPages={totalPages}
                onPageChange={(page) => handleSetFilters({ page })}
                onEdit={openEditModal}
                onDelete={handleDelete}
            />

            <JobModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={handleSubmit}
                job={selectedJob}
            />
        </div>
    )
}

export default Jobs