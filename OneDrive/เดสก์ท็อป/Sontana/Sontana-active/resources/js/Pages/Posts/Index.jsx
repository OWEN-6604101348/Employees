import React from 'react';
import SideNavFront from "@/Components/SideNavBarFront";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function PostIndex({ posts }) {
    return (
        <AuthenticatedLayout>
            <div className="grid grid-cols-4 gap-4 p-5 font-sans bg-gray-100 min-h-screen">
                {/* ส่วนของ SideNav อยู่ในคอลัมน์แรก */}
                <SideNavFront />
                
                {/* ส่วนของเนื้อหาหลัก */}
                <div className="col-span-3 bg-white p-6 mt-5 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Blog Posts</h1>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.id} className="bg-white rounded-lg shadow-md p-6 mb-6 max-w-2xl">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{post.title}</h2>
                                <p className="italic text-gray-600"><strong>Category:</strong> {post.category.name}</p>
                                <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>
                                <p className="text-gray-600"><strong>Author:</strong> {post.user.name}</p>
                                <p className="text-gray-600"><strong>Views:</strong> {post.views}</p>
                                <p className="text-gray-600"><strong>Comments:</strong> {post.comments.length}</p>
                                <p className="text-gray-600"><strong>Likes:</strong> {post.likes.length}</p>

                                {/* Attachments */}
                                <div className="mt-4">
                                    <strong className="text-gray-700">Attachments:</strong>
                                    {post.attachments.length > 0 ? (
                                        <ul className="list-disc pl-5 text-blue-600">
                                            {post.attachments.map((attachment) => (
                                                <li key={attachment.id}>
                                                    <a 
                                                        href={attachment.url} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        className="hover:underline"
                                                    >
                                                        {attachment.filename}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500">No attachments available.</p>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">No posts available.</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}