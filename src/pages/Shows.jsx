import { useMemo, useState } from 'react'
import SectionLabel from '../components/SectionLabel'
import ShowCard from '../components/ShowCard'
import Reveal from '../components/Reveal'
import { LoadingState, ErrorState, EmptyState } from '../components/DataState'
import { useSheet } from '../lib/useSheet'

export default function Shows() {
  const { rows: shows, loading, error } = useSheet('Shows')
  const [category, setCategory] = useState('All')

  const categories = useMemo(() => {
    const set = new Set(shows.map((s) => s.category).filter(Boolean))
    return ['All', ...set]
  }, [shows])

  const filtered = category === 'All' ? shows : shows.filter((s) => s.category === category)

  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20">
      <SectionLabel>Our Shows</SectionLabel>
      <h1 className="font-display text-4xl sm:text-5xl font-semibold max-w-2xl">
        The Abundance Network Podcasts
      </h1>
      <p className="mt-4 max-w-xl text-ink/60 leading-relaxed">
       We aim to deliver values-driven content - from  faith and personal development, to entrepreneurship and financial literacy. The Abunance Network is commited to creating content that serves, uplifts, and empowers communities.
      </p>

      {!loading && !error && categories.length > 1 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={[
                'px-4 py-2 rounded-full text-sm font-medium border transition-colors focus-ring',
                category === c
                  ? 'bg-ink text-paper border-ink'
                  : 'border-line text-ink/60 hover:border-ink hover:text-ink',
              ].join(' ')}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="mt-10">
        {loading && <LoadingState label="Loading the lineup" />}
        {error && <ErrorState message={error} />}
        {!loading && !error && filtered.length === 0 && <EmptyState />}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((show, i) => (
              <Reveal key={show.id || i} delay={(i % 6) * 60}>
                <ShowCard show={show} index={i} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
