import parse from 'html-react-parser';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router';
import { Button, Container, Input } from '../components';
import postService from '../lib/postService';
import storageService from '../lib/storageService';
import engagementService from '../lib/engagementService';
import { calculateReadingTime } from '../utils/readingTime';

export default function Post() {
  const [post, setPost] = React.useState(null);
  const [authorName, setAuthorName] = React.useState('Loading...');
  const [readingTime, setReadingTime] = React.useState(0);
  const [isLiked, setIsLiked] = React.useState(false);
  const [isLiking, setIsLiking] = React.useState(false);
  const [showCopied, setShowCopied] = React.useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector(state => state.auth.userData);
  const isAuthor = post && userData ? post.authorId === userData.$id : false;

  const handleLikeAndUnlike = async () => {
    // prevent multiple simultaneous requests (debounce)
    if (isLiking) return;

    setIsLiking(true);
    try {
      const toggleValue = await engagementService.toggleLike(post, userData.$id);
      if (toggleValue !== null) {
        // update both liked state and count
        setIsLiked(toggleValue.liked);
        setPost(prevPost => ({
          ...prevPost,
          likesCount: toggleValue.updatedLikesCount,
        }));
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLiking(false);
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: `Check out this article: ${post.title}`,
      url: window.location.href,
    };

    try {
      // Check if Web Share API is supported
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      }
    } catch (error) {
      // User cancelled share or error occurred
      if (error.name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
    }
  }

  // check if current user has liked this post
  const checkIfUserLiked = async (postId, userId) => {
    if (!userId) return;
    try {
      const hasLiked = await engagementService.checkIfUserLiked(postId, userId);
      setIsLiked(hasLiked);
    } catch (error) {
      console.error('Error checking like status:', error);
    }
  }

  React.useEffect(() => {
    if (!slug) navigate('/');
    postService.getPostBySlug(slug)
      .then(post => {
        if (post) {
          setPost(post);
          // Calculate reading time
          setReadingTime(calculateReadingTime(post.content));
          // If current user is the author, use their name
          if (userData && post.authorId === userData.$id) {
            setAuthorName(userData.name);
          } else {
            setAuthorName('Anonymous');
          }
          // Check if user has liked this post
          if (userData) {
            checkIfUserLiked(post.$id, userData.$id);
          }
        }
        else navigate('/'); // Redirect if post not found
      })
      .catch(() => navigate('/'));
  }, [slug, navigate, userData]);

  const deletePost = async () => {
    await postService.deletePost(post.$id)
      .then(async status => {
        if (status) {
          await storageService.deleteFile(post.featuredImage);
          navigate('/');
        }
      });
  };

  return post ? (
    <div className='min-h-screen bg-[#f3e9d2] py-12'>
      <Container>
        <div className='max-w-5xl mx-auto'>
          {/* Post Header Section */}
          <div className='mb-8'>
            <h1 className="text-4xl md:text-6xl font-bold text-[#114b5f] mb-4">{post.title}</h1>
            <div className='flex flex-wrap items-center gap-4 text-gray-600 text-sm mb-6'>
              <div className='flex items-center gap-2'>
                <div className='w-10 h-10 rounded-full bg-linear-to-br from-[#114b5f] to-[#1a936f] flex items-center justify-center text-white font-semibold'>
                  {authorName?.charAt(0).toUpperCase()}
                </div>
                <span className='font-medium text-[#114b5f]'>{authorName}</span>
              </div>
              <span className='text-[#c6dabf]'>•</span>
              <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span className='text-[#c6dabf]'>•</span>
              <div className='flex items-center gap-1.5 px-3 py-1.5 bg-[#88d498] bg-opacity-20 rounded-full text-[#114b5f] font-medium'>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                <span>{readingTime} min read</span>
              </div>
            </div>

            {/* Author Actions */}
            {isAuthor && (
              <div className='flex gap-3 mb-6 pb-6 border-b border-[#c6dabf]'>
                <Link to={`/edit-post/${post.slug}`}>
                  <Button
                    text="Edit"
                    variant="secondary"
                  />
                </Link>
                <Button
                  text="Delete"
                  variant="danger"
                  onClick={deletePost}
                />
              </div>
            )}

            {/* Featured Image */}
            {post.featuredImage && (
              <div className='relative rounded-xl overflow-hidden mb-8'>
                <img
                  src={storageService.getFilePreviewURL(post.featuredImage)}
                  alt={post.title}
                  className='w-full h-96 object-cover'
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Post Content */}
          <article className='browser-css mb-8'>
            {parse(post.content)}
          </article>

          {/* Clear floats */}
          <div className='clear-both'></div>

          {/* Engagement Bar */}
          <div className='flex items-center justify-between py-6 border-y-2 border-[#c6dabf]'>
            <div className='flex items-center gap-6'>
              {/* Like Button */}
              <button
                onClick={handleLikeAndUnlike}
                disabled={isLiking}
                className='flex items-center gap-2 group transition-all duration-200'
              >
                {isLiking ? (
                  <div className='w-7 h-7 flex items-center justify-center'>
                    <div className='animate-spin rounded-full h-5 w-5 border-2 border-[#1a936f] border-t-transparent'></div>
                  </div>
                ) : (
                  <svg
                    className={`w-7 h-7 transition-all duration-200 ${isLiked
                      ? 'text-[#1a936f] fill-current scale-110'
                      : 'text-gray-400 group-hover:text-[#1a936f] group-hover:scale-110'
                      }`}
                    fill={isLiked ? 'currentColor' : 'none'}
                    stroke='currentColor'
                    strokeWidth={isLiked ? 0 : 2}
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
                    />
                  </svg>
                )}
                <span className={`text-lg font-semibold transition-colors ${isLiked ? 'text-[#1a936f]' : 'text-gray-600 group-hover:text-[#1a936f]'
                  }`}>
                  {post.likesCount || 0}
                </span>
              </button>

              {/* Comments */}
              <div className='flex items-center gap-2 text-gray-400'>
                <svg className='w-7 h-7' fill='none' stroke='currentColor' strokeWidth={2} viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                </svg>
                <span className='text-lg font-semibold text-gray-600'>{post.commentsCount || 0}</span>
              </div>
            </div>

            {/* Share */}
            <div className='relative'>
              <button
                onClick={handleShare}
                className='flex items-center gap-2 text-gray-400 hover:text-[#114b5f] transition-colors group'
              >
                <svg className='w-6 h-6' fill='none' stroke='currentColor' strokeWidth={2} viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z' />
                </svg>
                <span className='text-sm font-medium group-hover:text-[#114b5f]'>Share</span>
              </button>

              {/* Copied notification */}
              {showCopied && (
                <div className='absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#1a936f] text-white text-xs font-semibold rounded-lg shadow-lg whitespace-nowrap animate-fade-in'>
                  Link copied!
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
