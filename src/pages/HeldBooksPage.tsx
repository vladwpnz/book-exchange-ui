import { heldBooks } from '../api/mockLibrary'
import { BookCard } from '../components/BookCard'

export function HeldBooksPage() {
  return (
    <section>
      <div className="rounded-lg border border-white/10 bg-[#0d1b16] p-6">
        <p className="text-sm font-semibold uppercase text-amber-200">
          Borrowed shelf
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-stone-50">
          Held books
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-stone-400">
          A placeholder view for books currently held by the signed-in reader.
        </p>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        {heldBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  )
}
