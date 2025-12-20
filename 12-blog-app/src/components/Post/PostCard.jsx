import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import storageService from '../../lib/storageService';

// Hashnode Modern Design
export default function PostCard({ slug, title, featuredImage, authorId, publishedDate, readingTime, likesCount, commentsCount }) {
  const userData = useSelector(state => state.auth.userData);
  const authorName = userData && authorId === userData.$id ? userData.name : 'Anonymous';

  return (
    <Link to={`/post/${slug}`} className='block h-full group'>
      <article className='h-full bg-white rounded-xl shadow-md hover:shadow-xl hover:border-[#88d498] border-2 border-transparent transition-all duration-300 overflow-hidden flex flex-col'>
        <div className='relative h-52 overflow-hidden bg-[#f3e9d2]'>
          {featuredImage ? (
            <>
              <img
                src={storageService.getFilePreviewURL(featuredImage)}
                alt={title}
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent'></div>
              <h2 className='absolute bottom-4 left-4 right-4 text-xl font-bold text-white line-clamp-2 drop-shadow-lg leading-tight'>
                {title}
              </h2>
            </>
          ) : (
            <div className='w-full h-full flex flex-col items-center justify-center'>
              <svg className='w-16 h-16 text-[#c6dabf] mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
              </svg>
              <h2 className='text-xl font-bold text-[#114b5f] line-clamp-2 px-4 text-center leading-tight'>
                {title}
              </h2>
            </div>
          )}
        </div>

        <div className='p-5 flex flex-col grow space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2.5'>
              <div className='w-9 h-9 rounded-full bg-linear-to-br from-[#114b5f] to-[#1a936f] flex items-center justify-center text-white text-sm font-bold shadow'>
                {authorName?.charAt(0).toUpperCase()}
              </div>
              <div className='flex flex-col'>
                <span className='text-sm font-semibold text-[#114b5f]'>{authorName}</span>
                <span className='text-xs text-gray-500'>{new Date(publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
            <div className='flex items-center gap-1 px-2.5 py-1 bg-[#88d498] bg-opacity-15 rounded-full text-[#114b5f] text-xs font-semibold'>
              <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              <span>{readingTime} min</span>
            </div>
          </div>

          <div className='flex items-center gap-4 pt-3 border-t border-[#f3e9d2]'>
            <div className='flex items-center gap-1.5 text-gray-600'>
              <svg className='w-5 h-5 text-[#1a936f]' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
              </svg>
              <span className='text-sm font-semibold'>{likesCount || 0}</span>
            </div>
            <div className='flex items-center gap-1.5 text-gray-600'>
              <svg className='w-5 h-5 text-[#114b5f]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
              </svg>
              <span className='text-sm font-semibold'>{commentsCount || 0}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
