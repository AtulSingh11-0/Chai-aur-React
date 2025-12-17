import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import storageService from '../../lib/storageService';

export default function PostCard({ slug, title, featuredImage, authorId, publishedDate }) {
  const userData = useSelector(state => state.auth.userData);
  const authorName = userData && authorId === userData.$id ? userData.name : 'Anonymous';
  return (
    <Link to={`/post/${slug}`} className='block h-full group'>
      <article className='h-full bg-white rounded-xl border border-[#c6dabf] hover:border-[#88d498] hover:shadow-lg transition-all duration-200 overflow-hidden'>
        <div className='relative h-48 overflow-hidden bg-[#f3e9d2]'>
          {featuredImage ? (
            <img
              src={storageService.getFilePreviewURL(featuredImage)}
              alt={title}
              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center'>
              <svg className='w-16 h-16 text-[#c6dabf]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
              </svg>
            </div>
          )}
        </div>
        <div className='p-5'>
          <h2 className='text-lg font-semibold text-[#114b5f] mb-3 line-clamp-2 group-hover:text-[#1a936f] transition-colors'>{title}</h2>
          <div className='flex items-center justify-between text-sm text-gray-600'>
            <div className='flex items-center gap-2'>
              <div className='w-7 h-7 rounded-full bg-[#114b5f] flex items-center justify-center text-white text-xs font-medium'>
                {authorName?.charAt(0).toUpperCase()}
              </div>
              <span className='font-medium'>{authorName}</span>
            </div>
            <span className='text-xs'>{new Date(publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
