import { useDispatch, useSelector } from 'react-redux'
import { analyzeJob, getInterviewQuestions, improveBullet } from '../features/ai/aiThunks'
import { clearAnalysis, clearQuestions, clearBullet } from '../features/ai/aiSlice'

const useAI = () => {
    const dispatch = useDispatch()
    const {
        analysisResult, analysisLoading, analysisError,
        questionsResult, questionsLoading, questionsError,
        bulletResult, bulletLoading, bulletError,
    } = useSelector((state) => state.ai)

    return {
        // Job analyzer
        analysisResult,
        analysisLoading,
        analysisError,
        handleAnalyzeJob: (payload) => dispatch(analyzeJob(payload)),
        handleClearAnalysis: () => dispatch(clearAnalysis()),

        // Interview questions
        questionsResult,
        questionsLoading,
        questionsError,
        handleGetQuestions: (payload) => dispatch(getInterviewQuestions(payload)),
        handleClearQuestions: () => dispatch(clearQuestions()),

        // Bullet improver
        bulletResult,
        bulletLoading,
        bulletError,
        handleImproveBullet: (payload) => dispatch(improveBullet(payload)),
        handleClearBullet: () => dispatch(clearBullet()),
    }
}

export default useAI