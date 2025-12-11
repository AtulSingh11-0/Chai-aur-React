
export default function Button({
  text,
  type = 'button',
  bgColor = 'bg-blue-600',
  textColor = 'text-white',
  style = {},
  className = '',
  ...props

}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
      style={style}
      {...props}
    >
      {text}
    </button>
  )
}
