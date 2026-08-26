import { useEffect, useRef } from 'react'
import SectionLabel from '../components/SectionLabel'
import Reveal from '../components/Reveal'

const WAYS = [
  { title: 'Ad Insertions', desc: 'Pre-recorded, non-host-voiced spots placed before, during, or after episodes — built for scale and fast turnaround, and multi-show campaigns. Non-host voiced and dynamically inserted. ' },
  { title: 'Host-Read Ads', desc: "Delivered in the creator's own voice, woven naturally into the episode flow — conversational, personal, and trusted." },
  { title: 'Branded Segments', desc: "Custom recurring segments designed around your brand's messaging and values in mind." },
  { title: 'Episode Sponsorships', desc: 'Exclusive visibility across a specific episode or themed run of content.' },
  { title: 'Product Seeding', desc: 'Creators use and talk about your product in real, lived-in context — not just endorsements, but lived experiences.' },
  { title: 'Event & Livestream Integration', desc: "Extend your brand into live shows, video podcasts, and community events." },
]

const TALLY_FORM_ID = 'lbjrqp'

function TallyEmbed({ formId }) {
  const iframeRef = useRef(null)

  useEffect(() => {
    // Load Tally's embed script once
    if (!document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://tally.so/widgets/embed.js'
      script.async = true
      document.body.appendChild(script)
      script.onload = () => {
        if (window.Tally) window.Tally.loadEmbeds()
      }
    } else if (window.Tally) {
      window.Tally.loadEmbeds()
    }
  }, [])

  return (
    <iframe
      ref={iframeRef}
      data-tally-src={`https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
      loading="lazy"
      width="100%"
      height="500"
      frameBorder="0"
      marginHeight="0"
      marginWidth="0"
      title="Get started"
      className="rounded-xl"
    />
  )
}

export default function ForBrands() {
  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionLabel>Partner with us</SectionLabel>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-tight">
           For Brands and Partners
          </h1>
          <p className="mt-5 text-ink/70 leading-relaxed">
              Podcasts have become the modern hub for learning and connection. Your brand can be right there with them, utilizing a medium that puts your message directly into the ears of your audience, fostering a trusted, mentor-like relationship with every listener.
          </p>

          <h2 className="mt-10 font-display text-xl font-semibold">Partner with us via:</h2>
          <div className="mt-5 space-y-5">
            {WAYS.map((w) => (
              <div key={w.title} className="pl-4 border-l-2 border-line">
                <p className="font-medium">{w.title}</p>
                <p className="mt-1 text-sm text-ink/60 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="rounded-2xl border border-line bg-paperdim p-6 sm:p-8 h-fit lg:sticky lg:top-24">
          <h2 className="font-display text-2xl font-semibold">Get started</h2>
          <p className="mt-2 text-sm text-ink/60">
            Tell us about your brand and we'll follow up with a plan.
          </p>
          <div className="mt-6">
            <TallyEmbed formId={TALLY_FORM_ID} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}