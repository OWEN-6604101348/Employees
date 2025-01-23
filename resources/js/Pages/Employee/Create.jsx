import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Create({ departments }) {
    const { data, setData, post, processing, errors } = useForm({
        birth_date: '',
        first_name: '',
        last_name: '',
        gender: '',
        hire_date: '',
        department: '',
        photo: ''
    });

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('gender', data.gender);
        formData.append('hire_date', data.hire_date);
        formData.append('birth_date', data.birth_date);
        formData.append('department', data.department);

        if (data.photo) {
            formData.append('photo', data.photo);
        }

        post(route('employees.store'), {
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "สำเร็จ!",
                    text: "สร้างพนักงานสำเร็จ!",
                });
                setSuccessMessage("Employee created successfully!");
            },
            onError: () => {
                setErrorMessage("An error occurred while creating employee. Please try again.");
                setTimeout(() => setErrorMessage(null), 3000);
            }
        });
    };

    return (
        <AuthenticatedLayout>
            {successMessage && (
                <div className="mb-4 p-4 bg-[#A3C17B] text-white rounded">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="mb-4 p-4 bg-[#C15B58] text-white rounded">
                    {errorMessage}
                </div>
            )}
            <div className="max-w-md mx-auto bg-[#F7E8D8] p-8 rounded-lg shadow-md border border-[#C68642]">
                <h2 className="text-2xl font-bold mb-6 text-[#4D4D4D]">Create Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-[#4D4D4D] text-sm font-bold mb-2" htmlFor="first_name">
                            First Name
                        </label>
                        <input
                            type="text"
                            value={data.first_name}
                            onChange={(e) => setData('first_name', e.target.value)}
                            className="shadow appearance-none border border-[#C68642] rounded w-full py-2 px-3 text-[#4D4D4D] leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-[#FFB84D]"
                            placeholder="Enter first name"
                        />
                        {errors.first_name && (
                            <span className="text-[#C15B58] text-sm">{errors.first_name}</span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#4D4D4D] text-sm font-bold mb-2" htmlFor="last_name">
                            Last Name
                        </label>
                        <input
                            type="text"
                            value={data.last_name}
                            onChange={(e) => setData('last_name', e.target.value)}
                            className="shadow appearance-none border border-[#C68642] rounded w-full py-2 px-3 text-[#4D4D4D] leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-[#FFB84D]"
                            placeholder="Enter last name"
                        />
                        {errors.last_name && (
                            <span className="text-[#C15B58] text-sm">{errors.last_name}</span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#4D4D4D] text-sm font-bold mb-2" htmlFor="gender">
                            Gender
                        </label>
                        <select
                            id="gender"
                            value={data.gender}
                            onChange={(e) => setData('gender', e.target.value)}
                            className="shadow appearance-none border border-[#C68642] rounded w-full py-2 px-3 text-[#4D4D4D] leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-[#FFB84D]"
                        >
                            <option value="">Select Gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                        {errors.gender && (
                            <span className="text-[#C15B58] text-sm">{errors.gender}</span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#4D4D4D] text-sm font-bold mb-2" htmlFor="birth_date">
                            Birth Date
                        </label>
                        <input
                            type="date"
                            value={data.birth_date}
                            onChange={(e) => setData('birth_date', e.target.value)}
                            className="shadow appearance-none border border-[#C68642] rounded w-full py-2 px-3 text-[#4D4D4D] leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-[#FFB84D]"
                        />
                        {errors.birth_date && (
                            <span className="text-[#C15B58] text-sm">{errors.birth_date}</span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#4D4D4D] text-sm font-bold mb-2" htmlFor="hire_date">
                            Hire Date
                        </label>
                        <input
                            type="date"
                            value={data.hire_date}
                            onChange={(e) => setData('hire_date', e.target.value)}
                            className="shadow appearance-none border border-[#C68642] rounded w-full py-2 px-3 text-[#4D4D4D] leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-[#FFB84D]"
                        />
                        {errors.hire_date && (
                            <span className="text-[#C15B58] text-sm">{errors.hire_date}</span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#4D4D4D] text-sm font-bold mb-2" htmlFor="dept_no">
                            Department
                        </label>
                        <select
                            value={data.dept_no}
                            className="shadow appearance-none border border-[#C68642] rounded w-full py-2 px-3 text-[#4D4D4D] leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-[#FFB84D]"
                            onChange={(e) => {
                                const selectedDept = departments.find(dept => dept.dept_no === e.target.value);
                                setData({
                                    ...data,
                                    dept_no: e.target.value,
                                    department: selectedDept ? selectedDept.dept_name : '',
                                });
                            }}
                        >
                            <option value="">Select Department</option>
                            {departments.map((dept) => (
                                <option key={dept.dept_no} value={dept.dept_no}>
                                    {dept.dept_name}
                                </option>
                            ))}
                        </select>
                        {errors.dept_no && (
                            <span className="text-[#C15B58] text-sm">{errors.dept_no}</span>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#4D4D4D]">Photo:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('photo', e.target.files[0])}
                            className="mt-1 p-2 block w-full border border-[#C68642] rounded-lg focus:ring-2 focus:ring-[#FFB84D] focus:border-[#FFB84D]"
                        />
                        {errors.photo && <span className="text-[#C15B58] text-sm">{errors.photo}</span>}
                    </div>
                    <div className="flex items-center justify-between mt-6">
                        <button
                            type="submit"
                            className="bg-[#FFB84D] hover:bg-[#C68642] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Create Employee
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};
