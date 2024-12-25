import React from 'react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ product }) {
    return (
            <div className="container mx-auto px-4 py-6">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    {/* Header */}
                    <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">{product.name}</h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Product Image */}
                        <div className="flex justify-center">
                            <img
                                src={product.image ? product.image : '/default-image.jpg'}
                                alt={product.name}
                                className="w-full h-72 object-cover rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col justify-between">
                            <p className="text-gray-700 text-lg leading-relaxed mb-4">{product.description}</p>
                            <p className="text-2xl font-semibold text-gray-800">ราคา: ${product.price}</p>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="mt-8 text-center">
                        <Link
                            href="/products"
                            className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
                        >
                            กลับไปยังรายการสินค้า
                        </Link>
                    </div>
                </div>
            </div>
    );

    
}
