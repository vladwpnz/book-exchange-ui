import { dashboardActions, myBooks } from '../api/mockLibrary'
import { BookCard } from '../components/BookCard'
import { DashboardCard } from '../components/DashboardCard'

export function MyBooksPage() {
  return (
    <section>
      <div className="rounded-lg border border-white/10 bg-[#0d1b16] p-6">
        <p className="text-sm font-semibold uppercase text-amber-200">
          My library
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-stone-50">My books</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-stone-400">
          Manage the books you own and prepare exchange actions from a calm
          dashboard surface.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {dashboardActions.map((action) => (
          <DashboardCard key={action.href} {...action} />
        ))}
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        {myBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  )
}
