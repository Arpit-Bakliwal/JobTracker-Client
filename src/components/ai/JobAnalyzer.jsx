import { useState } from 'react'
import useAI from '../../hooks/useAI'

const VERDICT_STYLES = {
    STRONG_MATCH:  { color: 'text-green-600',  bg: 'bg-green-50',  label: '🟢 Strong Match' },
    GOOD_MATCH:    { color: 'text-blue-600',   bg: 'bg-blue-50',   label: '🔵 Good Match' },
    PARTIAL_MATCH: { color: 'text-yellow-600', bg: 'bg-yellow-50', label: '🟡 Partial Match' },
    WEAK_MATCH:    { color: 'text-red-600',    bg: 'bg-red-50',    label: '🔴 Weak Match' },
}

const JobAnalyzer = () => {
    const { analysisResult, analysisLoading, analysisError, handleAnalyzeJob } = useAI()
    const [form, setForm] = useState({ jobDescription: '', userSkills: '' })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleAnalyzeJob(form)
    }

    const verdict = analysisResult
        ? VERDICT_STYLES[analysisResult.verdict] || VERDICT_STYLES.PARTIAL_MATCH
        : null

    return (
        <div className="space-y-6">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Job Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="jobDescription"
                        value={form.jobDescription}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Paste the job description here (min 50 characters)..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Skills <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="userSkills"
                        value={form.userSkills}
                        onChange={handleChange}
                        required
                        rows={3}
                        placeholder="React, Node.js, PostgreSQL, Docker, AWS..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                </div>
                <button
                    type="submit"
                    disabled={analysisLoading}
                    className="w-1/2 mx-auto block bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 rounded-lg transition-colors"
                >
                    {analysisLoading ? 'Analyzing...' : 'Analyze Job Fit'}
                </button>
            </form>

            {/* Error */}
            {analysisError && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {analysisError}
                </div>
            )}

            {/* Result */}
            {analysisResult && (
                <div className="space-y-4">

                    {/* Score + Verdict */}
                    <div className={`${verdict.bg} rounded-xl p-5 flex items-center justify-between`}>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Match Score</p>
                            <p className={`text-4xl font-bold ${verdict.color}`}>
                                {analysisResult.matchScore}%
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500 mb-1">Verdict</p>
                            <p className={`text-lg font-semibold ${verdict.color}`}>
                                {verdict.label}
                            </p>
                        </div>
                    </div>

                    {/* Strengths */}
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">
                            ✅ Strengths
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {analysisResult.strengths.map((s, i) => (
                                <span key={i} className="px-2.5 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Missing Skills */}
                    {analysisResult.missingSkills.length > 0 && (
                        <div className="bg-white rounded-xl border border-gray-200 p-4">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">
                                ❌ Missing Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {analysisResult.missingSkills.map((s, i) => (
                                    <span key={i} className="px-2.5 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Suggestion */}
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                        <h3 className="text-sm font-semibold text-gray-900 mb-2">
                            💡 Suggestion
                        </h3>
                        <p className="text-sm text-gray-600">{analysisResult.suggestion}</p>
                    </div>

                </div>
            )}
        </div>
    )
}

export default JobAnalyzer