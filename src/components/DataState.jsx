import Waveform from './Waveform'

export function LoadingState({ label = 'Loading' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-ink/50">
      <Waveform bars={9} live />
      <p className="font-mono text-xs uppercase tracking-widest">{label}…</p>
    </div>
  )
}

export function ErrorState({ message }) {
  return (
    <div className="rounded-lg border border-signal/30 bg-signal/5 px-6 py-8 text-center">
      <p className="font-medium text-ink">This section couldn't load its content.</p>
      <p className="mt-1 text-sm text-ink/60">{message}</p>
    </div>
  )
}

export function EmptyState({ message = 'Nothing here yet — check back soon.' }) {
  return (
    <div className="rounded-lg border border-dashed border-line px-6 py-10 text-center text-ink/50">
      {message}
    </div>
  )
}
