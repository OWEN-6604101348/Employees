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
        $query = $request->input('search');
        $sortColumn = $request->input('sortColumn', 'emp_no'); // Default sort column
        $sortOrder = $request->input('sortOrder', 'desc'); // Default sort order is 'desc'

        // Handle the sorting for 'emp_no'
        if ($sortColumn == 'emp_no') {
            $sortOrder = $sortOrder === 'desc' ? 'asc' : 'desc'; // Toggle the order between 'asc' and 'desc'
        }

        $employees = Employee::when($query, function ($queryBuilder, $query) {
            $queryBuilder->where('first_name', 'like', '%' . $query . '%')
                ->orWhere('last_name', 'like', '%' . $query . '%');
        })
            ->orderBy($sortColumn, $sortOrder) // Apply sorting
            ->paginate(10);

        return Inertia::render('Employee/Index', [
            'employees' => $employees,
            'query' => $query,
            'sortColumn' => $sortColumn,
            'sortOrder' => $sortOrder,
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