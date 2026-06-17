import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { repositoryLinks } from '../api/links'
import { featuredBooks } from '../api/mockLibrary'
import { useAuth } from '../auth/useAuth'
import { BookCard } from '../components/BookCard'
import { HeroLibraryPreview } from '../components/HeroLibraryPreview'
import { HeroStoryBridge } from '../components/HeroStoryBridge'
import { Navbar } from '../components/Navbar'
import { LandingStorySection } from '../features/landing3d/LandingStorySection'

const workflow = [
  {
    key: 'add',
    href: '/app/add-book',
  },
  {
    key: 'share',
    href: '/app/share-book',
  },
  {
    key: 'give',
    href: '/app/give-book',
  },
  {
    key: 'return',
    href: '/app/return-book',
  },
] as const

export function LandingPage() {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()
  const primaryHref = isAuthenticated ? '/app/my-books' : '/register'
  const primaryLabel = isAuthenticated
    ? t('landing.hero.openShelf')
    : t('common.actions.createAccount')
  const secondaryHref = isAuthenticated ? '/app/add-book' : '/login'
  const secondaryLabel = isAuthenticated
    ? t('landing.hero.addBook')
    : t('common.actions.login')
  const localizedFeaturedBooks = featuredBooks.map((book) => ({
    ...book,
    genre: t(`landing.featuredBooks.${book.id}.genre`),
    note: t(`landing.featuredBooks.${book.id}.note`),
  }))

  return (
    <div className="min-h-screen text-[var(--color-ink)]">
      <Navbar />

      <main>
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 md:py-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(22rem,0.75fr)] lg:items-center lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-accent)]">
                {t('landing.hero.eyebrow')}
              </p>

              <h1 className="mt-4 max-w-4xl font-[var(--font-display)] text-5xl font-semibold leading-[0.98] text-[var(--color-ink)] sm:text-6xl lg:text-7xl">
                {t('landing.hero.title')}
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
                {t('landing.hero.description')}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link to={primaryHref} className="primary-action">
                  {primaryLabel}
                </Link>

                <Link to={secondaryHref} className="secondary-action">
                  {secondaryLabel}
                </Link>
              </div>

              <dl className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
                {[
                  [
                    t('landing.hero.stats.catalog.label'),
                    t('landing.hero.stats.catalog.value'),
                  ],
                  [
                    t('landing.hero.stats.flows.label'),
                    t('landing.hero.stats.flows.value'),
                  ],
                  [
                    t('landing.hero.stats.admin.label'),
                    t('landing.hero.stats.admin.value'),
                  ],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="border-l border-[var(--color-border-strong)] pl-4"
                  >
                    <dt className="text-sm font-bold text-[var(--color-ink)]">
                      {label}
                    </dt>
                    <dd className="mt-1 text-sm leading-5 text-[var(--color-muted)]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <HeroLibraryPreview />
          </div>
        </section>

        <HeroStoryBridge />

        <LandingStorySection
          primaryAction={{
            href: primaryHref,
            label: primaryLabel,
          }}
          secondaryAction={{
            href: secondaryHref,
            label: secondaryLabel,
          }}
        />

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-accent)]">
                {t('landing.workflow.eyebrow')}
              </p>
              <h2 className="mt-3 font-[var(--font-display)] text-4xl font-semibold leading-tight text-[var(--color-ink)]">
                {t('landing.workflow.title')}
              </h2>
              <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
                {t('landing.workflow.description')}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {workflow.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  className="group rounded-[0.7rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-restraint)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-card-hover)] hover:shadow-[var(--shadow-lift)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
                >
                  <span
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-status-success-border)] bg-[var(--color-status-success-bg)] text-[var(--color-status-success-text)]"
                    aria-hidden="true"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-current" />
                  </span>
                  <h3 className="mt-3 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
                    {t(`landing.workflow.items.${item.key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                    {t(`landing.workflow.items.${item.key}.description`)}
                  </p>
                  <span className="mt-4 inline-flex text-sm font-bold text-[var(--color-accent)] transition duration-200 group-hover:translate-x-1">
                    {t('common.actions.openWorkflow')} -&gt;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--color-border)] bg-[var(--color-band)]">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <p className="text-sm font-bold tracking-[0.16em] text-[var(--color-accent)]">
                {t('landing.catalog.eyebrow')}
              </p>
              <h2 className="mt-3 font-[var(--font-display)] text-4xl font-semibold text-[var(--color-ink)]">
                {t('landing.catalog.title')}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
                {t('landing.catalog.description')}
              </p>
            </div>

            <div className="grid gap-3">
              {localizedFeaturedBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  contextLabel={t('landing.catalog.contextLabel')}
                  actions={
                    <Link
                      to="/app/my-books"
                      className="secondary-action min-h-0 px-3 py-2 text-sm"
                    >
                      {t('common.actions.viewInApp')}
                    </Link>
                  }
                />
              ))}
            </div>
          </div>
        </section>

        <footer className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 border-t border-[var(--color-border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
                {t('common.appName')}
              </p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">
                {t('landing.footer.description')}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm font-bold text-[var(--color-muted)]">
              <a
                href={repositoryLinks.backend}
                target="_blank"
                rel="noreferrer"
                className="transition duration-200 hover:text-[var(--color-accent)]"
              >
                {t('landing.footer.serviceRepo')}
              </a>
              <a
                href={repositoryLinks.apiTests}
                target="_blank"
                rel="noreferrer"
                className="transition duration-200 hover:text-[var(--color-accent)]"
              >
                {t('landing.footer.qualityChecks')}
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
