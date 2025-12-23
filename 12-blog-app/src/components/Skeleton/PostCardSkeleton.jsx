import SkeletonBase from './SkeletonBase';

export default function PostCardSkeleton() {
  return (
    <div className='block h-full'>
      <article className='h-full bg-white rounded-xl shadow-md border-2 border-transparent overflow-hidden flex flex-col'>
        {/* Featured Image Skeleton */}
        <div className='relative h-52 overflow-hidden bg-[#f3e9d2]'>
          <SkeletonBase className='w-full h-full' variant='card' />
        </div>

        {/* Content Skeleton */}
        <div className='p-5 flex flex-col grow space-y-4'>
          {/* Author and Date Section */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2.5'>
              {/* Avatar */}
              <SkeletonBase className='w-9 h-9' variant='circle' />
              {/* Author Name and Date */}
              <div className='flex flex-col gap-2'>
                <SkeletonBase className='h-4 w-24' variant='text' />
                <SkeletonBase className='h-3 w-20' variant='text' />
              </div>
            </div>
            {/* Reading Time Badge */}
            <SkeletonBase className='h-7 w-16' variant='rounded' />
          </div>

          {/* Engagement Stats */}
          <div className='flex items-center gap-4 pt-3 border-t border-[#f3e9d2]'>
            <div className='flex items-center gap-1.5'>
              <SkeletonBase className='w-5 h-5' variant='circle' />
              <SkeletonBase className='h-4 w-6' variant='text' />
            </div>
            <div className='flex items-center gap-1.5'>
              <SkeletonBase className='w-5 h-5' variant='circle' />
              <SkeletonBase className='h-4 w-6' variant='text' />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
