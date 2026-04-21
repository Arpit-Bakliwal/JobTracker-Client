const StatsCard = ({ label, count, color }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className={`text-3xl font-bold mt-1 ${color}`}>{count}</p>
        </div>
    )
}

export default StatsCard