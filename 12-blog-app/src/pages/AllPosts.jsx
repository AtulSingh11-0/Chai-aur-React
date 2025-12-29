import React from 'react';
import { Link } from 'react-router';
import { Button, Container, Input, PostCard, PostCardSkeleton } from '../components';
import postService from '../lib/postService';

export default function AllPosts() {
  const LIMIT = 12;
  const TYPING_SPEED = 50; // milliseconds per character
  const DELETING_SPEED = 50; // milliseconds per character
  const INITIAL_DELAY = 500; // initial delay before typing starts
  const PAUSE_AT_END = 2000; // pause at end of typing before deleting

  const [hasMore, setHasMore] = React.useState(true);
  const [offset, setOffset] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [isSearching, setIsSearching] = React.useState(false);
  const [placeholder, setPlaceholder] = React.useState('');
  const [placeholderIndex, setPlaceholderIndex] = React.useState(0);

  // dynamic placeholder texts showcasing semantic search capabilities
  const placeholderTexts = React.useMemo(() => [
    "Search with keywords...",
    "How to build a React app?",
    "What is machine learning?",
    "Best practices for API design",
    "Why use TypeScript?",
    "Explain database indexing",
    "Guide to responsive design",
    "What are design patterns?",
  ], []);

  // typing animation effect for placeholder
  React.useEffect(() => {
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;

    // function to handle typing and deleting effect
    const typeText = () => {
      // get current text to type or delete from placeholderTexts
      const currentText = placeholderTexts[placeholderIndex];

      // if we are typing forward
      if (!isDeleting) {
        // typing forward
        setPlaceholder(currentText.substring(0, charIndex + 1));
        charIndex++; // move to next character

        // if finished typing the whole text
        if (charIndex === currentText.length) {
          // pause at end before deleting
          timeoutId = setTimeout(() => {
            isDeleting = true;
            typeText();
          }, PAUSE_AT_END); // 2s pause at end
          return; // exit the block here to avoid setting another timeout
        }
        timeoutId = setTimeout(typeText, TYPING_SPEED); // typing speed
      } else {
        // deleting backward
        setPlaceholder(currentText.substring(0, charIndex - 1));
        charIndex--; // move to previous character

        // if finished deleting
        if (charIndex === 0) {
          isDeleting = false; // switch to typing mode
          setPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length); // move to next placeholder text
          timeoutId = setTimeout(typeText, INITIAL_DELAY); // brief pause before typing next
          return; // exit the block here to avoid setting another timeout
        }
        timeoutId = setTimeout(typeText, DELETING_SPEED); // deleting speed
      }
    };

    timeoutId = setTimeout(typeText, INITIAL_DELAY); // initial delay before starting typing
    return () => clearTimeout(timeoutId); // cleanup on unmount
  }, [placeholderIndex, placeholderTexts]);

  // fetch all posts on mount
  React.useEffect(() => {
    fetchPosts(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPosts = async (isNewSearch = false) => {
    const currentOffset = isNewSearch ? 0 : offset;

    // Use different loading states for initial load vs load more
    if (isNewSearch) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    setError(null);

    try {
      const response = await postService.getAllPosts([], LIMIT, currentOffset);
      if (response && response.rows) {
        if (isNewSearch) {
          setPosts(response.rows);
          setOffset(LIMIT);
        } else {
          setPosts(prevPosts => [...prevPosts, ...response.rows]);
          setOffset(currentOffset + LIMIT);
        }
        // check if more posts to load
        setHasMore(response.total > currentOffset + LIMIT);
      }
    } catch (error) {
      console.log('Error fetching posts:', error);
      setError("Failed to load posts. Please try again later.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      // if search is empty, reload all posts
      setIsSearching(false);
      fetchPosts(true);
      return;
    }

    setLoading(true);
    setIsSearching(true);
    setError(null);
    try {
      {
        const { data } = await postService.searchPostsByRelevance(searchTerm);
        setPosts(Array.isArray(data?.rows) ? data.rows : []);
        setHasMore(false); // disable load more for search results
      }
    } catch (error) {
      console.log('Error searching posts:', error);
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setIsSearching(false);
    setError(null);
    setHasMore(true); // Re-enable load more when clearing search
    fetchPosts(true);
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
                placeholder={placeholder + (placeholder ? '|' : '')}
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
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[...Array(6)].map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className='text-center py-20'>
            <div className='text-[#c6dabf] mb-6'>
              <svg className='w-24 h-24 mx-auto' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                {isSearching ? (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                ) : (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                )}
              </svg>
            </div>
            {isSearching ? (
              <>
                <h3 className='text-2xl font-semibold text-[#114b5f] mb-3'>No Results Found</h3>
                <p className='text-gray-600 mb-6'>
                  We couldn't find any posts matching "<span className='font-semibold text-[#114b5f]'>{searchTerm}</span>"
                </p>
                <div className='flex flex-col sm:flex-row gap-3 justify-center items-center'>
                  <Button
                    text="Clear Search"
                    onClick={handleClearSearch}
                    variant="primary"
                  />
                  <Link to='/add-post'>
                    <Button
                      text="Create New Post"
                      variant="secondary"
                    />
                  </Link>
                </div>
                <div className='mt-8 text-sm text-gray-600'>
                  <p className='mb-2'>Try:</p>
                  <ul className='space-y-1'>
                    <li>• Using different keywords</li>
                    <li>• Checking your spelling</li>
                    <li>• Using more general terms</li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <h3 className='text-2xl font-semibold text-[#114b5f] mb-3'>No Posts Yet</h3>
                <p className='text-gray-600 mb-6'>"No content available at the moment. Check back later!"</p>
                <Link to='/add-post'>
                  <Button
                    text="Create Your First Post"
                    variant="primary"
                  />
                </Link>
              </>
            )}
          </div>
        ) : (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {posts.map(post => (
                <PostCard key={post.$id} {...post} />
              ))}
            </div>

            {/* Load More Section - Only show when not searching */}
            {!isSearching && (
              <div className='mt-10 flex justify-center'>
                {loadingMore ? (
                  <div className='flex items-center gap-2 px-6 py-3 text-[#114b5f]'>
                    <div className='animate-spin rounded-full h-5 w-5 border-2 border-[#1a936f] border-t-transparent'></div>
                    <span className='font-medium'>Loading more posts...</span>
                  </div>
                ) : hasMore ? (
                  <Button
                    text="Load More"
                    onClick={() => fetchPosts()}
                    variant="secondary"
                  />
                ) : (
                  <p className='text-gray-600 font-medium'>You've reached the end!</p>
                )}
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  )
}
