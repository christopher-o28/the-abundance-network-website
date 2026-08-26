const VARIANTS = {
  primary: 'bg-ink text-paper hover:bg-signal',
  outline: 'border border-ink text-ink hover:bg-ink hover:text-paper',
  outlineLight: 'border border-paper/40 text-paper hover:bg-paper hover:text-ink',
  light: 'bg-paper text-ink hover:bg-signal hover:text-paper',
}

export default function Button({ as: As = 'button', variant = 'primary', className = '', children, ...props }) {
  return (
    <As
      className={[
        'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors focus-ring disabled:opacity-50 disabled:pointer-events-none',
        VARIANTS[variant],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </As>
  )
}
