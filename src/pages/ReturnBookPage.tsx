import { heldBooks } from '../api/mockLibrary'

export function ReturnBookPage() {
  return (
    <section className="rounded-lg border border-white/10 bg-[#f6eddc] p-6 text-[#17221d] shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
      <p className="text-sm font-semibold uppercase text-emerald-800">
        Return flow
      </p>
      <h1 className="mt-3 text-4xl font-semibold">Return book</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5c675b]">
        Mark a borrowed book as returned in the UI preview.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {heldBooks.map((book) => (
          <article
            key={book.id}
            className="rounded-lg border border-stone-300 bg-white p-5"
          >
            <p className="text-xs font-semibold uppercase text-amber-700">
              Held book
            </p>
            <h2 className="mt-2 text-xl font-semibold">{book.title}</h2>
            <p className="mt-2 text-sm text-[#5c675b]">{book.note}</p>
            <button
              type="button"
              className="mt-5 rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Preview return
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
