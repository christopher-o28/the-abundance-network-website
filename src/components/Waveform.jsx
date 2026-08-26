const HEIGHTS = ['h-3', 'h-6', 'h-4', 'h-8', 'h-5', 'h-9', 'h-4', 'h-7', 'h-3', 'h-6']
const ANIMS = ['animate-wave1', 'animate-wave2', 'animate-wave3', 'animate-wave4', 'animate-wave5']

/**
 * A row of animated bars, standing in for the hero image.
 * live: bars animate (used near the top of the page / active states)
 * static: bars render at fixed heights (used as section dividers, low-motion contexts)
 */
export default function Waveform({ bars = 24, live = true, color = 'bg-ink', className = '' }) {
  return (
    <div className={`flex items-end gap-[3px] ${className}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={[
            'w-[3px] rounded-full origin-bottom',
            color,
            HEIGHTS[i % HEIGHTS.length],
            live ? ANIMS[i % ANIMS.length] : '',
          ].join(' ')}
        />
      ))}
    </div>
  )
}
