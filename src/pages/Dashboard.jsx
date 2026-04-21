import { useEffect } from 'react'
import useJobs from '../hooks/useJobs'
import useAuth from '../hooks/useAuth'
import StatsCard from '../components/dashboard/StatsCard'
import RecentJobs from '../components/dashboard/RecentJobs'

// Stats card config — label, key from API response, color
const STATS_CONFIG = [
    { label: 'Total Applications', key: 'total',     color: 'text-gray-900' },
    { label: 'Applied',            key: 'APPLIED',   color: 'text-blue-600' },
    { label: 'Screening',          key: 'SCREENING', color: 'text-purple-600' },
    { label: 'Interview',          key: 'INTERVIEW', color: 'text-yellow-600' },
    { label: 'Offer',              key: 'OFFER',     color: 'text-green-600' },
    { label: 'Rejected',           key: 'REJECTED',  color: 'text-red-600' },
]

const Dashboard = () => {
    const { user } = useAuth()
    const { stats, statsLoading, handleFetchStats } = useJobs()

    useEffect(() => {
        handleFetchStats()
    }, [])

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Welcome back, {user?.name?.split(' ')[0]} 👋
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                    Here's your job search summary
                </p>
            </div>

            {/* Stats Cards */}
            {statsLoading ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {STATS_CONFIG.map((s) => (
                        <div
                            key={s.key}
                            className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse"
                        >
                            <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
                            <div className="h-8 bg-gray-200 rounded w-12" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {STATS_CONFIG.map((s) => (
                        <StatsCard
                            key={s.key}
                            label={s.label}
                            count={stats?.[s.key] ?? 0}
                            color={s.color}
                        />
                    ))}
                </div>
            )}

            {/* Recent Jobs */}
            <RecentJobs jobs={stats?.recentJobs} />

        </div>
    )
}

export default Dashboard