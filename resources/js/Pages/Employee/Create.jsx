import { useForm } from '@inertiajs/react';

export default function Create({ departments }) {
    const { data, setData, post, processing, errors } = useForm({
        emp_no: '',
        birth_date: '',
        first_name: '',
        last_name: '',
        gender: '',
        hire_date: '',
        department: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register'); // Replace with your backend route
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
            <h2 className="text-xl font-semibold mb-4">Register Employee</h2>
            <form onSubmit={handleSubmit}>
                {/* Employee Number */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="emp_no">
                        Employee Number
                    </label>
                    <input
                        id="emp_no"
                        type="text"
                        value={data.emp_no}
                        onChange={(e) => setData('emp_no', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter employee number"
                    />
                    {errors.emp_no && <div className="text-red-500 text-sm">{errors.emp_no}</div>}
                </div>

                {/* Birth Date */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="birth_date">
                        Birth Date
                    </label>
                    <input
                        id="birth_date"
                        type="date"
                        value={data.birth_date}
                        onChange={(e) => setData('birth_date', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.birth_date && <div className="text-red-500 text-sm">{errors.birth_date}</div>}
                </div>

                {/* First Name */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="first_name">
                        First Name
                    </label>
                    <input
                        id="first_name"
                        type="text"
                        value={data.first_name}
                        onChange={(e) => setData('first_name', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter first name"
                    />
                    {errors.first_name && <div className="text-red-500 text-sm">{errors.first_name}</div>}
                </div>

                {/* Last Name */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="last_name">
                        Last Name
                    </label>
                    <input
                        id="last_name"
                        type="text"
                        value={data.last_name}
                        onChange={(e) => setData('last_name', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter last name"
                    />
                    {errors.last_name && <div className="text-red-500 text-sm">{errors.last_name}</div>}
                </div>

                {/* Gender */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="gender">
                        Gender
                    </label>
                    <select
                        id="gender"
                        value={data.gender}
                        onChange={(e) => setData('gender', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.gender && <div className="text-red-500 text-sm">{errors.gender}</div>}
                </div>

                {/* Hire Date */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="hire_date">
                        Hire Date
                    </label>
                    <input
                        id="hire_date"
                        type="date"
                        value={data.hire_date}
                        onChange={(e) => setData('hire_date', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.hire_date && <div className="text-red-500 text-sm">{errors.hire_date}</div>}
                </div>

                {/* Department */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="department">
                        Department
                    </label>
                    <select
                        id="department"
                        value={data.department}
                        onChange={(e) => setData('department', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="">Select department</option>
                        {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                    {errors.department && <div className="text-red-500 text-sm">{errors.department}</div>}
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Register Employee
                    </button>
                </div>
            </form>
        </div>
    );
}
