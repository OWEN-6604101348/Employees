<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        // ดึงข้อมูลโพสต์ทั้งหมดพร้อมกับข้อมูลที่เกี่ยวข้อง (user, category, comments, likes, ฯลฯ)
        $posts = Post::with(['user', 'category', 'comments', 'likes', 'attachments', 'reports'])->get();

        // ส่งข้อมูลไปยัง React ผ่าน Inertia
        return Inertia::render('Posts/Index', [
            'posts' => $posts,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'status' => 'nullable|string|in:active,draft,deleted',
        ]);
    
        $post = Post::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'content' => $request->content,
            'category_id' => $request->category_id,
            'status' => $request->status ?? 'active',
        ]);
    
        return response()->json(['message' => 'Post created!', 'post' => $post]);
    }
    

    public function show($id)
{
    $post = Post::with('comments.user', 'category', 'likes')
                ->withCount('likes') // นับจำนวนไลก์
                ->findOrFail($id);

    return response()->json($post);
}


    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        // ตรวจสอบว่า user ที่ล็อกอิน เป็นเจ้าของโพสต์หรือไม่
        if ($post->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'category_id' => 'sometimes|exists:categories,id',
            'views' => 'sometimes|integer|min:0',
            'status' => 'sometimes|string|in:active,draft,deleted',
        ]);

        $post->update($request->only(['title', 'content', 'category_id', 'views', 'status']));

        return response()->json(['message' => 'Post updated!', 'post' => $post]);
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);

        // ตรวจสอบว่าเป็นเจ้าของโพสต์หรือไม่
        if ($post->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $post->delete();

        return response()->json(['message' => 'Post deleted successfully']);
    }
}
