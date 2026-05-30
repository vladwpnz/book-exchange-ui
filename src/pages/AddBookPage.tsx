export function AddBookPage() {
  return (
    <section className="rounded-lg border border-white/10 bg-[#f6eddc] p-6 text-[#17221d] shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
      <p className="text-sm font-semibold uppercase text-emerald-800">
        Catalog entry
      </p>
      <h1 className="mt-3 text-4xl font-semibold">Add book</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5c675b]">
        This form is static for now and mirrors the kind of data the backend can
        receive later.
      </p>
      <form
        className="mt-6 grid gap-4 md:grid-cols-2"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="block text-sm font-semibold" htmlFor="title">
          Title
          <input
            id="title"
            className="mt-2 w-full rounded-md border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
            placeholder="Book title"
          />
        </label>
        <label className="block text-sm font-semibold" htmlFor="author">
          Author
          <input
            id="author"
            className="mt-2 w-full rounded-md border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
            placeholder="Author name"
          />
        </label>
        <label className="block text-sm font-semibold" htmlFor="genre">
          Genre
          <input
            id="genre"
            className="mt-2 w-full rounded-md border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
            placeholder="Fiction, design, tech"
          />
        </label>
        <label className="block text-sm font-semibold" htmlFor="condition">
          Condition
          <select
            id="condition"
            className="mt-2 w-full rounded-md border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
          >
            <option>Excellent</option>
            <option>Good</option>
            <option>Readable</option>
          </select>
        </label>
        <label
          className="block text-sm font-semibold md:col-span-2"
          htmlFor="note"
        >
          Exchange note
          <textarea
            id="note"
            className="mt-2 min-h-28 w-full rounded-md border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
            placeholder="Short note for other readers"
          />
        </label>
        <button
          type="submit"
          className="rounded-md bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 md:w-fit"
        >
          Save placeholder
        </button>
      </form>
    </section>
  )
}
