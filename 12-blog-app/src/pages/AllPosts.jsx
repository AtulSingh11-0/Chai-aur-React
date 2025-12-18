import React from 'react'
import { Container, PostCard, Input, Button } from '../components'
import postService from '../lib/postService'
import { Query } from 'appwrite';
import { PostStatus } from '../constants/enums/postStatus';

export default function AllPosts() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [isSearching, setIsSearching] = React.useState(false);

  // fetch all posts on mount
  React.useEffect(() => {
    loadAllPosts();
  }, []);

  const loadAllPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await postService.getAllPosts();
      if (response && response.rows) {
        setPosts(response.rows);
      }
    } catch (error) {
      console.error("Error loading posts:", error);
      setError("Failed to load posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      // if search is empty, reload all posts
      setIsSearching(false);
      loadAllPosts();
      return;
    }

    setLoading(true);
    setIsSearching(true);
    setError(null);
    try {
      const queries = [
        Query.equal("status", PostStatus.ACTIVE),
        Query.search("title", searchTerm),
        Query.orderDesc("publishedDate"),
      ];

      const response = await postService.getAllPosts(queries);
      if (response && response.rows) {
        setPosts(response.rows);
      }
    } catch (error) {
      console.error("Error searching posts:", error);
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setIsSearching(false);
    setError(null);
    loadAllPosts();
  };

  return (
    <div className='min-h-screen bg-[#f3e9d2] py-12'>
      <Container>
        <div className='mb-12'>
          <div className='mb-6'>
            <h1 className='text-4xl font-bold text-[#114b5f] mb-2'>All Posts</h1>
            <p className='text-lg text-gray-700'>
              {isSearching ? `Search results for "${searchTerm}"` : 'Explore our latest articles'}
            </p>
          </div>

          <div className='flex gap-3'>
            <div className='flex-1 relative'>
              <Input
                type="text"
                placeholder="Search posts by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#114b5f] transition-colors cursor-pointer'
                  aria-label='Clear search'
                  tabIndex={0}
                >
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              )}
            </div>
            <Button
              text="Search"
              onClick={handleSearch}
              variant="primary"
            />
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className='mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <svg className='w-6 h-6 text-red-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              <div>
                <p className='text-red-800 font-medium'>{error}</p>
                <p className='text-red-600 text-sm mt-1'>Please check your connection and try again.</p>
              </div>
            </div>
            <button
              onClick={() => setError(null)}
              className='text-red-500 hover:text-red-700 transition-colors'
              aria-label='Dismiss error'
              style={{ cursor: 'pointer' }}
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
        )}

        {loading ? (
          <div className='flex justify-center items-center py-20'>
            <div className='animate-spin rounded-full h-12 w-12 border-2 border-[#1a936f] border-t-transparent'></div>
          </div>
        ) : posts.length === 0 ? (
          <div className='text-center py-20'>
            <div className='text-[#c6dabf] mb-4'>
              <svg className='w-24 h-24 mx-auto' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
              </svg>
            </div>
            <h3 className='text-2xl font-semibold text-[#114b5f] mb-2'>No posts yet</h3>
            <p className='text-gray-600'>Check back later for new content</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {posts.map(post => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}
