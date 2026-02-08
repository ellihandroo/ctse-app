const variants = {
  primary: 'bg-primary hover:bg-primary-hover text-white',
  secondary: 'bg-surface border border-border hover:bg-gray-100 text-text-primary',
  ghost: 'hover:bg-surface text-text-secondary hover:text-text-primary',
  danger: 'bg-error hover:bg-red-600 text-white',
  success: 'bg-success hover:bg-green-600 text-white',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  ...props
}) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        font-medium rounded-lg transition-colors duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
