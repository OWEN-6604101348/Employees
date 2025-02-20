<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AuthController; // Ensure AuthController exists in this namespace
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
// Route สำหรับโพสต์


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ครอบทุก API ที่ต้องการ Auth ด้วย Middleware
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('posts', PostController::class);
    // Routes สำหรับคอมเมนต์
    Route::post('/posts/{id}/comments', [CommentController::class, 'store']);
    
    // Routes สำหรับไลก์โพสต์
    Route::post('/posts/{id}/likes', [LikeController::class, 'store']);
});

