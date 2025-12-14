import React from 'react'
import { Link } from 'react-router'
import storageService from '../lib/storageService';

export default function BlogPostCard({ $id, title, featuredImage, author, publishedDate }) {
  return (
    <Link to={`/posts/${$id}`}>
      <div className='w-full bg-amber-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          <img src={storageService.getFilePreviewURL(featuredImage)} alt={title} />
        </div>
        <h2 className='text-2xl font-bold mb-2'>{title}</h2>
        <div className='flex items-center justify-between text-sm text-gray-600'>
          <span>By {author}</span>
          <span>{new Date(publishedDate).toLocaleDateString()}</span>
        </div>
      </div>
    </Link >
  );
}
