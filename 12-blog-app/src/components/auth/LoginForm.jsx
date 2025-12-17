import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import authService from '../../lib/authService';
import { login } from '../../store/authSlice';
import { Button, Input, Logo } from '../index';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const response = await authService.login(data);
      if (response) {
        const currentUser = await authService.getCurrentUser();
        dispatch(login(currentUser));
        navigate('/');
      }
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("Login failed : " + error.message);
    }
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-[#f3e9d2] p-4 lg:p-8'>
      <div className='w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl'>
        {/* Left Panel - Hidden on mobile */}
        <div className='hidden lg:flex flex-col justify-center items-center bg-linear-to-br from-[#114b5f] via-[#1a936f] to-[#114b5f] p-12 text-white relative overflow-hidden min-h-[600px]'>
          {/* Decorative circles */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#88d498]/20 rounded-full blur-3xl"></div>

          <div className='relative z-10 max-w-md text-center'>
            <div className="mb-8">
              <span className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Logo width="60%" />
              </span>
            </div>
            <h1 className='text-4xl font-bold mb-6'>Welcome Back!</h1>
            <p className='text-lg text-[#c6dabf] mb-8'>
              Sign in to access your personalized dashboard, manage your posts, and connect with our community.
            </p>
            <div className='space-y-4 text-left'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center'>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className='text-[#c6dabf]'>Access your personalized feed</span>
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center'>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className='text-[#c6dabf]'>Create and manage blog posts</span>
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center'>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className='text-[#c6dabf]'>Connect with other writers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className='flex items-center justify-center bg-white p-6 lg:p-10'>
          <div className='w-full max-w-md'>
            {/* Logo - visible on mobile only */}
            <div className="mb-6 flex justify-center lg:hidden">
              <span className="inline-flex items-center justify-center w-20 h-20 bg-[#c6dabf] rounded-2xl shadow-sm">
                <Logo width="60%" />
              </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-[#114b5f]">
              Welcome back
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sign in to continue to your account
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className='mt-8'>
              <div className='space-y-6'>
                <div>
                  <Input
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                      required: true,
                      pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
                    })}
                  />
                  {errors.email && (
                    <p className='mt-1 text-red-600 text-sm'>
                      Please enter a valid email address
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    label="Password"
                    type='password'
                    placeholder='Enter your password'
                    {...register('password', {
                      required: true,
                      minLength: 8,
                      maxLength: 265
                    })}
                  />
                  {errors.password && (
                    <p className='mt-1 text-red-600 text-sm'>
                      Password must be 8-265 characters
                    </p>
                  )}
                </div>

                <Button
                  text="Sign in"
                  type="submit"
                  variant="primary"
                  className="w-full"
                />
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link
                to="/signup"
                className="font-semibold text-[#1a936f] hover:text-[#114b5f] transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
