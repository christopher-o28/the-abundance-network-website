import { Play } from 'lucide-react'
import Waveform from './Waveform'

const PALETTE = ['bg-signal', 'bg-tape', 'bg-gold', 'bg-ink']

export default function ShowCard({ show, index = 0 }) {
  const accent = show.coverColor || PALETTE[index % PALETTE.length]

  return (
    <article className="group flex flex-col h-full rounded-2xl border border-line bg-paper overflow-hidden transition-all duration-300 ease-out hover:border-ink hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/5">
      <div className={`relative h-40 shrink-0 ${accent.startsWith('#') ? '' : accent} flex items-end p-5`} style={accent.startsWith('#') ? { backgroundColor: accent } : undefined}>
        {show.coverImageUrl ? (
          <img src={show.coverImageUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
        ) : null}
        <div className="relative z-10 flex items-center justify-between w-full">
          <span className="font-mono text-[11px] uppercase tracking-widest text-paperblack/80">
            {show.category || ''}
          </span>
          <Waveform bars={6} color="bg-paper" className="h-4 opacity-80 group-hover:opacity-100" />
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-lg leading-snug line-clamp-2">{show.title}</h3>
        {show.host && <p className="mt-1 text-sm text-ink/50 line-clamp-1">Hosted by {show.host}</p>}
        {show.description && (
          <p className="mt-3 text-sm text-ink/70 leading-relaxed">{show.description}</p>
        )}

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-line/70">
          <span className="text-xs font-mono text-ink/40">
            {show.streams ? `${show.streams} streams` : show.episodeDate || ''}
          </span>
          
          <a
            href={show.audioEmbedUrl || '#'}
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 rounded-full bg-ink text-paper flex items-center justify-center hover:bg-signal transition-colors focus-ring"
            aria-label={`Listen to ${show.title}`}
          >
            <Play size={14} fill="currentColor" />
          </a>
        </div>
      </div>
    </article>
  )
}