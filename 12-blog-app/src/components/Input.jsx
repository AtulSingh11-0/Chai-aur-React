import React, { useId } from 'react'

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
      {label && (<label
        htmlFor={id}
        className='inline-block mb-1 pl-1'
      >
        {label}
      </label>
      )}
      <input
        type={type}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        style={style}
        {...props}
      />
    </div>
  )
};
