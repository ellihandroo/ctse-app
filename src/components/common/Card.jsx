export default function Card({
  children,
  className = '',
  hover = false,
  onClick,
  padding = 'p-4',
}) {
  return (
    <div
      className={`
        bg-surface border border-border rounded-xl ${padding}
        ${hover ? 'hover:border-primary/30 hover:shadow-md cursor-pointer transition-all duration-200' : ''}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick(e) : undefined}
    >
      {children}
    </div>
  )
}
