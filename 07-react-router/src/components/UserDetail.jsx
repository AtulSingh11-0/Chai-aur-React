import { Link, useLoaderData } from 'react-router';

export async function userDetailLoader({ params }) {
  const response = await fetch(`https://dummyjson.com/users/${params.userId}`);
  if (!response.ok) {
    throw new Response('User not found', { status: 404 });
  }
  return response.json();
}

export default function UserDetail() {
  const user = useLoaderData();

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-red-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/users"
          className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6 font-semibold"
        >
          ← Back to Users
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-linear-to-r from-orange-500 to-red-500 h-32 relative">
            <div className="absolute -bottom-16 left-8">
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-32 h-32 rounded-full shadow-lg border-4 border-white object-cover"
              />
            </div>
          </div>

          <div className="pt-20 pb-8 px-8">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-lg text-gray-600">@{user.username}</p>
              <div className="flex gap-4 mt-2 text-sm text-gray-500">
                <span>{user.age} years</span>
                <span>•</span>
                <span>{user.gender}</span>
                <span>•</span>
                <span>{user.bloodGroup}</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Contact Information</h2>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Email</p>
                  <p className="text-gray-700">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Phone</p>
                  <p className="text-gray-700">{user.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Birth Date</p>
                  <p className="text-gray-700">{user.birthDate}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Address</h2>
                <div>
                  <p className="text-gray-700">{user.address.address}</p>
                  <p className="text-gray-700">
                    {user.address.city}, {user.address.state} {user.address.postalCode}
                  </p>
                  <p className="text-gray-700">{user.address.country}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Professional Information</h2>
              <div className="bg-linear-to-r from-orange-50 to-red-50 rounded-lg p-6">
                <p className="text-lg font-bold text-gray-800 mb-2">{user.company.name}</p>
                <p className="text-gray-700 mb-1">{user.company.title}</p>
                <p className="text-gray-600 text-sm">{user.company.department}</p>
                <p className="text-gray-600 text-sm mt-2">
                  📍 {user.company.address.city}, {user.company.address.state}
                </p>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500 font-semibold">Education</p>
                <p className="text-gray-700">{user.university}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
