import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs, createJob, updateJob, deleteJob, fetchStats } from '../features/jobs/jobsThunks';
import { setFilters, resetFilters } from '../features/jobs/jobSlice';

const useJobs = () => {
    const dispatch = useDispatch();
    const { 
        jobs, totalCount, totalPages, currentPage, 
        loading, error, filters,
        stats, statsLoading 
    } = useSelector((state) => state.jobs);

    const handleFetchJobs = (params) => dispatch(fetchJobs(params));
    const handleCreateJob = (jobData) => dispatch(createJob(jobData));
    const handleUpdateJob = (id, jobData) => dispatch(updateJob({ id, jobData }));
    const handleDeleteJob = (id) => dispatch(deleteJob(id));
    const handleSetFilters = (newFilters) => dispatch(setFilters(newFilters));
    const handleResetFilters = () => dispatch(resetFilters());
    const handleFetchStats = () => dispatch(fetchStats());

    return {
        jobs,
        totalCount,
        totalPages,
        currentPage,
        loading,
        error,
        filters,
        stats,
        statsLoading,
        handleFetchJobs,
        handleCreateJob,
        handleUpdateJob,
        handleDeleteJob,
        handleSetFilters,
        handleResetFilters,
        handleFetchStats,
    }
};

export default useJobs;