import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-center">
          Welcome to Our Website
        </h1>
        <p className="text-lg text-gray-600 text-center mb-8 leading-relaxed">
          Discover amazing features and solutions tailored just for you.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-blue-50 rounded-xl hover:shadow-lg transition">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-bold text-gray-800 mb-2">Fast</h3>
            <p className="text-sm text-gray-600">Lightning-fast performance</p>
          </div>

          <div className="text-center p-6 bg-indigo-50 rounded-xl hover:shadow-lg transition">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-bold text-gray-800 mb-2">Secure</h3>
            <p className="text-sm text-gray-600">Enterprise-grade security</p>
          </div>

          <div className="text-center p-6 bg-purple-50 rounded-xl hover:shadow-lg transition">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="font-bold text-gray-800 mb-2">Beautiful</h3>
            <p className="text-sm text-gray-600">Stunning user interface</p>
          </div>
        </div>

        <div className="text-center">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 transform hover:scale-105">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
