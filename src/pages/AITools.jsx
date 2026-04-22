import { useState } from 'react'
import JobAnalyzer from '../components/ai/JobAnalyzer'
import InterviewQuestions from '../components/ai/InterviewQuestions'
import BulletImprover from '../components/ai/BulletImprover'

const TABS = [
    { id: 'analyze',    label: '🎯 Job Analyzer',         component: JobAnalyzer },
    { id: 'questions',  label: '🎤 Interview Questions',   component: InterviewQuestions },
    { id: 'bullet',     label: '✍️ Bullet Improver',       component: BulletImprover },
]

const AITools = () => {
    const [activeTab, setActiveTab] = useState('analyze')

    const ActiveComponent = TABS.find((t) => t.id === activeTab)?.component

    return (
        <div className="space-y-5">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Tools</h1>
                <p className="text-sm text-gray-500 mt-0.5">
                    Supercharge your job search with AI
                </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            px-4 py-2 rounded-lg text-sm font-medium transition-colors
                            ${activeTab === tab.id
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                            }
                        `}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Active Tab Content */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                {ActiveComponent && <ActiveComponent />}
            </div>

        </div>
    )
}

export default AITools