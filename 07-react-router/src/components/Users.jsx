import { useEffect, useState } from 'react';
import { Link } from 'react-router';

export default function Users() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  /** Example user data structure from API:
  {
    "id": 1,
    "firstName": "Emily",
    "lastName": "Johnson",
    "maidenName": "Smith",
    "age": 29,
    "gender": "female",
    "email": "emily.johnson@x.dummyjson.com",
    "phone": "+81 965-431-3024",
    "username": "emilys",
    "password": "emilyspass",
    "birthDate": "1996-5-30",
    "image": "https://dummyjson.com/icon/emilys/128",
    "bloodGroup": "O-",
    "height": 193.24,
    "weight": 63.16,
    "eyeColor": "Green",
    "hair": {
      "color": "Brown",
      "type": "Curly"
    },
    "ip": "42.48.100.32",
    "address": {
      "address": "626 Main Street",
      "city": "Phoenix",
      "state": "Mississippi",
      "stateCode": "MS",
      "postalCode": "29112",
      "coordinates": {
        "lat": -77.16213,
        "lng": -92.084824
      },
      "country": "United States"
    },
    "macAddress": "47:fa:41:18:ec:eb",
    "university": "University of Wisconsin--Madison",
    "bank": {
      "cardExpire": "05/28",
      "cardNumber": "3693233511855044",
      "cardType": "Diners Club International",
      "currency": "GBP",
      "iban": "GB74MH2UZLR9TRPHYNU8F8"
    },
    "company": {
      "department": "Engineering",
      "name": "Dooley, Kozey and Cronin",
      "title": "Sales Manager",
      "address": {
        "address": "263 Tenth Street",
        "city": "San Francisco",
        "state": "Wisconsin",
        "stateCode": "WI",
        "postalCode": "37657",
        "coordinates": {
          "lat": 71.814525,
          "lng": -161.150263
        },
        "country": "United States"
      }
    },
    "ein": "977-175",
    "ssn": "900-590-289",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
    "crypto": {
      "coin": "Bitcoin",
      "wallet": "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
      "network": "Ethereum (ERC20)"
    },
    "role": "admin"
  }
  */

  async function fetchUserData() {
    try {
      const response = await fetch('https://dummyjson.com/users')
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result.users);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-orange-50 to-red-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 font-semibold">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-orange-50 to-red-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <div className="text-red-600 text-5xl mb-4 text-center">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Error</h2>
          <p className="text-gray-600 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-red-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Users
          </h1>
          <p className="text-lg text-gray-600">
            Meet our community of {data.length} amazing users
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((user) => (
            <Link
              key={user.id}
              to={`/users/${user.id}`}
              prefetch='intent'
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden block"
            >
              <div
                key={user.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="bg-linear-to-r from-orange-500 to-red-500 h-24 relative">
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                    <img
                      src={user.image}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-24 h-24 rounded-full shadow-lg border-4 border-white object-cover"
                    />
                  </div>
                </div>

                <div className="pt-16 pb-6 px-6">
                  <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-sm text-gray-500 text-center mb-1">
                    @{user.username}
                  </p>
                  <p className="text-xs text-gray-400 text-center mb-4">
                    {user.age} years • {user.gender}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-3 text-orange-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm truncate">{user.email}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-3 text-orange-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-sm">{user.phone}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-3 text-orange-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span className="text-sm truncate">{user.university}</span>
                    </div>

                    <div className="flex items-start text-gray-600">
                      <svg className="w-5 h-5 mr-3 mt-0.5 text-orange-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm">
                        {user.address.address}, {user.address.city}, {user.address.state}
                      </span>
                    </div>
                  </div>

                  <div className="bg-linear-to-r from-orange-50 to-red-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 font-semibold mb-1">COMPANY</p>
                    <p className="text-sm font-bold text-gray-800">{user.company.name}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {user.company.title} • {user.company.department}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
