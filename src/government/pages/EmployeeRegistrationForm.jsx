import { useState } from 'react';
import axios from 'axios';

const EmployeeRegistrationForm = () => {
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
            const response = await axios.post('http://localhost:3000/employeeregistration', formData);
            setSuccess('Employee registered successfully!');
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
        } catch (err) {
            setError(err.response?.data?.message || 'Error registering employee');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
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