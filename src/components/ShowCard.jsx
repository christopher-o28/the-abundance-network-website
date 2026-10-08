import { useState } from 'react'
import { Facebook, Instagram, Youtube, Podcast, Volume2 } from 'lucide-react'
import Waveform from './Waveform'
import { playPodcastSound, stopPodcastSound } from '../lib/podcastAudio'

const PALETTE = ['bg-signal', 'bg-tape', 'bg-gold', 'bg-ink']

function SpotifyIcon({ size = 14, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.495 17.297c-.215.353-.674.464-1.026.248-2.812-1.718-6.353-2.106-10.523-1.154-.403.092-.806-.157-.898-.56-.092-.403.157-.806.56-.898 4.566-1.043 8.487-.601 11.64 1.338.352.215.464.674.247 1.026zm1.467-3.264c-.27.441-.849.58-1.29.31-3.218-1.978-8.125-2.55-11.93-1.394-.497.151-1.025-.133-1.176-.63-.151-.497.133-1.025.63-1.176 4.354-1.321 9.775-.681 13.456 1.58.441.27.58.849.31 1.29zm.126-3.41c-3.859-2.292-10.228-2.503-13.899-1.388-.592.18-1.223-.154-1.403-.746-.18-.592.154-1.223.746-1.403 4.223-1.282 11.258-1.036 15.698 1.599.532.316.705 1.006.39 1.538-.316.533-1.006.706-1.532.39z" />
    </svg>
  )
}

export default function ShowCard({ show, index = 0 }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const accent = show.coverColor || PALETTE[index % PALETTE.length]

  const spotifyUrl =
    show.spotifyUrl ||
    show.spotify ||
    show.spotify_url ||
    (show.audioEmbedUrl && !show.audioEmbedUrl.includes('youtube') ? show.audioEmbedUrl : null)

  const youtubeUrl =
    show.youtubeUrl ||
    show.youtube ||
    show.youtube_url ||
    (show.audioEmbedUrl && show.audioEmbedUrl.includes('youtube') ? show.audioEmbedUrl : null)

  const facebookUrl =
    show.facebookUrl ||
    show.facebook ||
    show.facebook_url ||
    show.fbUrl ||
    show.fb

  const instagramUrl =
    show.instagramUrl ||
    show.instagram ||
    show.instagram_url ||
    show.igUrl ||
    show.ig

  const appleUrl =
    show.appleUrl ||
    show.applePodcastsUrl ||
    show.apple ||
    show.apple_podcasts

  const socialLinks = [
    { name: 'Spotify', Icon: SpotifyIcon, url: spotifyUrl },
    { name: 'YouTube', Icon: Youtube, url: youtubeUrl },
    { name: 'Facebook', Icon: Facebook, url: facebookUrl },
    { name: 'Instagram', Icon: Instagram, url: instagramUrl },
    { name: 'Apple Podcasts', Icon: Podcast, url: appleUrl },
  ].filter((item) => Boolean(item.url && String(item.url).trim()))

  const handleMouseEnter = () => {
    setIsPlayingAudio(true)
    playPodcastSound(
      show.introAudioUrl ||
      show.previewAudioUrl ||
      show.musicUrl ||
      show.audioUrl ||
      show.audioFile
    )
  }

  const handleMouseLeave = () => {
    setIsPlayingAudio(false)
    stopPodcastSound()
  }

  return (
    <article className="group flex flex-col h-full rounded-2xl border border-line bg-paper overflow-hidden transition-all duration-300 ease-out hover:border-ink hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/5">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative h-40 shrink-0 overflow-hidden cursor-pointer ${accent.startsWith('#') ? '' : accent} flex items-end p-5`}
        style={accent.startsWith('#') ? { backgroundColor: accent } : undefined}
      >
        {show.coverImageUrl ? (
          <img
            src={show.coverImageUrl}
            alt={show.title || 'Podcast cover'}
            className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 flex items-center justify-between w-full">
          <span className="font-mono text-[11px] uppercase tracking-widest text-paper/90 drop-shadow-sm">
            {show.category || ''}
          </span>
          <div className="flex items-center gap-1.5 bg-ink/40 backdrop-blur-sm px-2 py-1 rounded-full">
            {isPlayingAudio && <Volume2 size={12} className="text-paper animate-pulse" />}
            <Waveform
              bars={6}
              live={isPlayingAudio}
              color="bg-paper"
              className="h-4 opacity-90"
            />
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-lg leading-snug line-clamp-2">{show.title}</h3>
        {show.host && <p className="mt-1 text-sm text-ink/50 line-clamp-1">Hosted by {show.host}</p>}
        {show.description && (
          <p className="mt-3 text-sm text-ink/70 leading-relaxed">{show.description}</p>
        )}

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-line/70 gap-3">
          <div className="flex items-center gap-2">
            {socialLinks.map(({ name, Icon, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-ink/70 hover:text-signal hover:border-signal hover:bg-signal/5 transition-all focus-ring"
                aria-label={`${name} - ${show.title}`}
                title={name}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>

          {(show.streams || show.episodeDate) && (
            <span className="text-xs font-mono text-ink/40 shrink-0">
              {show.streams ? `${show.streams} streams` : show.episodeDate}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}