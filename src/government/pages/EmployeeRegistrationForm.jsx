import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const departmentToDashboardSlug = {
    'Ministry of Railways': 'railways',
    'Ministry of Consumer Affairs': 'consumer-affairs',
    'Ministry of Women and Child Development': 'women-child-development',
    'Ministry of Health': 'health-family-welfare',
    'Ministry of Education': 'education',
    'Ministry of Road Transport': 'road-transport',
};

const normalizeEmployeeId = (value) =>
    typeof value === 'string' ? value.trim().toLowerCase() : '';

const EmployeeRegistrationForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        designation: '',
        employeeId: '',
        password: '',
        address: '',
        dateOfJoining: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const BACKEND_URL = (
        import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'
    ).replace(/\/+$/, '');

    const departments = [
        'Ministry of Railways',
        'Ministry of Consumer Affairs',
        'Ministry of Women and Child Development',
        'Ministry of Health',
        'Ministry of Education',
        'Ministry of Road Transport',
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await axios.post(
                `${BACKEND_URL}/api/v1/employees/employeeregistration`,
                formData
            );
            setSuccess('Employee registered successfully!');

            localStorage.setItem('employeeName', formData.name);
            localStorage.setItem('employeeDepartment', formData.department);
            localStorage.setItem(
                'employeeId',
                normalizeEmployeeId(formData.employeeId)
            );

            const dashboardSlug = departmentToDashboardSlug[formData.department];
            const nextRoute = dashboardSlug
                ? `/govt/employee/dashboard/${dashboardSlug}`
                : '/govt/employee/dashboard';

            setFormData({
                name: '',
                email: '',
                phone: '',
                department: '',
                designation: '',
                employeeId: '',
                password: '',
                address: '',
                dateOfJoining: ''
            });

            setTimeout(() => {
                navigate(nextRoute);
            }, 700);
        } catch (err) {
            setError(err.response?.data?.message || 'Error registering employee');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f3ea] px-4 py-8">
            <style>{`
                @keyframes powderDrift {
                    0%,
                    100% {
                        transform: translate3d(0, 0, 0) scale(1);
                    }
                    50% {
                        transform: translate3d(1.5%, -1%, 0) scale(1.04);
                    }
                }

                @keyframes powderFloat {
                    0%,
                    100% {
                        transform: translate3d(0, 0, 0) scale(1);
                    }
                    50% {
                        transform: translate3d(-1.5%, 1.5%, 0) scale(1.05);
                    }
                }

                @keyframes grainShift {
                    0%,
                    100% {
                        opacity: 0.18;
                        transform: translate3d(0, 0, 0);
                    }
                    50% {
                        opacity: 0.28;
                        transform: translate3d(1%, -1%, 0);
                    }
                }
            `}</style>
            <div className="absolute inset-0">
                <div
                    className="absolute inset-[-8%]"
                    style={{
                        background: `
                            radial-gradient(circle at 10% 10%, rgba(245,120,24,0.88) 0%, rgba(245,120,24,0.68) 12%, rgba(245,120,24,0.22) 24%, transparent 38%),
                            radial-gradient(circle at 18% 20%, rgba(255,153,51,0.68) 0%, rgba(255,153,51,0.3) 10%, transparent 24%),
                            radial-gradient(circle at 8% 82%, rgba(255,173,112,0.42) 0%, rgba(255,173,112,0.16) 14%, transparent 28%),
                            radial-gradient(circle at 92% 18%, rgba(34,197,94,0.82) 0%, rgba(34,197,94,0.56) 14%, rgba(34,197,94,0.22) 28%, transparent 42%),
                            radial-gradient(circle at 88% 46%, rgba(74,222,128,0.5) 0%, rgba(74,222,128,0.22) 12%, transparent 26%),
                            radial-gradient(circle at 94% 86%, rgba(22,163,74,0.78) 0%, rgba(22,163,74,0.5) 16%, rgba(22,163,74,0.16) 30%, transparent 44%),
                            radial-gradient(circle at 50% 48%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 26%, rgba(255,252,248,0.82) 40%, rgba(255,255,255,0.32) 56%, transparent 72%),
                            linear-gradient(135deg, rgba(254,250,244,1), rgba(250,251,248,0.98), rgba(245,252,247,0.98))
                        `,
                        filter: 'blur(18px) saturate(1.02)',
                        animation: 'powderDrift 20s ease-in-out infinite',
                    }}
                />
                <div
                    className="absolute inset-[-6%] opacity-75"
                    style={{
                        background: `
                            radial-gradient(circle at 12% 12%, rgba(244,114,28,0.38) 0 12%, transparent 28%),
                            radial-gradient(circle at 16% 22%, rgba(249,115,22,0.24) 0 8%, transparent 22%),
                            radial-gradient(circle at 90% 18%, rgba(34,197,94,0.34) 0 12%, transparent 28%),
                            radial-gradient(circle at 86% 78%, rgba(22,163,74,0.3) 0 10%, transparent 26%),
                            radial-gradient(circle at 8% 86%, rgba(251,146,60,0.18) 0 10%, transparent 24%)
                        `,
                        filter: 'blur(34px)',
                        animation: 'powderFloat 24s ease-in-out infinite',
                    }}
                />
                <div
                    className="absolute inset-0 opacity-90"
                    style={{
                        background: `
                            radial-gradient(circle at 14% 14%, rgba(255,255,255,0.22) 0%, transparent 18%),
                            radial-gradient(circle at 86% 18%, rgba(255,255,255,0.18) 0%, transparent 18%),
                            radial-gradient(circle at 84% 80%, rgba(255,255,255,0.14) 0%, transparent 14%)
                        `,
                        filter: 'blur(42px)',
                        animation: 'powderFloat 16s ease-in-out infinite',
                    }}
                />
                <div
                    className="absolute inset-0 opacity-25 mix-blend-multiply"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260' viewBox='0 0 260 260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                        backgroundSize: '240px 240px',
                        filter: 'contrast(140%) blur(0.4px)',
                        animation: 'grainShift 10s linear infinite',
                    }}
                />
                <div
                    className="absolute inset-0 opacity-18"
                    style={{
                        background: 'radial-gradient(circle at center, rgba(255,255,255,0.14), rgba(255,255,255,0.04) 36%, transparent 64%)',
                    }}
                />
            </div>

            <div className="relative w-full max-w-2xl rounded-2xl border border-white/35 bg-white/78 p-6 shadow-2xl backdrop-blur-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Employee Registration
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Department
                            </label>
                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            >
                                <option value="">Select Department</option>
                                {departments.map((dept) => (
                                    <option key={dept} value={dept}>
                                        {dept}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Designation
                            </label>
                            <input
                                type="text"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Employee ID
                            </label>
                            <input
                                type="text"
                                name="employeeId"
                                value={formData.employeeId}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Date of Joining
                            </label>
                            <input
                                type="date"
                                name="dateOfJoining"
                                value={formData.dateOfJoining}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                        </label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            rows={3}
                            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </div>

                    {error && (
                        <div className="text-red-600 text-center py-2">{error}</div>
                    )}
                    {success && (
                        <div className="text-green-600 text-center py-2">{success}</div>
                    )}

                    <div className="flex justify-center pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? 'Registering...' : 'Register Employee'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeRegistrationForm;
