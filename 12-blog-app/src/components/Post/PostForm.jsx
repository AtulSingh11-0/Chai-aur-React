import { useCallback, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { PostStatus } from '../../constants/enums/postStatus';
import postService from "../../lib/postService";
import storageService from "../../lib/storageService";
import { Button, Input, RTE, Select } from '../index';

export default function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.userData);

  const {
    handleSubmit,
    register,
    setValue,
    control,
    getValues
  } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      featuredImage: post?.featuredImage || null,
      status: post?.status || PostStatus.DRAFT,
    }
  });
  const titleValue = useWatch({ control, name: 'title' });

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
        .replace(/\s+/g, '-')     // Replace spaces with hyphens
        .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    }
    return '';
  }, []);

  const submit = async (data) => {
    // if post exists, we're editing it, otherwise creating new
    if (post) {
      // editing existing post

      // 1. check if featured image was updated (FileList means user selected new file)
      const isNewImageSelected = data.featuredImage instanceof FileList && data.featuredImage.length > 0;
      const featuredImage = isNewImageSelected ? await storageService.createFile(data.featuredImage[0]) : null;

      // 2. prepare updated post data
      const updatedPost = {
        ...post,
        title: data.title,
        slug: data.slug,
        content: data.content,
        status: data.status,
        featuredImage: featuredImage ? featuredImage.$id : post.featuredImage,
      };
      const updatedPostFromDB = await postService.updatePost(post.$id, updatedPost);

      // 3. redirect to updated post page
      if (updatedPostFromDB) {
        navigate(`/post/${updatedPostFromDB.slug}`);
      }
    } else {
      // creating new post

      // 1. upload featured image
      const featuredImage = data.featuredImage[0] ? await storageService.createFile(data.featuredImage[0]) : null;

      // 2. if image upload was successful, create new post
      if (featuredImage) {
        const fileId = featuredImage.$id; // get uploaded file ID
        data.featuredImage = fileId; // replace file object with file ID

        const newPost = {
          ...data,
          title: data.title,
          slug: data.slug,
          content: data.content,
          status: data.status,
          featuredImage: fileId,
          authorId: userData.$id,
        };
        const newPostFromDB = await postService.createPost(newPost);

        // 3. redirect to new post page
        if (newPostFromDB) {
          navigate(`/post/${newPostFromDB.slug}`);
        }
      }
    }
  }

  useEffect(() => {
    if (titleValue) {
      const transformedSlug = slugTransform(titleValue);
      setValue('slug', transformedSlug, {
        shouldValidate: true,
      });
    }
  }, [titleValue, setValue, slugTransform]);

  return (
    <div className='min-h-screen bg-[#f3e9d2] py-12 px-4'>
      <form
        onSubmit={handleSubmit(submit)}
        className="max-w-5xl mx-auto"
      >
        <div className='mb-8'>
          <h2 className='text-3xl font-bold text-[#114b5f]'>{post ? 'Edit Post' : 'Create New Post'}</h2>
          <p className='mt-2 text-gray-700'>Fill in the details below to {post ? 'update your' : 'publish a new'} post</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Left Section - Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Title Input box */}
            <div className='bg-white rounded-xl p-6 border border-[#c6dabf]'>
              <Input
                label="Title"
                placeholder="Enter your post title"
                type='text'
                {...register('title', {
                  required: true,
                })}
              />
            </div>

            {/* Slug Input box */}
            <div className='bg-white rounded-xl p-6 border border-[#c6dabf]'>
              <Input
                label='URL Slug'
                placeholder='auto-generated-from-title'
                type='text'
                onInput={(e) => {
                  const transformedSlug = slugTransform(e.target.value);
                  setValue('slug', transformedSlug, {
                    shouldValidate: true,
                  });
                }}
                {...register('slug', {
                  required: true,
                })}
              />
              <p className='mt-2 text-xs text-gray-600'>This will be used in the post URL</p>
            </div>

            {/* Content Rich Text Editor */}
            <div className='bg-white rounded-xl p-6 border border-[#c6dabf]'>
              <RTE
                label='Content'
                placeholder='Write your post content here...'
                control={control}
                defaultValue={getValues('content') || ''}
              />
            </div>
          </div>

          {/* Right Section - Sidebar */}
          <div className='lg:col-span-1 space-y-6'>
            {/* Featured Image Input box */}
            <div className='bg-white rounded-xl p-6 border border-[#c6dabf]'>
              <Input
                label="Featured Image"
                type='file'
                accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
                {...register('featuredImage', {
                  required: !post
                })}
              />
              <p className='mt-2 text-xs text-gray-600'>PNG, JPG, GIF, WEBP (Max 10MB)</p>
            </div>

            {/* Status Select box */}
            <div className='bg-white rounded-xl p-6 border border-[#c6dabf]'>
              <Select
                options={[PostStatus.ACTIVE, PostStatus.ARCHIVED, PostStatus.DRAFT, PostStatus.INACTIVE]}
                label='Status'
                {...register('status', {
                  required: true,
                })}
              />
            </div>

            {/* Preview of existing featured image when editing */}
            {post && post.featuredImage && (
              <div className='bg-white rounded-xl p-6 border border-[#c6dabf]'>
                <label className='block text-sm font-medium text-[#114b5f] mb-3'>Current Image</label>
                <img
                  src={storageService.getFilePreviewURL(post.featuredImage)}
                  alt={post.title}
                  className="w-full h-auto rounded-lg border border-[#c6dabf]"
                />
              </div>
            )}

            {/* Submit Button */}
            <div className='sticky top-20'>
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                text={post ? "Update Post" : "Publish Post"}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
