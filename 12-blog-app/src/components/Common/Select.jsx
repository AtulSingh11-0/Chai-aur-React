import { useId } from 'react';

export default function Select({
  ref,
  label,
  options,
  className = '',
  variant = 'default', // 'default' or 'inline'
  ...props
}) {
  const id = useId();

  // Inline variant for compact display (e.g., in toolbars)
  if (variant === 'inline') {
    return (
      <div className='flex items-center gap-2'>
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-600 whitespace-nowrap">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          className={`px-3 py-1.5 rounded-lg border border-[#c6dabf] bg-white text-[#114b5f] text-sm font-medium focus:ring-2 focus:ring-[#1a936f] focus:border-[#1a936f] hover:border-[#88d498] transition-all duration-200 outline-none cursor-pointer ${className}`}
          {...props}
        >
          {options?.map(option => (
            <option
              key={option}
              value={option}
              className='py-2 bg-white text-[#114b5f] font-medium'
            >
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // Default variant
  return (
    <div className='w-full'>
      {label && (
        <label htmlFor={id} className="block mb-2 font-medium text-sm text-[#114b5f]">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={id}
        className={`w-full px-4 py-2.5 rounded-lg border border-[#c6dabf] bg-white text-[#114b5f] font-medium focus:ring-2 focus:ring-[#1a936f] focus:ring-offset-0 hover:border-[#88d498] transition-all duration-200 outline-none cursor-pointer ${className}`}
        {...props}
      >
        {options?.map(option => (
          <option
            key={option}
            value={option}
            className='py-2 px-4 bg-white text-[#114b5f] font-medium'
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  )
};
