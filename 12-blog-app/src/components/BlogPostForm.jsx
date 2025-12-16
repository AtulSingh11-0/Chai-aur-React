import { useCallback, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { PostStatus } from '../constants/enums/postStatus';
import postService from "../lib/postService";
import storageService from "../lib/storageService";
import { Button, Input, RTE, Select } from './';

export default function BlogPostForm({ post }) {
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
      featuredImage: null,
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
        .replace(/\s+/g, '-')      // Replace spaces with hyphens
        .replace(/-+/g, '-')       // Replace multiple hyphens with single hyphen
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    }
    return '';
  }, []);

  const submit = async (data) => {
    // if post exists, we're editing it, otherwise creating new
    if (post) {
      // editing existing post

      // 1. check if featured image was updated
      const featuredImage = data.featuredImage[0] ? await storageService.createFile(data.featuredImage[0]) : null;

      // 2. prepare updated post data
      const updatedPost = {
        ...post,
        title: data.title,
        slug: data.slug,
        content: data.content,
        status: data.status,
        featuredImage: featuredImage ? featuredImage.$id : undefined,
      };
      const updatedPostFromDB = await postService.updatePost(post.$id, updatedPost);

      // 3. redirect to updated post page
      if (updatedPostFromDB) {
        navigate(`/posts/${updatedPostFromDB.slug}`);
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
          navigate(`/posts/${newPostFromDB.slug}`);
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
    <div className='min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8'>
      <form
        onSubmit={handleSubmit(submit)}
        className="max-w-7xl mx-auto"
      >
        <div className='mb-8'>
          <h2 className='text-3xl font-bold text-slate-800'>{post ? 'Edit Post' : 'Create New Post'}</h2>
          <p className='mt-2 text-slate-600'>Fill in the details below to {post ? 'update your' : 'publish a new'} blog post</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Left Section - Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Title Input box */}
            <div className='bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-200/60'>
              <Input
                label="Title"
                placeholder="Enter an engaging title for your post"
                className='w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none text-lg font-medium'
                type='text'
                {...register('title', {
                  required: true,
                })}
              />
            </div>

            {/* Slug Input box */}
            <div className='bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-200/60'>
              <Input
                label='URL Slug'
                placeholder='auto-generated-from-title'
                className='w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none font-mono text-sm'
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
              <p className='mt-2 text-xs text-slate-500'>This will be used in the post URL</p>
            </div>

            {/* Content Rich Text Editor */}
            <div className='bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-200/60'>
              <RTE
                label='Content'
                placeholder='Enter blog post content'
                control={control}
                defaultValue={getValues('content') || ''}
              />
            </div>
          </div>

          {/* Right Section - Sidebar */}
          <div className='lg:col-span-1 space-y-6'>
            {/* Featured Image Input box */}
            <div className='bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-200/60'>
              <Input
                label="Featured Image"
                type='file'
                className='w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 file:cursor-pointer'
                accept="image/png, image/jpeg, image/jpg, image/gif, image/webp, image/svg+xml"
                {...register('featuredImage', {
                  required: !post
                })}
              />
              <p className='mt-2 text-xs text-slate-500'>PNG, JPG, GIF, WEBP, SVG (Max 10MB)</p>
            </div>

            {/* Status Select box */}
            <div className='bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-200/60'>
              <Select
                options={[PostStatus.ACTIVE, PostStatus.ARCHIVED, PostStatus.DRAFT, PostStatus.INACTIVE]}
                label='Status'
                className='w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none bg-white'
                {...register('status', {
                  required: true,
                })}
              />
            </div>

            {/* Preview of existing featured image when editing */}
            {post && (
              <div className='bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-200/60'>
                <label className='block text-sm font-semibold text-slate-700 mb-3'>Current Image</label>
                <img
                  src={storageService.getFilePreviewURL(post.featuredImage)}
                  alt={post.title}
                  className="w-full h-auto rounded-xl shadow-md border border-slate-200"
                />
              </div>
            )}

            {/* Submit Button */}
            <div className='sticky top-6'>
              <Button
                type="submit"
                className={`w-full py-4 ${post ? 'bg-linear-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700' : 'bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'} text-white font-semibold rounded-xl shadow-lg ${post ? 'shadow-emerald-500/30 hover:shadow-emerald-500/40' : 'shadow-indigo-500/30 hover:shadow-indigo-500/40'} transition-all duration-300 transform hover:-translate-y-0.5`}
                text={post ? "✓ Update Post" : "✨ Publish Post"}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
