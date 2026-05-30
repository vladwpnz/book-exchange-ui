export type BookStatus = 'available' | 'held' | 'shared' | 'pending'

export type AccentTone = 'emerald' | 'amber' | 'paper'

export type Book = {
  id: string
  title: string
  author: string
  owner: string
  genre: string
  status: BookStatus
  tone: AccentTone
  note: string
}

export type DashboardAction = {
  title: string
  description: string
  href: string
  accent: AccentTone
}
