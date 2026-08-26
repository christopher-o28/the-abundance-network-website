import { Link } from 'react-router-dom'
import SectionLabel from '../components/SectionLabel'
import Button from '../components/Button'
import Reveal from '../components/Reveal'

const REASONS = [
  { title: 'Why Podcasting? Why Now?', desc: "The Philippine audio landscape is undergoing a massive transformation. By joining us, you tap into a rapidly growing market: 17 Million Weekly Listeners: As of 2025, millions of Filipinos are tuning in, led by highly engaged millennials and Gen Z (ages 23–34).Explosive Market Growth: The Philippine podcasting market is projected to reach USD 1.07 Billion by 2034, growing at a rate of over 26% annually.Global Reach: Your voice reaches the Filipino diaspora and OFWs worldwide, breaking through geographical barriers that traditional media cannot" },
  { title: 'The TAN Advantage: Heritage Meets Innovation', desc: "When you join The Abundance Network, you aren\'t just starting a show; you are building on a foundation of excellence. Decades of Experience: We are backed by the Shepherd\'s Voice Radio and Television Foundation Inc. (SVRTV), leveraging decades of professional broadcast media success. Broadcast-Quality Facilities: Gain access to our complete professional studio facilities, featuring high-end recording equipment, audio interfaces, and sound mixing capabilities. Expert Production Team: Our team of experienced media professionals handles everything from audio engineering and post-production to distribution and hosting."},
  { title: 'What You Get as a Network Partner', desc: "We remove the technical friction so you can focus on your message. Our comprehensive production package includes: End-to-End Production: Weekly recording sessions, professional editing, mastering, and quality assurance.Global Distribution: We manage your presence on Spotify, Apple Podcasts, YouTube, and more. Marketing Support: Social media content creation, including branded audiograms and episode graphics to help you grow your audience. Analytics & Insights: Monthly reports on downloads, listener demographics, and geographic reach to help you refine your strategy." },
  { title: '', desc: '' },
  { title: '', desc: "" },
]

export default function ForCreators() {
  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20">
      <SectionLabel>Join Our Network</SectionLabel>
      <h1 className="font-display text-4xl sm:text-5xl font-semibold max-w-2xl leading-tight">
        Join the Movement: Partner with The Abundance Network
      </h1>
      <p className="mt-5 max-w-2xl text-ink/70 leading-relaxed">
        Empowering Communities Through Values-Driven VoicesThe Abundance Network (TAN) is more 
        than just a media platform; it is a mission-driven 
        ecosystem dedicated to becoming the premier Filipino podcast network. We bridge the gap 
        between traditional media heritage and the digital-first future, delivering high-quality 
        content across faith, personal development, finance, and entrepreneurship.

      </p>
      <Button as={Link} to="/be-a-guest" className="mt-8">Get in touch</Button>

      <div className="mt-16 grid gap-10 sm:grid-cols-2">
        {REASONS.map((r, i) => (
          <Reveal key={r.title} delay={(i % 4) * 60} className="border-t border-line pt-5">
            <h3 className="font-display text-lg font-semibold">{r.title}</h3>
            <p className="mt-2 text-sm text-ink/60 leading-relaxed">{r.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
