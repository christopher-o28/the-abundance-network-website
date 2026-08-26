import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Re-mounts its children (via the `key`) on every route change, which
 * restarts the `animate-page-in` CSS animation — a clean fade + rise with
 * no manual timing logic to get wrong. Also smooth-scrolls to top so the
 * transition doesn't feel disconnected from where the visitor lands.
 */
export default function PageTransition({ children }) {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div key={location.pathname} className="animate-page-in">
      {children}
    </div>
  )
}
