import React from 'react';
import Button from '../Common/Button';

export default function Comment({ comment, userId, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editText, setEditText] = React.useState(comment.commentText);

  const isOwner = comment.userId === userId;

  const handleSaveEdit = () => {
    if (editText.trim() !== '' && editText !== comment.commentText) {
      onEdit(comment.$id, editText);
      setIsEditing(false);
    } else {
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(comment.commentText);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    if (diffInSeconds < 2419200) return `${Math.floor(diffInSeconds / 604800)}w ago`;
    if (diffInSeconds < 29030400) return `${Math.floor(diffInSeconds / 2419200)}mo ago`;
    if (diffInSeconds >= 29030400) return `${Math.floor(diffInSeconds / 29030400)}y ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <div className='mb-4 p-5 bg-white rounded-xl shadow-sm border border-[#c6dabf] hover:shadow-md transition-all duration-200'>
      <div className='flex items-start justify-between mb-3'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-full bg-linear-to-br from-[#114b5f] to-[#1a936f] flex items-center justify-center text-white font-semibold text-sm shrink-0'>
            {comment.username?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <span className='font-semibold text-[#114b5f]'>{comment.username || 'Anonymous'}</span>
              {isOwner && (
                <span className='px-2 py-0.5 text-xs bg-[#88d498] bg-opacity-30 text-[#114b5f] rounded-full font-medium'>
                  You
                </span>
              )}
            </div>
            <span className='text-xs text-gray-500'>{formatDate(comment.$createdAt)}</span>
          </div>
        </div>

        {isOwner && !isEditing && (
          <div className='flex items-center gap-2'>
            <button
              onClick={() => setIsEditing(true)}
              className='p-1.5 text-[#114b5f] hover:bg-[#f3e9d2] rounded-lg transition-colors duration-200'
              aria-label='Edit comment'
            >
              <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth={2} viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
              </svg>
            </button>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this comment?')) {
                  onDelete(comment.$id);
                }
              }}
              className='p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200'
              aria-label='Delete comment'
            >
              <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth={2} viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
              </svg>
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className='space-y-3 mt-3'>
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className='w-full px-4 py-3 rounded-lg bg-[#f3e9d2] bg-opacity-50 text-[#114b5f] outline-none focus:ring-2 focus:ring-[#1a936f] focus:ring-offset-0 duration-200 border border-[#c6dabf] placeholder:text-gray-400 resize-none'
            rows={3}
            placeholder='Edit your comment...'
            autoFocus
          />
          <div className='flex gap-2 justify-end'>
            <Button
              text='Cancel'
              variant='ghost'
              onClick={handleCancelEdit}
              className='text-sm px-3 py-2'
            />
            <Button
              text='Save'
              variant='primary'
              onClick={handleSaveEdit}
              className='text-sm px-3 py-2'
              disabled={!editText.trim() || editText === comment.commentText}
            />
          </div>
        </div>
      ) : (
        <p className='text-gray-700 leading-relaxed ml-13'>{comment.commentText}</p>
      )}
    </div>
  );
}
