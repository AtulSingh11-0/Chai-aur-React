import React from 'react'
import { Container, PostCard } from '../components'
import postService from '../lib/postService'

export default function AllPosts() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    postService.getAllPosts()
      .then(response => {
        if (response && response.rows) {
          setPosts(response.rows);
        }
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    postService.getAllPosts()
      .then(response => {
        if (response && response.rows) {
          setPosts(response.rows);
        }
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className='min-h-screen bg-[#f3e9d2] py-12'>
      <Container>
        <div className='mb-12'>
          <h1 className='text-4xl font-bold text-[#114b5f] mb-2'>All Posts</h1>
          <p className='text-lg text-gray-700'>Explore our latest articles</p>
        </div>

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
