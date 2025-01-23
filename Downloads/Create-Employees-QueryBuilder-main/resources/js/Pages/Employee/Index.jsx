import { router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function EmployeeIndex({ employees, query, order}) { // รับค่า employees จาก Controller
    const [search, setSearch] = useState(query || ''); // กำหนดสถานะของการค้นหา โดยใช้ค่า query ที่รับมาจาก Controller
    const [sortOrder, setSortOrder] = useState(order || 'asc'); // กำหนดสถานะของการเรียงลำดับ

    const handleSearch = (e) => { //แฮนเดิลเสิร์ช
        //พรีเวนต์ดีฟอลต์
        e.preventDefault(); // หยุดการทำงานของฟอร์ม หรือกันหน้าเว็บโหลดใหม่
        router.get('/employees', { search, order: sortOrder }); 
    };

    // ฟังก์ชันนี้จะถูกเรียกเมื่อผู้ใช้คลิกที่ชื่อคอลัมน์ในตารางเพื่อจัดเรียงข้อมูล
    const handleSort = () => { //แฮนเดิลซอร์ท
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc'; // กำหนดการเรียงลำดับใหม่ เรียงจากน้อยไปมาก
        setSortOrder(newOrder); // อัพเดทสถานะการเรียงลำดับ
        router.get('/employees', { search, order: newOrder });
    };

const handlePagination = (url) => { 
    router.get(url, { search, order: sortOrder }); // ใช้ sortOrder ที่เก็บใน state
};


    return (
        <AuthenticatedLayout>
    <div className="p-6 bg-[#f5e6ca] min-h-screen"> {/* พื้นหลังหลักสีเหลืองครีม */}
        <h1 className="mb-6 text-center text-4xl font-bold text-[#a67b5b]">Employee List</h1>

        {/* ฟอร์มค้นหา */}
        <form onSubmit={handleSearch} className="mb-4 text-center">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded px-4 py-2 w-1/2 bg-[#f5e6ca] text-[#4b3621] border-[#d4a373]"
                placeholder="ค้นหาชื่อหรือนามสกุล"
            />
            <button
                type="submit"
                className="ml-2 bg-[#d4a373] text-[#4b3621] px-4 py-2 rounded hover:bg-[#a67b5b]"
            >
                ค้นหา
            </button>
        </form>

        {/* ตารางข้อมูล */}
        {employees.data.length > 0 ? (
            <>
                <table className="min-w-full border-collapse border border-[#4b3621] shadow-md bg-[#a67b5b]">
                    <thead className="bg-[#4b3621] text-white">
                        <tr>
                            <th className="cursor-pointer border border-[#d4a373] px-4 py-2" onClick={() => handleSort('emp_no')}>
                                ID {sortOrder === 'asc' ? '↑' : '↓'}
                            </th>
                            <th className="cursor-pointer border border-[#d4a373] px-4 py-2" onClick={() => handleSort('first_name')}>
                                Name {sortOrder === 'asc' ? '↑' : '↓'}
                            </th>
                            <th className="cursor-pointer border border-[#d4a373] px-4 py-2" onClick={() => handleSort('last_name')}>
                                Last Name {sortOrder === 'asc' ? '↑' : '↓'}
                            </th>
                            <th className="cursor-pointer border border-[#d4a373] px-4 py-2" onClick={() => handleSort('birth_date')}>
                                Birth Day {sortOrder === 'asc' ? '↑' : '↓'}
                            </th>
                            <th className="cursor-pointer border border-[#d4a373] px-4 py-2" onClick={() => handleSort('photo')}>
                                Photo {sortOrder === 'asc' ? '↑' : '↓'}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.data.map((employee, index) => (
                            <tr key={employee.emp_no} className={index % 2 === 0 ? 'bg-[#d4a373] text-[#4b3621]' : 'bg-[#f5e6ca] text-[#4b3621]'}>
                                <td className="border border-[#4b3621] px-4 py-2 text-center">{employee.emp_no}</td>
                                <td className="border border-[#4b3621] px-4 py-2">{employee.first_name}</td>
                                <td className="border border-[#4b3621] px-4 py-2">{employee.last_name}</td>
                                <td className="border border-[#4b3621] px-4 py-2">{employee.birth_date}</td>
                                <td className="border border-[#4b3621] px-4 py-3 flex justify-center items-center">
                                    {employee.photo ? (
                                        <img src={`/storage/${employee.photo}`} alt="Employee" className="w-16 h-16 object-cover rounded-full" />
                                    ) : (
                                        'No Image'
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-center space-x-2">
                    {employees.links.map((link, index) => (
                        <button
                            key={index}
                            className={`rounded px-4 py-2 ${link.active ? 'bg-[#4b3621] text-white' : 'bg-[#a67b5b] text-[#4b3621] hover:bg-[#d4a373]'}`}
                            onClick={() => handlePagination(link.url)}
                            disabled={!link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        ></button>
                    ))}
                </div>
            </>
        ) : (
            <div className="mt-6 text-center text-lg text-[#4b3621]">ไม่พบข้อมูล</div>
        )}
    </div>
</AuthenticatedLayout>

    );
}
