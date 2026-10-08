import { NavLink } from 'react-router-dom'
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'
import Waveform from '../components/Waveform'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-paper/80">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <img src="/TAN LOGO.png" alt="" className="h-6 w-auto" />
              <span className="font-display font-semibold text-lg text-paper">The Abundance Network</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/60">
            Full-service production, studios, and audience-first advertising for the
            Philippines' most-listened-to Filipino podcasts.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { Icon: Facebook, href: 'https://www.facebook.com/theabundancenetwork', label: 'Facebook' },
              { Icon: Youtube, href: 'https://www.youtube.com/@TheAbundanceNetworkPH', label: 'Youtube' },
             
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-paper/20 flex items-center justify-center hover:border-signal hover:text-signal transition-colors focus-ring"
                aria-label={label}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-paper/40 mb-4">Explore</p>
          <ul className="space-y-2.5 text-sm">
            <li><NavLink to="/shows" className="hover:text-signal transition-colors">Our Shows</NavLink></li>
            <li><NavLink to="/for-brands" className="hover:text-signal transition-colors">For Brands</NavLink></li>
            <li><NavLink to="/for-creators" className="hover:text-signal transition-colors">For Creators</NavLink></li>
            <li><NavLink to="/studio-rentals" className="hover:text-signal transition-colors">Studio Rentals</NavLink></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-paper/40 mb-4">Company</p>
          <ul className="space-y-2.5 text-sm">
            <li><NavLink to="/be-a-guest" className="hover:text-signal transition-colors">Be a Guest</NavLink></li>
            {/*<li><NavLink to="/insider" className="hover:text-signal transition-colors">TAN Insider</NavLink></li>*/}
            <li><a href="mailto:hello@theabundancenetwork.ph" className="hover:text-signal transition-colors">hello@theabundancenetwork.ph</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-paper/40">
          <p>© {new Date().getFullYear()} The Abundance Network. All rights reserved.</p>
          <p className="font-mono">Quezon City, Philippines</p>
        </div>
      </div>
    </footer>
  )
}
