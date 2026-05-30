import { adminRows } from '../api/mockLibrary'

export function AdminPanelPage() {
  return (
    <section>
      <div className="rounded-lg border border-white/10 bg-[#0d1b16] p-6">
        <p className="text-sm font-semibold uppercase text-amber-200">
          Admin placeholder
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-stone-50">
          Admin panel
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-400">
          Portfolio-only operational snapshot with no privileged backend calls.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {adminRows.map((row) => (
          <article
            key={row.label}
            className="rounded-lg border border-white/10 bg-white/5 p-5"
          >
            <p className="text-sm text-stone-400">{row.label}</p>
            <p className="mt-3 text-4xl font-semibold text-stone-50">
              {row.value}
            </p>
            <span className="mt-4 inline-flex rounded-md border border-emerald-300/40 bg-emerald-300/10 px-3 py-1 text-sm text-emerald-100">
              {row.status}
            </span>
          </article>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-white/10">
        <table className="w-full border-collapse bg-[#f6eddc] text-left text-[#17221d]">
          <thead className="bg-emerald-950 text-stone-100">
            <tr>
              <th className="px-5 py-4 text-sm font-semibold">Area</th>
              <th className="px-5 py-4 text-sm font-semibold">Value</th>
              <th className="px-5 py-4 text-sm font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {adminRows.map((row) => (
              <tr key={row.label} className="border-t border-stone-300">
                <td className="px-5 py-4 text-sm font-semibold">{row.label}</td>
                <td className="px-5 py-4 text-sm">{row.value}</td>
                <td className="px-5 py-4 text-sm">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
