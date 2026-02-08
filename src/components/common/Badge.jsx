const variants = {
  primary: 'bg-primary-light text-primary',
  success: 'bg-green-50 text-success',
  error: 'bg-red-50 text-error',
  warning: 'bg-amber-50 text-warning',
  neutral: 'bg-gray-100 text-text-secondary',
  dark: 'bg-gray-800 text-white',
}

export default function Badge({
  children,
  variant = 'primary',
  className = '',
}) {
  return (
    <span
      className={`
        inline-flex items-center text-xs font-medium
        px-2 py-0.5 rounded-full
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}
