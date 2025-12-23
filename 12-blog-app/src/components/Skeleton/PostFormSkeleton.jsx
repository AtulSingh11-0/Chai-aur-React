import { Container } from '../index';
import SkeletonBase from './SkeletonBase';

export default function PostFormSkeleton() {
  return (
    <div className='min-h-screen bg-[#f3e9d2] py-12'>
      <Container>
        <div className='max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 lg:p-12'>
          {/* Title */}
          <div className='mb-8'>
            <SkeletonBase className='h-8 w-48 mb-6' variant='text' />
          </div>

          {/* Form Fields */}
          <div className='space-y-6'>
            {/* Title Input */}
            <div>
              <SkeletonBase className='h-5 w-24 mb-2' variant='text' />
              <SkeletonBase className='h-12 w-full' variant='rounded' />
            </div>

            {/* Slug Input */}
            <div>
              <SkeletonBase className='h-5 w-20 mb-2' variant='text' />
              <SkeletonBase className='h-12 w-full' variant='rounded' />
            </div>

            {/* Content Editor */}
            <div>
              <SkeletonBase className='h-5 w-28 mb-2' variant='text' />
              <SkeletonBase className='h-96 w-full' variant='rounded' />
            </div>

            {/* Featured Image */}
            <div>
              <SkeletonBase className='h-5 w-36 mb-2' variant='text' />
              <SkeletonBase className='h-40 w-full' variant='rounded' />
            </div>

            {/* Status Select */}
            <div>
              <SkeletonBase className='h-5 w-20 mb-2' variant='text' />
              <SkeletonBase className='h-12 w-full' variant='rounded' />
            </div>

            {/* Submit Button */}
            <div className='flex gap-4'>
              <SkeletonBase className='h-12 w-32' variant='rounded' />
              <SkeletonBase className='h-12 w-24' variant='rounded' />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
