import { Container } from '../index';
import SkeletonBase from './SkeletonBase';

export default function PostDetailSkeleton() {
  return (
    <div className='min-h-screen bg-[#f3e9d2] py-12'>
      <Container>
        <article className='max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden'>
          {/* Featured Image Skeleton */}
          <div className='relative w-full h-96'>
            <SkeletonBase className='w-full h-full' />
          </div>

          {/* Content Section */}
          <div className='p-8 lg:p-12'>
            {/* Title Skeleton */}
            <div className='mb-6'>
              <SkeletonBase className='h-10 w-3/4 mb-3' variant='text' />
              <SkeletonBase className='h-10 w-1/2' variant='text' />
            </div>

            {/* Author and Meta Info */}
            <div className='flex flex-wrap items-center gap-4 pb-6 mb-8 border-b-2 border-[#f3e9d2]'>
              <div className='flex items-center gap-3'>
                <SkeletonBase className='w-12 h-12' variant='circle' />
                <div className='flex flex-col gap-2'>
                  <SkeletonBase className='h-4 w-32' variant='text' />
                  <SkeletonBase className='h-3 w-24' variant='text' />
                </div>
              </div>
              <SkeletonBase className='h-8 w-24' variant='rounded' />
            </div>

            {/* Action Buttons Skeleton */}
            <div className='flex items-center gap-4 pb-8 mb-8 border-b-2 border-[#f3e9d2]'>
              <SkeletonBase className='h-10 w-24' variant='rounded' />
              <SkeletonBase className='h-10 w-24' variant='rounded' />
            </div>

            {/* Content Skeleton - Multiple Paragraphs */}
            <div className='space-y-4 mb-8'>
              <SkeletonBase className='h-4 w-full' variant='text' />
              <SkeletonBase className='h-4 w-full' variant='text' />
              <SkeletonBase className='h-4 w-5/6' variant='text' />
              <SkeletonBase className='h-4 w-full' variant='text' />
              <SkeletonBase className='h-4 w-4/5' variant='text' />
              <SkeletonBase className='h-4 w-full' variant='text' />
              <SkeletonBase className='h-4 w-full' variant='text' />
              <SkeletonBase className='h-4 w-3/4' variant='text' />
            </div>

            <div className='space-y-4 mb-8'>
              <SkeletonBase className='h-4 w-full' variant='text' />
              <SkeletonBase className='h-4 w-full' variant='text' />
              <SkeletonBase className='h-4 w-4/5' variant='text' />
              <SkeletonBase className='h-4 w-full' variant='text' />
              <SkeletonBase className='h-4 w-5/6' variant='text' />
            </div>
          </div>
        </article>

        {/* Comments Section Skeleton */}
        <div className='max-w-4xl mx-auto mt-8 bg-white rounded-2xl shadow-xl p-8 lg:p-12'>
          <div className='mb-6'>
            <SkeletonBase className='h-8 w-48 mb-4' variant='text' />
            <SkeletonBase className='h-4 w-32' variant='text' />
          </div>

          {/* Comment Input Skeleton */}
          <div className='mb-8'>
            <SkeletonBase className='h-32 w-full mb-3' variant='rounded' />
            <SkeletonBase className='h-10 w-28' variant='rounded' />
          </div>

          {/* Comments List Skeleton */}
          <div className='space-y-6'>
            {[1, 2, 3].map((index) => (
              <div key={index} className='flex gap-4 p-4 bg-[#f3e9d2] bg-opacity-30 rounded-lg'>
                <SkeletonBase className='w-10 h-10 shrink-0' variant='circle' />
                <div className='flex-1 space-y-3'>
                  <div className='flex items-center gap-2'>
                    <SkeletonBase className='h-4 w-32' variant='text' />
                    <SkeletonBase className='h-3 w-24' variant='text' />
                  </div>
                  <SkeletonBase className='h-4 w-full' variant='text' />
                  <SkeletonBase className='h-4 w-4/5' variant='text' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
