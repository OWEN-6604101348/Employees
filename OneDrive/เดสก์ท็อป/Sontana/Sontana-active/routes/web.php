<?php
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
// นำเข้าคอนโทรลเลอร์ที่ใช้ในเส้นทางต่าง ๆ
use App\Http\Controllers\ProfileController;
// นำเข้าคลาสที่ใช้สำหรับแอปพลิเคชัน
use Illuminate\Foundation\Application;
// นำเข้าคลาสที่ใช้สำหรับกำหนดเส้นทาง
use Illuminate\Support\Facades\Route;
// นำเข้า Inertia สำหรับการเรนเดอร์หน้าเว็บ
use Inertia\Inertia;



// เส้นทางหลักของเว็บไซต์ที่แสดงหน้าต้อนรับ
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'), // ตรวจสอบว่ามีเส้นทางเข้าสู่ระบบ
        'canRegister' => Route::has('register'), // ตรวจสอบว่ามีเส้นทางสมัครสมาชิก
        'laravelVersion' => Application::VERSION, // แสดงเวอร์ชันของ Laravel
        'phpVersion' => PHP_VERSION, // แสดงเวอร์ชันของ PHP
    ]);
});


// เส้นทางสำหรับแดชบอร์ดที่ต้องการการยืนยันตัวตนและอีเมล
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// กลุ่มเส้นทางที่ต้องการการยืนยันตัวตน
Route::middleware('auth')->group(function () {
    // เส้นทางสำหรับการแก้ไขข้อมูลโปรไฟล์
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // เส้นทางสำหรับการอัพเดทข้อมูลโปรไฟล์
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // เส้นทางสำหรับการลบโปรไฟล์
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route::get('/posts', function () {
//     return Inertia::render('Post/Index');
// });

Route::get('/posts', [PostController::class, 'index'])->name('post.index');

// กลุ่มเส้นทางสำหรับการจัดการ Chirp โดยใช้ resource controller
//Route::get('/posts', [PostController::class, 'index']);
// รวมเส้นทางที่เกี่ยวข้องกับการเข้าสู่ระบบและการยืนยันอีเมล
require __DIR__.'/auth.php';