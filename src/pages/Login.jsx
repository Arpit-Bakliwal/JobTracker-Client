import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useUI from '../hooks/useUI'

const Login = () => {
    const navigate = useNavigate();
    const { handleLogin } = useAuth();
    const { toastSuccess, toastError } = useUI();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const result = await handleLogin(formData);

        if (result.success) {
            toastSuccess('Welcome back!');
            navigate('/dashboard');
        } else {
            toastError(result.message);
        }

        setIsLoading(false);
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">

                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
                    <p className="text-gray-500 mt-2">Sign in to your account</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-colors duration-200"
                    >
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>

                </form>

                {/* Register link */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?{' '}
                    <Link
                        to="/register"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Register
                    </Link>
                </p>

            </div>
        </div>
    )

}
export default Login