import type { Book, DashboardAction } from '../types/book'

export const featuredBooks: Book[] = [
  {
    id: 'bk-aurora',
    title: 'The Aurora Library',
    author: 'Mira Ellison',
    owner: 'Nadia',
    genre: 'Fiction',
    status: 'available',
    tone: 'emerald',
    note: 'Ready to share this week',
  },
  {
    id: 'bk-map',
    title: 'Maps of Quiet Cities',
    author: 'Leon Hart',
    owner: 'Ivan',
    genre: 'Travel',
    status: 'held',
    tone: 'amber',
    note: 'Held until Sunday',
  },
  {
    id: 'bk-craft',
    title: 'The Craft of APIs',
    author: 'Sofia Chen',
    owner: 'Olena',
    genre: 'Technology',
    status: 'shared',
    tone: 'paper',
    note: 'Shared with a teammate',
  },
]

export const myBooks: Book[] = [
  {
    id: 'bk-clean-code',
    title: 'Clean Frontend Notes',
    author: 'Elena Shore',
    owner: 'You',
    genre: 'Technology',
    status: 'available',
    tone: 'emerald',
    note: 'Available for exchange',
  },
  {
    id: 'bk-ink',
    title: 'Ink and Indexes',
    author: 'Marco Bell',
    owner: 'You',
    genre: 'Design',
    status: 'pending',
    tone: 'amber',
    note: 'Waiting for pickup',
  },
]

export const heldBooks: Book[] = [
  {
    id: 'bk-systems',
    title: 'Systems in the Stacks',
    author: 'Tara Voss',
    owner: 'Marta',
    genre: 'Architecture',
    status: 'held',
    tone: 'emerald',
    note: 'Return window closes tomorrow',
  },
  {
    id: 'bk-catalog',
    title: 'Catalog of Small Wonders',
    author: 'Anton Vale',
    owner: 'Yurii',
    genre: 'Essays',
    status: 'held',
    tone: 'amber',
    note: 'Borrowed for review',
  },
]

export const dashboardActions: DashboardAction[] = [
  {
    title: 'Add a book',
    description: 'Search the catalog first or add a missing title manually.',
    href: '/app/add-book',
    accent: 'emerald',
  },
  {
    title: 'Share a book',
    description: 'Send an owned book to another reader by email.',
    href: '/app/share-book',
    accent: 'amber',
  },
  {
    title: 'Return a book',
    description: 'Close an active hold and return a borrowed book to its owner.',
    href: '/app/return-book',
    accent: 'paper',
  },
]

export const adminRows = [
  { label: 'Registered readers', value: '128', status: 'Healthy' },
  { label: 'Books in catalog', value: '412', status: 'Growing' },
  { label: 'Open exchanges', value: '37', status: 'Review' },
]
