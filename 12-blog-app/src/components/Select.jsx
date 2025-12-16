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
    <div className='w-full'>
      {label &&
        <label htmlFor={id} className="block mb-3 font-semibold text-sm text-slate-700">
          {label}
        </label>
      }
      <select
        ref={ref}
        id={id}
        className={`w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-700 font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 hover:border-slate-300 transition-all duration-200 outline-none cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3cpath%20d%3D%22M7%207l3-3%203%203m0%206l-3%203-3-3%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3c%2Fsvg%3E')] bg-size-[1.5em] bg-position-[right_0.5rem_center] bg-no-repeat pr-10 ${className}`}
        {...props}
      >
        {options?.map(option => (
          <option
            key={option}
            value={option}
            className='py-2 px-4 bg-white hover:bg-indigo-50 text-slate-700 font-medium'
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  )
};
