<?php

namespace App\Http\Controllers;

//use Illuminate\Container\Attributes\Log;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = $request->input('search'); // รับค่าจาก search 
        $order = $request->input('order', 'asc'); // รับการเรียงลำดับจาก order (ค่า default คือ 'asc')

        $employees = DB::table('employees')
            ->Where('emp_no', 'like', "%{$query}%") // ค้นหาจาก emp_no
            ->orWhere('first_name', 'like', "%{$query}%")  // ค้นหาจาก first_name =,!= ,< > ใช้แทนได้ แต่ลบ % ออก
            ->orWhere('last_name', 'like', "%{$query}%")  // ค้นหาจาก last_name
            ->orderBy('emp_no', $order) // การเรียงลำดับตาม emp_no
            ->paginate(10);

        return Inertia::render('Employee/Index', [
            'employees' => $employees, // ส่งข้อมูล employees กลับไปยัง React component
            'query' => $query,  // ส่ง query กลับไปยัง React component
            'order' => $order,  // ส่งการเรียงลำดับกลับไปยัง React component
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // ดึงรายชื่อแผนกจากฐานข้อมูล เพื่อไปแสดงให้เลือกรายการในแบบฟอร์ม
        $departments = DB::table('departments')->select('dept_no', 'dept_name')->get();

        // ส่งข้อมูลไปยังหน้า Inertia
        return inertia('Employee/Create', [
            'departments' => $departments,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Log::info('Request data for creating employee', $request->all());
    
        $validated = $request->validate([
            'birth_date' => 'required|date',
            'first_name' => 'required|string|max:14',
            'last_name' => 'required|string|max:16',
            'gender' => 'required|in:M,F',
            'hire_date' => 'nullable|date',
            'dept_no' => 'required|string|max:4',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
    
        try {
            DB::transaction(function () use ($validated, $request) {
                $latestEmpNo = DB::table('employees')->max('emp_no') ?? 0;
                $newEmpNo = $latestEmpNo + 1;

                // อัปโหลดรูปภาพถ้ามีการอัปโหลด
                if ($request->hasFile('photo')) {
                    $photoPath = $request->file('photo')->store('employees', 'public');
                    $validated['photo'] = $photoPath;
                }
    
                DB::table('employees')->insert([
                    'emp_no' => $newEmpNo,
                    'birth_date' => $validated['birth_date'],
                    'first_name' => $validated['first_name'],
                    'last_name' => $validated['last_name'],
                    'gender' => $validated['gender'],
                    'hire_date' => $validated['hire_date'] ?? now(),
                    'photo' => $validated['photo'] ?? null,
                ]);
            });
    
            return redirect()->route('employees.index')->with([
                'success' => 'Employee created successfully.',
            ]);
        } catch (\Exception $e) {
            Log::error('Transaction failed', ['error' => $e->getMessage()]);
            // ส่งกลับไปยังหน้าเดิมพร้อมแสดง error
            return Redirect::back()->withErrors(['error' => 'An error occurred while creating employee. Please try again.'])
                                ->withInput(); // คืนค่าข้อมูลที่กรอกไว้
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
