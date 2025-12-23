// Base skeleton component with shimmer animation
export default function SkeletonBase({ className = '', variant = 'rounded' }) {
  const variantClass = {
    rounded: 'rounded-lg',
    circle: 'rounded-full',
    text: 'rounded',
    card: 'rounded-xl',
  };

  return (
    <div
      className={`bg-[#c6dabf] animate-pulse ${variantClass[variant] || variantClass.rounded} ${className}`}
      style={{
        background: 'linear-gradient(90deg, #c6dabf 25%, #e8f0e3 50%, #c6dabf 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }}
    >
      <style>
        {`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
        `}
      </style>
    </div>
  );
}
