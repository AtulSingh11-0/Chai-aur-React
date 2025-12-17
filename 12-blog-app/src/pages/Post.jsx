import parse from 'html-react-parser';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router';
import { Button, Container } from '../components';
import postService from '../lib/postService';
import storageService from '../lib/storageService';

export default function Post() {
  const [post, setPost] = React.useState(null);
  const [authorName, setAuthorName] = React.useState('Loading...');
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector(state => state.auth.userData);
  const isAuthor = post && userData ? post.authorId === userData.$id : false;


  React.useEffect(() => {
    if (!slug) navigate('/');
    postService.getPostBySlug(slug)
      .then(post => {
        if (post) {
          setPost(post);
          // If current user is the author, use their name
          if (userData && post.authorId === userData.$id) {
            setAuthorName(userData.name);
          } else {
            setAuthorName('Anonymous');
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
            <div className='flex items-center gap-4 text-gray-600 text-sm mb-6'>
              <div className='flex items-center gap-2'>
                <div className='w-10 h-10 rounded-full bg-[#114b5f] flex items-center justify-center text-white font-semibold'>
                  {authorName?.charAt(0).toUpperCase()}
                </div>
                <span className='font-medium'>{authorName}</span>
              </div>
              <span className='text-[#c6dabf]'>•</span>
              <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
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

          {/* Post Content - Full Width Container */}
          <article className='browser-css'>
            {parse(post.content)}
          </article>

          {/* Clear floats */}
          <div className='clear-both'></div>
        </div>
      </Container>
    </div>
  ) : null;
}
