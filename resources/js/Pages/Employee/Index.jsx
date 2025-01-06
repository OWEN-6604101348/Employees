import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Index({ employees, query }) {
    const [search, setSearch] = useState(query || '');
    const [sortColumn, setSortColumn] = useState('emp_no');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(employees.current_page);
    const [totalPages, setTotalPages] = useState(employees.last_page);
    const [isLoading, setIsLoading] = useState(false);

    const fetchEmployees = (params) => {
        setIsLoading(true);
        router.get('/employees', params, {
            replace: true,
            preserveState: true,
            onFinish: () => setIsLoading(false),
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchEmployees({ search, sortColumn, sortOrder, page: 1 });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchEmployees({ search, sortColumn, sortOrder, page });
    };

    const handleSort = (column) => {
        const newSortOrder = column === sortColumn && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortOrder(newSortOrder);
        fetchEmployees({ search, sortColumn: column, sortOrder: newSortOrder, page: currentPage });
    };

    const calculateAge = (birthday) => {
        const birthDate = new Date(birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <div className="container mx-auto p-8 bg-gradient-to-r from-blue-50 via-white to-blue-50 shadow-lg rounded-lg">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-700 tracking-wide">
                รายชื่อเเรงงาน ร้านขายเเมลง
            </h1>

            <form onSubmit={handleSearch} className="flex justify-center mb-8">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-300 rounded-l-md p-3 w-1/3 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    placeholder="Search employees..."
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-5 py-3 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-400"
                >
                    Search
                </button>
            </form>

            {isLoading ? (
                <p className="text-center text-blue-500 font-semibold mt-8">Loading...</p>
            ) : employees.data.length > 0 ? (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200 shadow-xl rounded-lg overflow-hidden">
                            <thead className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900 font-semibold">
                                <tr>
                                    {['emp_no', 'first_name', 'last_name', 'gender', 'age', 'birthday'].map((col) => (
                                        <th
                                            key={col}
                                            onClick={() => handleSort(col)}
                                            className="border border-gray-300 px-4 py-3 text-left cursor-pointer hover:bg-blue-300 transition duration-200"
                                        >
                                            {col.replace('_', ' ').toUpperCase()}
                                            {sortColumn === col && (
                                                <span>{sortOrder === 'asc' ? ' ↑' : ' ↓'}</span>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {employees.data.map((employee, index) => (
                                    <tr
                                        key={employee.emp_no}
                                        className={`${
                                            index % 2 === 0 ? 'bg-blue-50' : 'bg-blue-100'
                                        } hover:bg-blue-200 transition duration-200`}
                                    >
                                        <td className="border border-gray-300 px-4 py-3">{employee.emp_no}</td>
                                        <td className="border border-gray-300 px-4 py-3">{employee.first_name}</td>
                                        <td className="border border-gray-300 px-4 py-3">{employee.last_name}</td>
                                        <td className="border border-gray-300 px-4 py-3">
                                            {employee.gender === 'M' ? 'Male' : 'Female'}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-3">
                                            {calculateAge(employee.birth_date)}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-3">{employee.birth_date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center items-center mt-6 space-x-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>

                        <span className="text-lg font-semibold text-blue-700">
                            {currentPage} / {totalPages}
                        </span>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-center text-red-500 font-semibold mt-8">No data found</p>
            )}
        </div>
    );
}
