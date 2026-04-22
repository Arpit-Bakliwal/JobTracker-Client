import { useState } from 'react'
import useAI from '../../hooks/useAI'
import useUI from '../../hooks/useUI'

const BulletImprover = () => {
    const { bulletResult, bulletLoading, bulletError, handleImproveBullet } = useAI()
    const { toastSuccess } = useUI()
    const [form, setForm] = useState({ bullet: '', jobTitle: '' })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleImproveBullet(form)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(bulletResult.improved)
        toastSuccess('Copied to clipboard!')
    }

    return (
        <div className="space-y-6">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Target Job Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="jobTitle"
                        type="text"
                        value={form.jobTitle}
                        onChange={handleChange}
                        required
                        placeholder="eg. Senior Full Stack Developer"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Resume Bullet Point <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="bullet"
                        value={form.bullet}
                        onChange={handleChange}
                        required
                        rows={3}
                        placeholder="Built a dashboard using React and Node.js..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                </div>
                <button
                    type="submit"
                    disabled={bulletLoading}
                    className="w-1/2 mx-auto block bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 rounded-lg transition-colors"
                >
                    {bulletLoading ? 'Improving...' : 'Improve Bullet Point'}
                </button>
            </form>

            {/* Error */}
            {bulletError && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {bulletError}
                </div>
            )}

            {/* Result */}
            {bulletResult && (
                <div className="space-y-4">

                    {/* Before / After */}
                    <div className="grid grid-cols-1 gap-3">
                        <div className="bg-red-50 rounded-xl p-4">
                            <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-2">
                                Before
                            </p>
                            <p className="text-sm text-gray-700">{bulletResult.original}</p>
                        </div>
                        <div className="bg-green-50 rounded-xl p-4">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                    <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">
                                        After
                                    </p>
                                    <p className="text-sm text-gray-700">{bulletResult.improved}</p>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="shrink-0 text-xs text-green-600 border border-green-300 px-2.5 py-1 rounded-lg hover:bg-green-100 transition-colors"
                                >
                                    Copy
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Explanation */}
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                        <h3 className="text-sm font-semibold text-gray-900 mb-2">
                            📝 What changed
                        </h3>
                        <p className="text-sm text-gray-600">{bulletResult.explanation}</p>
                    </div>

                    {/* Keywords */}
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">
                            🎯 ATS Keywords Added
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {bulletResult.keywords.map((kw, i) => (
                                <span key={i} className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                                    {kw}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}

export default BulletImprover