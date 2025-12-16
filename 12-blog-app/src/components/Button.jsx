
export default function Button({
  text,
  type = 'button',
  bgColor = 'bg-indigo-600',
  textColor = 'text-white',
  style = {},
  className = '',
  ...props

}) {
  return (
    <button
      type={type}
      className={`px-6 py-3 rounded-xl font-semibold ${bgColor} ${textColor} hover:opacity-90 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={style}
      {...props}
    >
      {text}
    </button>
  )
}
