import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
export default function Create({ departments }) {
    const { data, setData, post, processing, errors } = useForm({
        birth_date: '',
        first_name: '',
        last_name: '',
        gender: '',
        hire_date: '',
        department: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data.gender); // ตรวจสอบค่าก่อนส่ง
        post(route('employee.store')); // Replace with your backend route
    };

    return (
        <AuthenticatedLayout>
            <br></br>
            <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Register Employee</h2>
                <form onSubmit={handleSubmit}>

                    {/* Birth Date */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="birth_date">
                            Birth Date
                        </label>
                        <input
                            id="birth_date"
                            type="date"
                            value={data.birth_date}
                            onChange={(e) => setData('birth_date', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.birth_date && <div className="text-red-500 text-sm mt-1">{errors.birth_date}</div>}
                    </div>

                    {/* First Name */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="first_name">
                            First Name
                        </label>
                        <input
                            id="first_name"
                            type="text"
                            value={data.first_name}
                            onChange={(e) => setData('first_name', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter first name"
                        />
                        {errors.first_name && <div className="text-red-500 text-sm mt-1">{errors.first_name}</div>}
                    </div>

                    {/* Last Name */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="last_name">
                            Last Name
                        </label>
                        <input
                            id="last_name"
                            type="text"
                            value={data.last_name}
                            onChange={(e) => setData('last_name', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter last name"
                        />
                        {errors.last_name && <div className="text-red-500 text-sm mt-1">{errors.last_name}</div>}
                    </div>

                    {/* Gender */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="gender">
                            Gender
                        </label>
                        <select
                            id="gender"
                            value={data.gender}
                            onChange={(e) => setData('gender', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                        {errors.gender && <div className="text-red-500 text-sm mt-1">{errors.gender}</div>}
                    </div>

                    {/* Hire Date */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="hire_date">
                            Hire Date
                        </label>
                        <input
                            id="hire_date"
                            type="date"
                            value={data.hire_date}
                            onChange={(e) => setData('hire_date', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.hire_date && <div className="text-red-500 text-sm mt-1">{errors.hire_date}</div>}
                    </div>

                    {/* Department */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="department">
                            Department
                        </label>
                        <select
                            value={data.department}
                            onChange={(e) => setData('department', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Department</option>
                            {departments.map((dept) => (
                                <option key={dept.dept_no} value={dept.dept_name}>
                                    {dept.dept_name}
                                </option>
                            ))}
                        </select>
                        {errors.department && <div className="text-red-500 text-sm mt-1">{errors.department}</div>}
                    </div>
                    {/* Upload Image */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="profile_image">
                            Profile Image
                        </label>
                        <input
                            id="profile_image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('profile_image', e.target.files[0])}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.profile_image && <div className="text-red-500 text-sm mt-1">{errors.profile_image}</div>}
                    </div>


                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Register Employee
                        </button>
                    </div>
                </form>
            </div>
            <br></br>
        </AuthenticatedLayout>

    );
}
