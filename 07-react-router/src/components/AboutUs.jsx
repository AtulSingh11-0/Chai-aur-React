import React from 'react';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-teal-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-center">
          About Us
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12 leading-relaxed">
          Learn more about our company and what we do.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-linear-to-br from-green-100 to-teal-100 rounded-xl p-6 shadow-md">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To deliver exceptional solutions that empower businesses and individuals to achieve their goals through innovative technology.
            </p>
          </div>

          <div className="bg-linear-to-br from-blue-100 to-indigo-100 rounded-xl p-6 shadow-md">
            <div className="text-3xl mb-4">👁️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To be the leading provider of cutting-edge solutions that transform the way people interact with technology.
            </p>
          </div>

          <div className="bg-linear-to-br from-purple-100 to-pink-100 rounded-xl p-6 shadow-md">
            <div className="text-3xl mb-4">💎</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Our Values</h3>
            <p className="text-gray-600 leading-relaxed">
              Innovation, integrity, and customer satisfaction are at the core of everything we do.
            </p>
          </div>

          <div className="bg-linear-to-br from-yellow-100 to-orange-100 rounded-xl p-6 shadow-md">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Our Approach</h3>
            <p className="text-gray-600 leading-relaxed">
              We combine creativity with technical expertise to deliver solutions that exceed expectations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
