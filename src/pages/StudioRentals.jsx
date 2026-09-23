import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { X, Maximize2 } from 'lucide-react'
import SectionLabel from '../components/SectionLabel'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import { LoadingState } from '../components/DataState'
import { useStudioRentals } from '../hooks/useStudioRentals'

const DEFAULT_ADDITIONAL_EQUIPMENT = `Cameras (Sony ZV-E10, Panasonic GH5s)
Microphones, stands, lapel mics, Zoom recorder
LED panels, Pavotubes, Forza lights
Custom sets and props
Internet access for live streaming`

const DEFAULT_SPACES = [
  {
    id: '1',
    name: '1. The Main Studio',
    tagline: 'Best for: Roundtable discussions, panel shows, and multi-camera video podcasts.',
    desc: 'A flexible signature event space for live tapings, meetups, workshops, and branded experiences. Seats up to 40.',
    rate: `Audio + Video: 5,000 per hour (inclusion: 3 camera, 4 podcast mics, studio lights optional use of 55" TV)
Audio only: 30% off (inclusion: 4 podcast mics)
6 hours use | Audio + video: 24,000 (inclusions: 3 cam, 4 podcast mics, studio lights)
Studio use only: 50% off (inclusions: Room use; IBM tables and chairs available upon request)
*prices exclusive of 12% VAT`,
    capacity: 'Professional setup for 4 to 5 people.',
    additionalEquipment: DEFAULT_ADDITIONAL_EQUIPMENT,
    audioSetup: '4 mics + headphones',
    videoSetup: '1 mirrorless cam + 4 mic audio',
    extendedHours: '+30%',
    image: '/images/studios/main-studio.png',
    category: 'Roundtable / Panel',
  },
  {
    id: '2',
    name: '2. The One-Person Studio',
    tagline: 'Best for: Solo hosts, remote interviews, and digital courses.',
    desc: "TPN's flagship space, powered by Spotify. Designed for large-format productions, fully equipped for professional audio and video.",
    rate: `3,500 per hour (inclusions: 1 studio light, 1 camera, 1 lavalier mic)
* 500 per tech staff (optional)
* price exclusive of 12% VAT`,
    capacity: 'Optimized for 1 person.',
    additionalEquipment: DEFAULT_ADDITIONAL_EQUIPMENT,
    audioSetup: '2 mics + headphones',
    videoSetup: '1 mirrorless cam + 2 mic audio',
    extendedHours: '+30%',
    image: '/images/studios/solo-studio.png',
    category: 'Solo / Remote',
  },
  {
    id: '3',
    name: '3. The Recording Booth',
    tagline: 'Best for: Voiceovers, narrations, and crystal-clear vocal isolation.',
    desc: 'Ideal for interviews, small panels, and two-host formats. Fully equipped for audio and video.',
    rate: `3,500 per hour (inclusions: 2 recording microphones)
* 500 per tech staff (optional)
* price exclusive of 12% VAT`,
    capacity: '1 person (Standing or Sitting).',
    additionalEquipment: DEFAULT_ADDITIONAL_EQUIPMENT,
    audioSetup: '2 mics + headphones',
    videoSetup: '1 mirrorless cam + 2 mic audio',
    extendedHours: '+30%',
    image: '/images/studios/vocal-booth.png',
    category: 'Voiceover / Audio',
  },
]

const TALLY_BOOKING_FORM_ID = 'NpxWpl'

