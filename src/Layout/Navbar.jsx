import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Waveform from '../components/Waveform'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shows', label: 'Our Shows' },
  { to: '/for-brands', label: 'For Brands' },
  { to: '/for-creators', label: 'For Creators' },
  { to: '/be-a-guest', label: 'Be a Guest' },
  { to: '/studio-rentals', label: 'Studio Rentals' },
  //{ to: '/insider', label: 'The Abundance Network Insider' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2.5 focus-ring rounded-sm" onClick={() => setOpen(false)}>
            <div className="flex items-center gap-2">
              <img src="/TAN LOGO.png" alt="" className="h-6 w-auto" />
              <span className="font-display font-semibold tracking-tight text-lg leading-none">
                The Abundance 
                <br></br>
                   Network
              </span>
            </div>
          </NavLink>

          <nav className="hidden lg:flex items-center gap-1">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  [
                    'px-3 py-2 text-sm font-medium rounded-sm transition-colors focus-ring',
                    isActive ? 'text-signal' : 'text-ink/70 hover:text-ink',
                  ].join(' ')
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <NavLink
              to="/for-brands"
              className="inline-flex items-center rounded-full bg-ink text-paper text-sm font-medium px-4 py-2 hover:bg-signal transition-colors focus-ring"
            >
              Partner with us
            </NavLink>
          </div>

          <button
            className="lg:hidden p-2 -mr-2 focus-ring rounded-sm"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-line bg-paper px-5 py-3 flex flex-col animate-slide-down">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                [
                  'py-3 text-base font-medium border-b border-line/70 last:border-0 focus-ring',
                  isActive ? 'text-signal' : 'text-ink/80',
                ].join(' ')
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
