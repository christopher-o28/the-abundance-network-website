import { useEffect, useRef, useState } from 'react'

/**
 * Wrap any section in <Reveal> to have it ease in the first time it
 * scrolls into view. Respects prefers-reduced-motion via the global CSS
 * override in index.css (that rule collapses the transition duration).
 */
export default function Reveal({ children, className = '', delay = 0, as: As = 'div', ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <As
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      className={[
        'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </As>
  )
}