// Loads Tally's embed script once and exposes helpers to open/close the popup
function useTallyPopup() {
  useEffect(() => {
    if (!document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://tally.so/widgets/embed.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  const openTallyPopup = (formId, hiddenFields = {}) => {
    if (window.Tally) {
      window.Tally.openPopup(formId, { hiddenFields, emoji: { text: '🎙️', animation: 'wave' } })
    } else {
      // Script hasn't loaded yet — retry shortly
      setTimeout(() => {
        if (window.Tally) window.Tally.openPopup(formId, { hiddenFields })
      }, 500)
    }
  }

  const closeTallyPopup = (formId) => {
    if (window.Tally) {
      window.Tally.closePopup(formId)
    }
  }

  return { openTallyPopup, closeTallyPopup }
}

export default function StudioRentals() {
  const { spaces: sheetSpaces, loading } = useStudioRentals()
  const [selectedImage, setSelectedImage] = useState(null)
  const { openTallyPopup, closeTallyPopup } = useTallyPopup()
  const location = useLocation()

  const handleBookStudio = (studioName) => {
    openTallyPopup(TALLY_BOOKING_FORM_ID, { studio: studioName })
  }

  // Close the popup whenever the route/page changes (nav to another tab/section)
  useEffect(() => {
    closeTallyPopup(TALLY_BOOKING_FORM_ID)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  // Close the popup if the user switches browser tabs or minimizes the window
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        closeTallyPopup(TALLY_BOOKING_FORM_ID)
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Close on unmount too, just in case
  useEffect(() => {
    return () => closeTallyPopup(TALLY_BOOKING_FORM_ID)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Determine active display spaces: use sheet data if rows exist, otherwise use fallback defaults
  const activeSpaces = sheetSpaces && sheetSpaces.length > 0 ? sheetSpaces : DEFAULT_SPACES

  // Build compare table dynamically from the SAME data driving the cards above,
  // so the two sections can never show different values.
  const compareColumns = activeSpaces

  const COMPARE_ROWS = [
    { label: 'Capacity', key: 'capacity' },
    { label: 'Audio setup', key: 'audioSetup' },
    { label: 'Video setup', key: 'videoSetup' },
    { label: 'Hourly rate', key: 'rate' },
    { label: 'Extended hours (8PM–12MN)', key: 'extendedHours' },
  ]

  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20">
      <SectionLabel>Studio rentals</SectionLabel>
      <h1 className="font-display text-4xl sm:text-5xl font-semibold max-w-2xl leading-tight">
        TAN Studios: Professional Audio Spaces for Every Creator
      </h1>
      <p className="mt-5 max-w-2xl text-ink/70 leading-relaxed">
        Broadcast Quality. Decades of Heritage. Your Voice, Amplified.
        Located within the Shepherd’s Voice Radio and Television Foundation (SVRTV),
        TAN Studios offers creators and brands access to the same professional-grade
        facilities used by industry veterans for decades. Whether you are recording a
        multi-guest roundtable, a solo masterclass, or a high-fidelity voiceover,
        we provide the environment and expertise to make your audio shine.
      </p>

      {/* Main Studio Cards Section (Fetched from Google Sheet) */}
      <div className="mt-12">
        {loading ? (
          <LoadingState label="Loading studio spaces from sheet" />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeSpaces.map((s, i) => {
              const spaceImage = s.image || DEFAULT_SPACES[i % DEFAULT_SPACES.length]?.image
              return (
                <Reveal key={s.name} delay={(i % 4) * 60} className="h-full rounded-2xl border border-line bg-paper overflow-hidden flex flex-col transition-all duration-300 hover:border-ink hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/5">
                  {spaceImage && (
                    <div
                      onClick={() => setSelectedImage({ ...s, image: spaceImage })}
                      className="group relative h-52 w-full flex-shrink-0 overflow-hidden bg-ink/5 border-b border-line cursor-pointer"
                    >
                      <img
                        src={spaceImage}
                        alt={s.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
                      <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-ink/80 text-paper backdrop-blur-sm">
                        {s.capacity || 'Studio Space'}
                      </span>
                      <div className="absolute top-3 right-3 p-1.5 rounded-full bg-ink/70 text-paper opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 size={14} />
                      </div>
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1 text-left items-start w-full">
                    <h3 className="font-display text-xl font-semibold text-left">{s.name}</h3>
                    {s.tagline && <p className="mt-1 text-sm font-medium text-signal text-left whitespace-pre-line">{s.tagline}</p>}
                    {s.desc && <p className="mt-3 text-sm text-ink/60 leading-relaxed text-left whitespace-pre-line flex-1">{s.desc}</p>}
                    <div className="mt-4 pt-4 border-t border-line/70 space-y-2 text-sm text-left w-full mb-6">
                      {s.rate && (
                        <div>
                          <span className="text-ink font-bold text-base block mb-1">Rate:</span>
                          <div className="text-ink text-left whitespace-pre-line leading-relaxed">{s.rate}</div>
                        </div>
                      )}
                      {s.capacity && (
                        <div>
                          <span className="text-ink font-bold text-base block mb-1">Capacity:</span>
                          <div className="text-ink text-left whitespace-pre-line leading-relaxed">{s.capacity}</div>
                        </div>
                      )}
                      {s.additionalEquipment && (
                        <div className="pt-2">
                          <p className="font-bold text-ink text-base mb-2">
                            Additional equipment for rent:
                          </p>
                          <ul className="space-y-1.5 text-sm text-ink/70 list-disc list-inside text-left leading-relaxed">
                            {s.additionalEquipment
                              .split('\n')
                              .map((line) => line.trim())
                              .filter(Boolean)
                              .map((item, idx) => (
                                <li key={idx}>
                                  {item.replace(/^[\s•\*\-]+/, '')}
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      className="mt-auto pt-6 w-full uppercase tracking-wider font-semibold"
                      onClick={() => handleBookStudio(s.name)}
                    >
                      Book the studio
                    </Button>
                  </div>
                </Reveal>
              )
            })}
          </div>
        )}
      </div>

      {/* Compare table — now sourced from the same activeSpaces data as the cards above */}
      <h2 className="mt-16 font-display text-2xl font-semibold">Compare the spaces</h2>
      <Reveal className="mt-6 overflow-x-auto rounded-xl border border-line">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="bg-paperdim">
              <th className="text-left align-top px-4 py-3 font-medium">Feature</th>
              {compareColumns.map((col) => (
                <th key={col.name} className="text-left align-top px-4 py-3 font-medium whitespace-pre-line">
                  {col.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((row) => (
              <tr key={row.key} className="border-t border-line">
                <td className="px-4 py-3 font-medium text-ink/70 text-left align-top whitespace-pre-line">{row.label}</td>
                {compareColumns.map((col) => (
                  <td key={col.name} className="px-4 py-3 text-ink/60 text-left align-top whitespace-pre-line leading-relaxed">
                    {col[row.key] || '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      {/* CTA Box */}
      <Reveal as="div" className="mt-16 rounded-2xl bg-ink text-paper px-8 py-12 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold">Need more information?</h2>
        <Button
          variant="light"
          className="mt-6"
          onClick={() => handleBookStudio('General Inquiry')}
        >
          Inquire now
        </Button>
      </Reveal>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/80 backdrop-blur-md transition-opacity"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl bg-paper overflow-hidden shadow-2xl border border-line flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-ink/70 text-paper hover:bg-ink transition-colors focus-ring"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            <div className="relative max-h-[60vh] w-full overflow-hidden bg-ink">
              <img
                src={selectedImage.image}
                alt={selectedImage.name}
                className="w-full h-full object-contain max-h-[60vh]"
              />
            </div>
            <div className="p-6 overflow-y-auto text-left">
              <span className="font-mono text-xs uppercase tracking-widest text-tape text-left">
                {selectedImage.capacity || 'Studio Space'}
              </span>
              <h3 className="font-display text-2xl font-semibold mt-1 text-left">{selectedImage.name}</h3>
              {selectedImage.tagline && (
                <p className="mt-1 text-sm font-medium text-signal text-left whitespace-pre-line">{selectedImage.tagline}</p>
              )}
              {selectedImage.desc && (
                <p className="mt-3 text-sm text-ink/70 leading-relaxed text-left whitespace-pre-line">{selectedImage.desc}</p>
              )}
              <div className="mt-4 pt-4 border-t border-line space-y-2 text-sm text-left">
                {selectedImage.rate && (
                  <div>
                    <span className="text-ink/40 font-medium block mb-0.5">Rate:</span>
                    <div className="text-ink text-left whitespace-pre-line leading-relaxed font-sans">{selectedImage.rate}</div>
                  </div>
                )}
                {selectedImage.capacity && (
                  <div>
                    <span className="text-ink/40 font-medium block mb-0.5">Capacity:</span>
                    <div className="text-ink text-left whitespace-pre-line leading-relaxed font-sans">{selectedImage.capacity}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
