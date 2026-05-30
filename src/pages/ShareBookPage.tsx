import { myBooks } from '../api/mockLibrary'

export function ShareBookPage() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="rounded-lg border border-white/10 bg-[#f6eddc] p-6 text-[#17221d] shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
        <p className="text-sm font-semibold uppercase text-emerald-800">
          Share flow
        </p>
        <h1 className="mt-3 text-4xl font-semibold">Share book</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5c675b]">
          Create a static preview of a share request without contacting the API.
        </p>
        <form
          className="mt-6 grid gap-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="block text-sm font-semibold" htmlFor="book">
            Book
            <select
              id="book"
              className="mt-2 w-full rounded-md border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
            >
              {myBooks.map((book) => (
                <option key={book.id}>{book.title}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-semibold" htmlFor="reader">
            Reader email
            <input
              id="reader"
              type="email"
              className="mt-2 w-full rounded-md border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
              placeholder="reader@example.com"
            />
          </label>
          <button
            type="submit"
            className="rounded-md bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 md:w-fit"
          >
            Prepare share
          </button>
        </form>
      </div>

      <aside className="rounded-lg border border-amber-200/30 bg-amber-200/10 p-6">
        <h2 className="text-2xl font-semibold text-amber-100">Exchange status</h2>
        <p className="mt-3 text-sm leading-6 text-stone-300">
          Requests will be shown here once backend calls are connected.
        </p>
      </aside>
    </section>
  )
}
