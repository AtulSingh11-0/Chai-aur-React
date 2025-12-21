import React from 'react';
import Button from '../Common/Button';
import Select from '../Common/Select';
import Comment from './Comment';

export default function CommentSection({
  post,
  userData,
  comments,
  isLoading,
  onCommentSubmit,
  onCommentEdit,
  onCommentDelete,
  onSortChange
}) {
  const [commentText, setCommentText] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async () => {
    if (!commentText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onCommentSubmit(commentText);
      setCommentText('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className='mt-8'>
      {/* Comments Header */}
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-2'>
          <h2 className='text-2xl font-bold text-[#114b5f]'>
            Comments
          </h2>
          <span className='px-3 py-1 bg-[#88d498] bg-opacity-30 text-[#114b5f] rounded-full text-sm font-semibold'>
            {post.commentsCount || 0}
          </span>
        </div>
        {onSortChange && (
          <div className='flex items-center gap-2'>
            <svg className='w-5 h-5 text-gray-500' fill='none' stroke='currentColor' strokeWidth={2} viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4' />
            </svg>
            <Select
              variant='inline'
              label='Sort:'
              options={[
                'newest first',
                'oldest first',
              ]}
              onChange={(e) => onSortChange(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Comment Input Section */}
      <div className='mb-8 p-5 bg-white rounded-xl border border-[#c6dabf] shadow-sm'>
        <div className='flex items-start gap-3'>
          <div className='w-10 h-10 rounded-full bg-linear-to-br from-[#114b5f] to-[#1a936f] flex items-center justify-center text-white font-semibold shrink-0'>
            {userData?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className='flex-1'>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder='Share your thoughts...'
              className='w-full px-4 py-3 rounded-lg bg-[#f3e9d2] bg-opacity-50 text-[#114b5f] outline-none focus:ring-2 focus:ring-[#1a936f] focus:ring-offset-0 duration-200 border border-[#c6dabf] placeholder:text-gray-400 resize-none'
              rows={3}
            />
            <div className='flex items-center justify-between mt-3'>
              <span className='text-xs text-gray-500'>
                Press Enter to submit, Shift+Enter for new line
              </span>
              <Button
                text={isSubmitting ? 'Posting...' : 'Post Comment'}
                variant='primary'
                onClick={handleSubmit}
                disabled={!commentText.trim() || isSubmitting}
                className='text-sm px-4 py-2'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      {isLoading ? (
        <div className='flex flex-col items-center justify-center py-12'>
          <div className='animate-spin rounded-full h-12 w-12 border-4 border-[#c6dabf] border-t-[#1a936f]'></div>
          <p className='mt-4 text-gray-500'>Loading comments...</p>
        </div>
      ) : comments.length > 0 ? (
        <div className='space-y-4'>
          {comments.map((comment) => (
            <Comment
              key={comment.$id}
              comment={comment}
              userId={userData?.$id}
              onEdit={onCommentEdit}
              onDelete={onCommentDelete}
            />
          ))}
        </div>
      ) : (
        <div className='text-center py-12'>
          <svg
            className='w-16 h-16 mx-auto text-gray-300 mb-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
            />
          </svg>
          <p className='text-gray-500 font-medium'>No comments yet</p>
          <p className='text-gray-400 text-sm mt-1'>Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  );
}
