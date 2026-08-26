import { useEffect } from 'react'
import SectionLabel from '../components/SectionLabel'
import Reveal from '../components/Reveal'

// Replace with your actual Tally form ID (e.g. 'NpxWpl')
const BE_A_GUEST_FORM_ID = 'wdjq5o'

// Loads Tally's embed script once so the inline iframe below can render/resize itself
function useTallyEmbedScript() {
  useEffect(() => {
    if (!document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://tally.so/widgets/embed.js'
      script.async = true
      document.body.appendChild(script)
    } else if (window.Tally) {
      // Script already loaded elsewhere on the site — just re-run embed init
      window.Tally.loadEmbeds()
    }
  }, [])
}

export default function BeAGuest() {
  useTallyEmbedScript()

  return (
    <section className="mx-auto max-w-3xl px-5 sm:px-8 py-16 sm:py-20">
      <SectionLabel>Be a guest</SectionLabel>
      <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-tight">
        Join the Movement: Partner with The Abundance Network
      </h1>
      <p className="mt-5 text-ink/70 leading-relaxed">
          Ready to Start Your Journey?
          <br />
          Step 1: The Presentation. Let’s walk you through how TAN can amplify your voice.
          <br />
          Step 2: Studio Tour. Visit our SVRTV facilities to see where your stories will come to life.
          <br />
          Step 3: Kick-off. Align on expectations and launch your season.
          <br />
          <br />
          Contact Us To Join the Network
      </p>

      <Reveal className="mt-10 rounded-2xl border border-line bg-paperdim p-6 sm:p-8">
        <iframe
          data-tally-src={`https://tally.so/embed/${BE_A_GUEST_FORM_ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
          loading="lazy"
          width="100%"
          height="500"
          frameBorder="0"
          title="Be a Guest — Application Form"
        />
      </Reveal>
    </section>
  )
}
