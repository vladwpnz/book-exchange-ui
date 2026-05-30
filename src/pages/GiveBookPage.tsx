export function GiveBookPage() {
  return (
    <section className="rounded-lg border border-white/10 bg-[#0d1b16] p-6">
      <p className="text-sm font-semibold uppercase text-amber-200">
        Ownership transfer
      </p>
      <h1 className="mt-3 text-4xl font-semibold text-stone-50">Give book</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-400">
        A calm placeholder for giving a book to another reader.
      </p>
      <form
        className="mt-6 grid gap-4 rounded-lg border border-white/10 bg-white/5 p-5"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="block text-sm font-semibold text-stone-200" htmlFor="give-title">
          Book title
          <input
            id="give-title"
            className="mt-2 w-full rounded-md border border-white/10 bg-[#07130f] px-4 py-3 text-sm text-stone-100 outline-none transition focus:border-amber-200/60 focus:ring-2 focus:ring-amber-200/10"
            placeholder="Select or type a title"
          />
        </label>
        <label className="block text-sm font-semibold text-stone-200" htmlFor="give-reader">
          Recipient
          <input
            id="give-reader"
            className="mt-2 w-full rounded-md border border-white/10 bg-[#07130f] px-4 py-3 text-sm text-stone-100 outline-none transition focus:border-amber-200/60 focus:ring-2 focus:ring-amber-200/10"
            placeholder="Reader email"
          />
        </label>
        <button
          type="submit"
          className="rounded-md bg-amber-300 px-5 py-3 text-sm font-semibold text-[#17221d] transition hover:bg-amber-200 md:w-fit"
        >
          Preview transfer
        </button>
      </form>
    </section>
  )
}
