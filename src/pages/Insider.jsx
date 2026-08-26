import SectionLabel from '../components/SectionLabel'
import Reveal from '../components/Reveal'
import { LoadingState, ErrorState, EmptyState } from '../components/DataState'
import { useSheet } from '../lib/useSheet'

export default function Insider() {
  const { rows: posts, loading, error } = useSheet('Blog')

  return (
    <section className="mx-auto max-w-5xl px-5 sm:px-8 py-16 sm:py-20">
      <SectionLabel>TAN Insider</SectionLabel>
      <h1 className="font-display text-4xl sm:text-5xl font-semibold max-w-2xl leading-tight">
        Research, news, and stories from the network
      </h1>
      <p className="mt-5 max-w-2xl text-ink/70 leading-relaxed">
        Original research on Filipino podcast listeners, media coverage, and updates
        from behind the scenes at TAN.
      </p>

      <div className="mt-14">
        {loading && <LoadingState label="Pulling the latest" />}
        {error && <ErrorState message={error} />}
        {!loading && !error && posts.length === 0 && <EmptyState message="No posts yet — add rows to the Blog tab of your Google Sheet." />}
        {!loading && !error && posts.length > 0 && (
          <div className="divide-y divide-line">
            {posts.map((post, i) => (
              <Reveal
                key={post.id || i}
                delay={(i % 6) * 50}
                as="a"
                href={post.link || '#'}
                className="group flex flex-col sm:flex-row gap-5 py-8 first:pt-0"
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt=""
                    className="w-full sm:w-40 h-40 sm:h-28 object-cover rounded-lg border border-line flex-shrink-0"
                  />
                )}
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-ink/40">
                    {post.date} {post.category ? `· ${post.category}` : ''}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold group-hover:text-signal transition-colors">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="mt-2 text-sm text-ink/60 leading-relaxed line-clamp-2">{post.excerpt}</p>
                  )}
                  <span className="mt-3 inline-block text-sm font-medium">Continue reading →</span>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
