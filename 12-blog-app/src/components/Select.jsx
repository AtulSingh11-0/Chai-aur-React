import React, { useId } from 'react'

export default function Select({
  ref,
  label,
  options,
  className = '',
  ...props
}) {
  const id = useId();
  return (
    <div>
      {label &&
        <label htmlFor={id} className="block mb-1 font-medium text-sm text-gray-700">
          {label}
        </label>
      }
      <select
        ref={ref}
        id={id}
        className={className}
        {...props}
      >
        {options?.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
};
