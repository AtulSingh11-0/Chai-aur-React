
export default function Home() {
  return (
    <div className='w-full min-h-screen flex items-center justify-center bg-[#f3e9d2] p-8'>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#114b5f] mb-6">
          Welcome to Our Blog
        </h1>
        <p className="text-xl md:text-2xl text-[#1a936f] mb-8">
          Share your stories, connect with readers, and explore amazing content
        </p>
        <div className="inline-block px-8 py-4 bg-linear-to-r from-[#114b5f] to-[#1a936f] text-white rounded-lg shadow-lg text-lg">
          Powered by Appwrite
        </div>
      </div>
    </div>
  )
}
