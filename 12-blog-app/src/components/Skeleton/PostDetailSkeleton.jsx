import { Container } from '../index';
import SkeletonBase from './SkeletonBase';

export default function PostDetailSkeleton() {
  return (
    <div className='min-h-screen bg-[#f3e9d2] py-12'>
      <Container>
        <div className='max-w-5xl mx-auto animate-pulse'>

          {/* Title Section */}
          <div className='space-y-4 mb-6'>
            <SkeletonBase className='h-10 sm:h-12 w-3/4' variant='text' />
            <SkeletonBase className='h-10 sm:h-12 w-1/2' variant='text' />
          </div>

          {/* Meta Data (Avatar, Name, Date, Reading Time) */}
          <div className='flex items-center gap-4 mb-6'>
            <SkeletonBase className='h-10 w-10' variant='circle' />
            <SkeletonBase className='h-4 w-24' variant='text' />
            <div className='h-1 w-1 bg-[#c6dabf] rounded-full'></div>
            <SkeletonBase className='h-4 w-32' variant='text' />
            <div className='h-1 w-1 bg-[#c6dabf] rounded-full'></div>
            <div className='h-6 w-24 bg-[#88d498] bg-opacity-20 rounded-full'></div>
          </div>

          {/* Author Actions (for post owners - optional in skeleton) */}
          <div className='flex gap-3 mb-6 pb-6 border-b border-[#c6dabf]'>
            <SkeletonBase className='h-10 w-20' variant='rounded' />
            <SkeletonBase className='h-10 w-24' variant='rounded' />
          </div>

          {/* Featured Image */}
          <div className='w-full aspect-2/1 rounded-xl overflow-hidden mb-8'>
            <SkeletonBase className='w-full h-full' />
          </div>

          {/* AI Summary Box */}
          <div className='bg-white p-6 rounded-lg shadow-md border-l-4 border-[#1a936f] mb-8'>
            <div className='flex items-center justify-between mb-4'>
              <SkeletonBase className='h-6 w-32' variant='text' />
              <SkeletonBase className='h-10 w-36' variant='rounded' />
            </div>
            <div className='space-y-3'>
              <SkeletonBase className='h-4 w-full' variant='text' />
              <SkeletonBase className='h-4 w-full' variant='text' />
              <SkeletonBase className='h-4 w-5/6' variant='text' />
            </div>
          </div>

          {/* Main Content Body */}
          <div className='space-y-4 mb-12'>
            <SkeletonBase className='h-4 w-full' variant='text' />
            <SkeletonBase className='h-4 w-11/12' variant='text' />
            <SkeletonBase className='h-4 w-full' variant='text' />
            <SkeletonBase className='h-4 w-full' variant='text' />
            <SkeletonBase className='h-4 w-4/5' variant='text' />

            {/* Bullet points section */}
            <div className='pt-4 space-y-3 pl-4'>
              <SkeletonBase className='h-4 w-1/3' variant='text' />
              <SkeletonBase className='h-4 w-2/5' variant='text' />
              <SkeletonBase className='h-4 w-1/4' variant='text' />
            </div>

            <SkeletonBase className='h-4 w-full' variant='text' />
            <SkeletonBase className='h-4 w-5/6' variant='text' />
          </div>

          {/* Interaction Bar (Likes, Comments, Share) */}
          <div className='flex items-center justify-between py-6 border-y-2 border-[#c6dabf] mb-10'>
            <div className='flex items-center gap-6'>
              <div className='flex items-center gap-2'>
                <SkeletonBase className='h-7 w-7' variant='circle' />
                <SkeletonBase className='h-6 w-8' variant='text' />
              </div>
              <div className='flex items-center gap-2'>
                <SkeletonBase className='h-7 w-7' variant='circle' />
                <SkeletonBase className='h-6 w-8' variant='text' />
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <SkeletonBase className='h-6 w-6' variant='circle' />
              <SkeletonBase className='h-6 w-12' variant='text' />
            </div>
          </div>

          {/* Comments Section */}
          <div>
            {/* Header & Sort */}
            <div className='flex justify-between items-center mb-6'>
              <div className='flex items-center gap-3'>
                <SkeletonBase className='h-6 w-28' variant='text' />
                <div className='h-6 w-10 bg-[#88d498] bg-opacity-20 rounded-full'></div>
              </div>
              <SkeletonBase className='h-10 w-32' variant='rounded' />
            </div>

            {/* Comment Input Box */}
            <div className='bg-white border border-[#c6dabf] rounded-lg p-4 mb-8'>
              <div className='flex items-start gap-4 mb-4'>
                <SkeletonBase className='h-10 w-10' variant='circle' />
                <div className='flex-1'>
                  <SkeletonBase className='h-20 w-full' variant='rounded' />
                </div>
              </div>
              <div className='flex justify-end'>
                <SkeletonBase className='h-10 w-28' variant='rounded' />
              </div>
            </div>

            {/* Comments List */}
            <div className='space-y-6'>
              {[1, 2, 3].map((index) => (
                <div key={index} className='flex gap-4 p-4 bg-white rounded-lg shadow-sm border border-[#c6dabf]'>
                  <SkeletonBase className='w-10 h-10 shrink-0' variant='circle' />
                  <div className='flex-1 space-y-3'>
                    <div className='flex items-center gap-2'>
                      <SkeletonBase className='h-4 w-32' variant='text' />
                      <div className='h-1 w-1 bg-[#c6dabf] rounded-full'></div>
                      <SkeletonBase className='h-3 w-20' variant='text' />
                    </div>
                    <SkeletonBase className='h-4 w-full' variant='text' />
                    <SkeletonBase className='h-4 w-4/5' variant='text' />
                    <div className='flex gap-4 pt-2'>
                      <SkeletonBase className='h-8 w-16' variant='rounded' />
                      <SkeletonBase className='h-8 w-16' variant='rounded' />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}
