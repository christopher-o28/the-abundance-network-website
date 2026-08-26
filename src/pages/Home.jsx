import { Link } from 'react-router-dom'
import Button from '../components/Button'
import SectionLabel from '../components/SectionLabel'
import LogoCarousel from '../components/LogoCarousel'
import ShowCard from '../components/ShowCard'
import Reveal from '../components/Reveal'
import { LoadingState, ErrorState, EmptyState } from '../components/DataState'
import { useSheet } from '../lib/useSheet'

export default function Home() {
  const { rows: shows, loading, error } = useSheet('Shows')
  const featured = shows.slice(0, 6)

  return (
    <>
      {/* HERO — no photography. The waveform is the whole idea: this is an audio company. */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-10 sm:pt-24 sm:pb-16">
          <SectionLabel>Powered by · Shepherd's Voice Radio and Television Foundation Inc.</SectionLabel>
          <h1 className="font-display font-semibold tracking-tight text-[13vw] sm:text-7xl lg:text-8xl leading-[0.95] max-w-4xl">
            The Abundance
            <br />
            <span className="text-signal">Network</span>
          </h1>
          <p className="mt-6 max-w-xl text-base sm:text-lg text-ink/60 leading-relaxed">
            The Abundance Network is a new podcast network operating under the stewardship of Shepherd's Voice Radio and Television Foundation Inc., leveraging decades of broadcast media experience while embracing the dynamic world of podcasting.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button as={Link} to="/shows">Explore Our Podcasts</Button>
            <Button as={Link} to="/be-a-guest" variant="outline">Join The Network</Button>
          </div>
        </div>

        {/* the waveform runs the full width like a live audio meter under the hero */}
        <div className="flex items-end gap-[3px] h-16 sm:h-24 px-5 sm:px-8 pb-2 overflow-hidden">
          {Array.from({ length: 250 }).map((_, i) => (
            <span
              key={i}
              className={[
                'flex-1 min-w-[2px] rounded-full origin-bottom bg-ink/90',
                i % 5 === 0 ? 'bg-signal' : '',
                ['animate-wave1', 'animate-wave2', 'animate-wave3', 'animate-wave4', 'animate-wave5'][i % 5],
              ].join(' ')}
              style={{ height: `${20 + ((i * 37) % 80)}%` }}
            />
          ))}
        </div>
      </section>

      <Reveal>
        <LogoCarousel />
      </Reveal>

      {/* ABOUT */}
      <Reveal as="section" className="mx-auto max-w-7xl px-5 sm:px-8 py-20 grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionLabel>Why the network exists</SectionLabel>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight">
            Empowering Communities Through Values-Driven Content
          </h2>
        </div>
        <div className="lg:col-span-3 space-y-5 text-ink/70 leading-relaxed">
          <p>
           To become the premier Filipino podcast network that delivers high-quality, values-driven content across diverse topics, including faith, personal development, finance, and entrepreneurship.
          </p>
        </div>
      </Reveal>

      <Reveal as="section" className="mx-auto max-w-7xl px-5 sm:px-8 py-20 grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionLabel>First core value</SectionLabel>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight">
             To Empower and Serve Communities
          </h2>
        </div>
        <div className="lg:col-span-3 space-y-5 text-ink/70 leading-relaxed">
          <p>
            The network is committed to creating content that uplifts and serves Filipino communities globally, ensuring that impactful education and mentorship are accessible to everyone, including OFWs and the Filipino diaspora.
          </p>
        </div>
      </Reveal>

      <Reveal as="section" className="mx-auto max-w-7xl px-5 sm:px-8 py-20 grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionLabel>Second core value</SectionLabel>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight">
             To Bridge Tradition and Innovation
          </h2>
        </div>
        <div className="lg:col-span-3 space-y-5 text-ink/70 leading-relaxed">
          <p>
           SVRTV’s decades of broadcast media experience and professional-grade facilities in traditional radio and TV transition into the dynamic, rapidly growing world of podcasting.
          </p>
        </div>
      </Reveal>

      <Reveal as="section" className="mx-auto max-w-7xl px-5 sm:px-8 py-20 grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionLabel>Third core value</SectionLabel>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight">
             To Amplify Impactful Voices
          </h2>
        </div>
        <div className="lg:col-span-3 space-y-5 text-ink/70 leading-relaxed">
          <p>
           To amplify the reach of experts and mentors, making their wisdom available 24/7 through a digital medium that fits the busy lifestyles of modern listeners. 
          </p>
        </div>
      </Reveal>

      <Reveal as="section" className="mx-auto max-w-7xl px-5 sm:px-8 py-20 grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionLabel>Fourth core value</SectionLabel>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight">
             To Build a Legacy and Movement
          </h2>
        </div>
        <div className="lg:col-span-3 space-y-5 text-ink/70 leading-relaxed">
          <p>
           As a a mission-driven media platform, it aims to build a thriving community and leave a lasting legacy of values-based content that contributes to a better, more prosperous future.
          </p>
        </div>
      </Reveal>

      {/* FEATURED SHOWS — pulled live from the Google Sheet */}
      <section className="bg-paperdim border-y border-line">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
          <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <SectionLabel>Currently in rotation</SectionLabel>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold">Featured shows</h2>
            </div>
            <Link to="/shows" className="text-sm font-medium hover:text-signal transition-colors">
              View all shows →
            </Link>
          </Reveal>

          {loading && <LoadingState label="Tuning in" />}
          {error && <ErrorState message={error} />}
          {!loading && !error && featured.length === 0 && <EmptyState />}
          {!loading && !error && featured.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((show, i) => (
                <Reveal key={show.id || i} delay={i * 60}>
                  <ShowCard show={show} index={i} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA BANNER */}
      <Reveal as="section" className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight">
              Whether you're a creator or a brand, there's a seat at the table.
            </h2>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <Button as={Link} to="/for-brands" variant="light">I'm a brand</Button>
            <Button as={Link} to="/for-creators" variant="outlineLight">
              I'm a creator
            </Button>
          </div>
        </div>
      </Reveal>
    </>
  )
}