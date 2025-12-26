import { Container } from '../index';
import SkeletonBase from './SkeletonBase';

export default function PostFormSkeleton() {
  return (
    <div className='min-h-screen bg-[#f3e9d2] py-12'>
      <Container>
        <div className='max-w-7xl mx-auto animate-pulse'>
          {/* Page Title */}
          <div className='mb-8'>
            <SkeletonBase className='h-10 w-64' variant='text' />
          </div>

          {/* Two Column Grid Layout */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>

            {/* Left Column (2/3 width on large screens) */}
            <div className='lg:col-span-2 space-y-6'>

              {/* Title Input Card */}
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <SkeletonBase className='h-5 w-16 mb-3' variant='text' />
                <SkeletonBase className='h-12 w-full' variant='rounded' />
              </div>

              {/* Slug Input Card */}
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <SkeletonBase className='h-5 w-14 mb-3' variant='text' />
                <SkeletonBase className='h-12 w-full' variant='rounded' />
              </div>

              {/* Rich Text Editor Card */}
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <SkeletonBase className='h-5 w-20 mb-3' variant='text' />

                {/* Editor Toolbar */}
                <div className='mb-3 flex gap-2 p-2 bg-gray-50 rounded-t-lg border border-gray-200'>
                  <SkeletonBase className='h-8 w-8' variant='rounded' />
                  <SkeletonBase className='h-8 w-8' variant='rounded' />
                  <SkeletonBase className='h-8 w-8' variant='rounded' />
                  <SkeletonBase className='h-8 w-8' variant='rounded' />
                  <SkeletonBase className='h-8 w-8' variant='rounded' />
                  <div className='w-px h-8 bg-gray-300'></div>
                  <SkeletonBase className='h-8 w-8' variant='rounded' />
                  <SkeletonBase className='h-8 w-8' variant='rounded' />
                  <SkeletonBase className='h-8 w-8' variant='rounded' />
                </div>

                {/* Editor Content Area */}
                <SkeletonBase className='h-96 w-full' variant='rounded' />
              </div>
            </div>

            {/* Right Column (1/3 width on large screens) */}
            <div className='space-y-6'>

              {/* Featured Image Upload Card */}
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <SkeletonBase className='h-5 w-32 mb-3' variant='text' />
                <SkeletonBase className='h-40 w-full' variant='rounded' />
                <SkeletonBase className='h-10 w-full mt-3' variant='rounded' />
              </div>

              {/* Current Image Preview Card */}
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <SkeletonBase className='h-5 w-28 mb-3' variant='text' />
                <div className='aspect-video w-full'>
                  <SkeletonBase className='h-full w-full' variant='rounded' />
                </div>
              </div>

              {/* Status Dropdown Card */}
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <SkeletonBase className='h-5 w-16 mb-3' variant='text' />
                <SkeletonBase className='h-12 w-full' variant='rounded' />
              </div>

              {/* Action Button Card */}
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <SkeletonBase className='h-12 w-full' variant='rounded' />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
