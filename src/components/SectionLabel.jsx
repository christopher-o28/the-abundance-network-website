export default function SectionLabel({ children, dark = false }) {
  return (
    <p
      className={[
        'font-mono text-xs uppercase tracking-[0.2em] mb-3',
        dark ? 'text-paper/50' : 'text-ink/45',
      ].join(' ')}
    >
      {children}
    </p>
  )
}
