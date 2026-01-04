import React from 'react'
import { useForm } from 'react-hook-form';
import { Input } from '../Common';

export default function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Profile Form Data:", data);
    // Handle form submission logic here
  }

  return (
    <div>
      <h2>Create user profile form component</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            label={'Username: '}
            placeholder={'Enter your username'}
            type="text"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <p className='mt-1 text-red-600 text-sm'>{errors.username.message}</p>}
        </div>
        <div>
          <label>Bio</label>
          <textarea
            {...register('bio', { required: 'Bio is required' })}
          ></textarea>
          {errors.bio && <p className='mt-1 text-red-600 text-sm'>{errors.bio.message}</p>}
        </div>
        <div>
          <label>Avatar</label>
          <Input
            label={'Avatar: '}
            type='file'
            accept='image/png, image/jpeg, image/jpg, image/webp'
            {...register('avatar', {
              required: 'Avatar is required',
              validate: {
                fileSize: (files) => {
                  if (!files || files.length === 0) return true;
                  const file = files[0];
                  const maxSize = 5 * 1024 * 1024; // 5MB
                  return file.size <= maxSize || 'File size must be less than 5MB';
                },
                fileType: (files) => {
                  if (!files || files.length === 0) return true;
                  const file = files[0];
                  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
                  return allowedTypes.includes(file.type) || 'Only PNG, JPG, and WEBP images are allowed';
                }
              }
            })}
          />
          {errors.avatar && <p className='mt-1 text-red-600 text-sm'>{errors.avatar.message}</p>}
        </div>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  )
}
