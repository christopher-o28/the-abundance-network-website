export default function StatBar({ stats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-line border-y border-line">
      {stats.map((s, i) => (
        <div key={i} className="px-4 py-8 text-center sm:text-left sm:px-6">
          <p className="font-display text-3xl sm:text-4xl font-semibold">{s.value}</p>
          <p className="mt-1 text-xs sm:text-sm text-ink/50">{s.label}</p>
        </div>
      ))}
    </div>
  )
}
