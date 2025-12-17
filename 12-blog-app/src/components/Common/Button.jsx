
export default function Button({
  text,
  type = 'button',
  variant = 'primary',
  style = {},
  className = '',
  ...props
}) {
  const variants = {
    primary: 'bg-[#114b5f] hover:bg-[#1a936f] text-white shadow-sm',
    secondary: 'bg-[#c6dabf] hover:bg-[#88d498] text-[#114b5f] shadow-sm',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm',
    ghost: 'bg-transparent hover:bg-[#f3e9d2] text-[#114b5f] border border-[#c6dabf]'
  };

  return (
    <button
      type={type}
      className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] ${variants[variant]} ${className}`}
      style={style}
      {...props}
    >
      {text}
    </button>
  )
}
