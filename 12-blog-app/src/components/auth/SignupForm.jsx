import React from 'react'
import { useForm } from 'react-hook-form';
import { Button, Input, Logo } from '../index'
import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import authService from '../../lib/authService';
import { login } from '../../store/authSlice';

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const response = await authService.signUp(data);
      if (response) {
        const currentUser = await authService.getCurrentUser();
        dispatch(login(currentUser));
        navigate('/');
      }
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
    finally {
      console.log(data);
    }
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 p-4 lg:p-8'>
      <div className='w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/50'>
        {/* Left Panel - Hidden on mobile */}
        <div className='hidden lg:flex flex-col justify-center items-center bg-linear-to-br from-purple-600 via-indigo-600 to-purple-800 p-12 text-white relative overflow-hidden min-h-[650px]'>
          {/* Decorative circles */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>

          <div className='relative z-10 max-w-md text-center'>
            <div className="mb-8">
              <span className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Logo width="60%" />
              </span>
            </div>
            <h1 className='text-4xl font-bold mb-6'>Join Our Community</h1>
            <p className='text-lg text-purple-100 mb-8'>
              Create an account to start sharing your stories, connect with readers, and build your audience.
            </p>
            <div className='space-y-4 text-left'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center'>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>
                <span className='text-purple-100'>Write and publish your stories</span>
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center'>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <span className='text-purple-100'>Build your reader community</span>
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center'>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className='text-purple-100'>Get feedback and grow</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className='flex items-center justify-center bg-white p-6 lg:p-10'>
          <div className='w-full max-w-md'>
            {/* Logo - visible on mobile only */}
            <div className="mb-6 flex justify-center lg:hidden">
              <span className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-sm">
                <Logo width="60%" />
              </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-slate-800">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-slate-500">
              Join us and start your journey
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className='mt-8'>
              <div className='space-y-5'>
                <div>
                  <Input
                    label="Full Name"
                    type='text'
                    placeholder='Enter your full name'
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    {...register('fullName', { required: true })}
                  />
                  {errors.fullName && (
                    <p className='mt-1.5 text-red-500 text-xs flex items-center gap-1'>
                      <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                      Full name is required
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    label="Email"
                    type='email'
                    placeholder='Enter your email'
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    {...register('email', {
                      required: true,
                      pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
                    })}
                  />
                  {errors.email && (
                    <p className='mt-1.5 text-red-500 text-xs flex items-center gap-1'>
                      <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                      Please enter a valid email address
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    label="Password"
                    type='password'
                    placeholder='Enter your password'
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    {...register('password', {
                      required: true,
                      minLength: 8,
                      maxLength: 265
                    })}
                  />
                  {errors.password && (
                    <p className='mt-1.5 text-red-500 text-xs flex items-center gap-1'>
                      <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                      Password must be 8-265 characters
                    </p>
                  )}
                </div>

                <Button
                  text="Create Account"
                  type='submit'
                  className='w-full py-3 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 transition-all duration-300 transform hover:-translate-y-0.5'
                />
              </div>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-200 hover:underline underline-offset-2"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
