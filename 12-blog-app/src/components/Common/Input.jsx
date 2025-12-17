import { useId } from 'react';

export default function Input({
  ref,
  label,
  type = 'text',
  className = '',
  style = {},
  ...props
}) {
  const id = useId();

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className='block mb-2 font-medium text-sm text-[#114b5f]'
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        ref={ref}
        className={`px-4 py-2.5 rounded-lg bg-white text-[#114b5f] outline-none focus:ring-2 focus:ring-[#1a936f] focus:ring-offset-0 duration-200 border border-[#c6dabf] w-full placeholder:text-gray-400 ${className}`}
        style={style}
        {...props}
      />
    </div>
  )
};
