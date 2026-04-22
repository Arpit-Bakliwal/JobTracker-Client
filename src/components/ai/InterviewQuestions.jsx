import { useState } from 'react'
import useAI from '../../hooks/useAI'

const DIFFICULTY_STYLES = {
    easy:   'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    hard:   'bg-red-100 text-red-700',
}

const InterviewQuestions = () => {
    const { questionsResult, questionsLoading, questionsError, handleGetQuestions } = useAI()
    const [form, setForm] = useState({ jobTitle: '', skills: '' })
    const [expandedIndex, setExpandedIndex] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleGetQuestions(form)
        setExpandedIndex(null)
    }

    return (
        <div className="space-y-6">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Job Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="jobTitle"
                            type="text"
                            value={form.jobTitle}
                            onChange={handleChange}
                            required
                            placeholder="Senior React Developer"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Skills to Focus On <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="skills"
                            type="text"
                            value={form.skills}
                            onChange={handleChange}
                            required
                            placeholder="React, Redux, TypeScript..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={questionsLoading}
                    className="w-1/2 mx-auto block bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 rounded-lg transition-colors"
                >
                    {questionsLoading ? 'Generating...' : 'Generate Interview Questions'}
                </button>
            </form>

            {/* Error */}
            {questionsError && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {questionsError}
                </div>
            )}

            {/* Questions */}
            {questionsResult?.questions && (
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900">
                        {questionsResult.questions.length} Questions Generated
                    </h3>
                    {questionsResult.questions.map((q, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                        >
                            {/* Question header */}
                            <button
                                onClick={() => setExpandedIndex(
                                    expandedIndex === index ? null : index
                                )}
                                className="w-full flex items-start justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-start gap-3 flex-1">
                                    <span className="text-sm font-semibold text-gray-400 shrink-0">
                                        Q{index + 1}
                                    </span>
                                    <p className="text-sm text-gray-900 font-medium">
                                        {q.question}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 ml-3 shrink-0">
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${DIFFICULTY_STYLES[q.difficulty] || 'bg-gray-100 text-gray-600'}`}>
                                        {q.difficulty}
                                    </span>
                                    <span className="text-gray-400 text-sm">
                                        {expandedIndex === index ? '▲' : '▼'}
                                    </span>
                                </div>
                            </button>

                            {/* Expanded hint */}
                            {expandedIndex === index && (
                                <div className="px-4 pb-4 border-t border-gray-100">
                                    <div className="pt-3 space-y-2">
                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                            Topic — {q.topic}
                                        </p>
                                        <div className="bg-blue-50 rounded-lg p-3">
                                            <p className="text-xs font-medium text-blue-700 mb-1">
                                                💡 What a good answer should cover:
                                            </p>
                                            <p className="text-sm text-blue-600">{q.hint}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default InterviewQuestions