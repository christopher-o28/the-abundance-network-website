import { useEffect, useRef, useState } from 'react'
import { useSheet } from '../lib/useSheet'

export default function LogoCarousel() {
  const { rows, loading, error } = useSheet('Partners')
  const logos = rows || []

  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const animRef = useRef(null)
  const offsetRef = useRef(0)
  const [isPaused, setIsPaused] = useState(false)

  // Calculate copies to ensure smooth infinite loop
  const copies = logos.length > 0 ? Math.max(6, Math.ceil(30 / logos.length)) : 0
  const loopLogos = copies > 0 ? Array.from({ length: copies }).flatMap(() => logos) : []

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track || logos.length === 0) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    let lastTime = performance.now()

    const step = (now) => {
      const delta = now - lastTime
      lastTime = now

      const cards = track.children
      if (!cards.length) return
      const totalWidth = track.scrollWidth / copies

      if (!isPaused) {
        // Continuous smooth scroll speed (~36px per second)
        offsetRef.current += (delta / 1000) * 36
        if (offsetRef.current >= totalWidth) {
          offsetRef.current -= totalWidth
        }
      }

      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`

      // 3D Arc Perspective calculation relative to viewport center
      const containerRect = container.getBoundingClientRect()
      const containerCenterX = containerRect.left + containerRect.width / 2
      const maxDistance = containerRect.width / 2

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i]
        const cardRect = card.getBoundingClientRect()
        const cardCenterX = cardRect.left + cardRect.width / 2

        // Normalized distance from center (-1.2 to +1.2)
        const normX = Math.max(-1.5, Math.min(1.5, (cardCenterX - containerCenterX) / maxDistance))
        const absNormX = Math.abs(normX)

        // 3D Arc Perspective: Center is largest (scale ~ 1.20), sides taper down to smaller (scale ~ 0.75)
        const centerFactor = Math.max(0, 1 - Math.min(1, Math.pow(absNormX, 1.2)))
        const scale = 0.75 + centerFactor * 0.45
        const rotateY = -normX * 14
        const translateZ = -40 + centerFactor * 60
        const rotateX = (1 - Math.min(1, absNormX)) * 1.5
        const opacity = Math.max(0.6, 0.6 + centerFactor * 0.4)

        card.style.zIndex = Math.round(centerFactor * 20)

        const innerCard = card.firstElementChild
        if (innerCard) {
          innerCard.style.transform = `perspective(1000px) rotateY(${rotateY.toFixed(2)}deg) rotateX(${rotateX.toFixed(2)}deg) translateZ(${translateZ.toFixed(2)}px) scale(${scale.toFixed(3)})`
          innerCard.style.opacity = opacity.toFixed(2)
        }
      }

      animRef.current = requestAnimationFrame(step)
    }

    animRef.current = requestAnimationFrame(step)

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [isPaused, copies, logos.length])

  if (loading || error || logos.length === 0) return null

  return (
    <section
      ref={containerRef}
      className="relative bg-paper overflow-hidden py-10 sm:py-14 lg:py-16 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Soft edge gradient fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 lg:w-44 bg-gradient-to-r from-paper via-paper/80 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 lg:w-44 bg-gradient-to-l from-paper via-paper/80 to-transparent z-20" />

      {/* 3D Stage Container */}
      <div className="w-full overflow-hidden py-4 sm:py-6" style={{ perspective: '1000px' }}>
        <div
          ref={trackRef}
          className="flex items-center gap-4 sm:gap-5 w-max"
          style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        >
          {loopLogos.map((partner, i) => {
            const logoSrc = partner.logo || partner.Logo || partner.image || partner.Image
            const partnerName = partner.name || partner.Name || partner.title || partner.Title || `Partner ${i + 1}`
            const partnerUrl = partner.url || partner.Url || partner.link || partner.Link || ''
            const hasUrl = Boolean(partnerUrl && partnerUrl !== '#')

            const cardContent = (
              <div
                className={`
                  group relative
                  w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 aspect-square
                  rounded-2xl sm:rounded-[22px]
                  bg-white border border-line/60
                  shadow-sm hover:shadow-xl
                  flex items-center justify-center
                  overflow-hidden shrink-0
                  transition-all duration-300 ease-out
                  will-change-transform
                  hover:scale-125 hover:z-30
                  ${hasUrl ? 'cursor-pointer' : ''}
                `}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img
                  src={logoSrc}
                  alt={partnerName}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback text view if image fails to load
                    e.target.style.display = 'none'
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = 'flex'
                    }
                  }}
                />
                <div className="hidden absolute inset-0 bg-white p-3 items-center justify-center text-center">
                  <span className="font-display font-medium text-xs sm:text-sm text-ink truncate">
                    {partnerName}
                  </span>
                </div>

                {/* Hover overlay hint for clickable logos */}
                {hasUrl && (
                  <div className="pointer-events-none absolute inset-0 bg-ink/0 group-hover:bg-ink/5 transition-colors duration-300" />
                )}
              </div>
            )

            return (
              <div key={`${partnerName}-${i}`} className="relative shrink-0 hover:z-30">
                {hasUrl ? (
                  <a
                    href={partnerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block outline-none focus-visible:ring-2 focus-visible:ring-signal rounded-2xl sm:rounded-[22px]"
                    aria-label={`Visit ${partnerName}`}
                  >
                    {cardContent}
                  </a>
                ) : (
                  cardContent
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
