<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Employee;

class EmployeeController extends Controller
{
    public function index(Request $request)
{
    // รับค่าค้นหาจากผู้ใช้ (search query)
    $query = $request->input('search');
    
    // รับค่าคอลัมน์ที่ใช้เรียงลำดับ (ค่าเริ่มต้น: emp_no)
    $sortColumn = $request->input('sortColumn', 'emp_no'); 
    
    // รับค่าลำดับการเรียง (asc หรือ desc, ค่าเริ่มต้น: desc)
    $sortOrder = $request->input('sortOrder', 'desc'); 

    // ตรวจสอบว่าคอลัมน์ที่เรียงคือ emp_no หรือไม่
    if ($sortColumn == 'emp_no') {
        // สลับการเรียงระหว่าง 'asc' และ 'desc' (toggle order)
        $sortOrder = $sortOrder === 'desc' ? 'asc' : 'desc';
    }

    // ดึงข้อมูลพนักงานจากฐานข้อมูล
    $employees = Employee::when($query, function ($queryBuilder, $query) {
        // กรองข้อมูลพนักงานตามชื่อหรือสกุลที่ตรงกับคำค้นหา
        $queryBuilder->where('first_name', 'like', '%' . $query . '%')
                     ->orWhere('last_name', 'like', '%' . $query . '%')
                     ->orWhere('gender', 'like', '%' . $query . '%');
    })
    ->orderBy($sortColumn, $sortOrder) // เรียงข้อมูลตามคอลัมน์และลำดับที่กำหนด
    ->paginate(10); // แบ่งหน้าข้อมูลเป็น 10 รายการต่อหน้า

    // ส่งข้อมูลไปยังหน้า Inertia สำหรับแสดงผล
    return Inertia::render('Employee/Index', [
        'employees' => $employees,       // รายการพนักงาน
        'query' => $query,               // คำค้นหา
        'sortColumn' => $sortColumn,     // คอลัมน์ที่ใช้เรียง
        'sortOrder' => $sortOrder,       // ลำดับการเรียง
    ]);
}

    public function create()
    {

        $departments = DB::table('departments')->select('dept_no', 'dept_name')->get();

        return inertia('Employee/Create', ['departments' => $departments]);
    }
    public function store(Request $request)
    {
        // รับข้อมูลจากฟอร์ม พร้อมตรวจสอบความถูกต้อง
        $validated = $request->validate([
            "birth_date" => "required|date",
            "first_name" => "required|string|max:255",
            "last_name"  => "required|string|max:255",
            'gender' => 'required|in:M,F,', 
            "hire_date"  => "required|date"
        ]);

        // ใช้ Database Transaction เพื่อความปลอดภัย
        DB::transaction(function () use ($validated) { 
            // 1. หาค่า emp_no ล่าสุด 
            $latestEmpNo = DB::table('employees')->max('emp_no') ?? 0; 
            $newEmpNo = $latestEmpNo + 1; // เพิ่มค่า emp_no ทีละ 1

            Log::info("New Employee Number: " . $newEmpNo);

            // 2. เพิ่มข้อมูลลงในฐานข้อมูลอย่างถูกต้อง
            DB::table("employees")->insert([
                "emp_no"     => $newEmpNo, 
                "first_name" => $validated['first_name'],
                "last_name"  => $validated['last_name'],
                "gender"     => $validated['gender'],
                "birth_date" => $validated['birth_date'],
                "hire_date"  => $validated['hire_date'],
            ]);
        });

        // ส่งข้อความตอบกลับเมื่อสำเร็จ
        return response()->json(['message' => 'Employee created successfully']);
    }
}