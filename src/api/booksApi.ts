import { loadCredentials } from '../auth/authStorage'
import type { AccentTone, Book, BookStatus } from '../types/book'
import { apiClient, createBasicAuthHeaders } from './client'

export type OwnedBookDto = {
  id?: string | number | null
  book_id?: string | number | null
  title?: string | null
  author?: string | null
  description?: string | null
  genre?: string | null
  status?: string | null
  owner?: string | null
  ownerEmail?: string | null
  book?: {
    id?: string | number | null
    book_id?: string | number | null
    title?: string | null
    author?: string | null
    description?: string | null
    genre?: string | null
  } | null
  person?: {
    name?: string | null
    email?: string | null
  } | null
}

export type CreateBookInput = {
  author: string
  title: string
}

export type CreatedBook = CreateBookInput & {
  person?: {
    name?: string
    email?: string
  }
}

const bookStatuses: BookStatus[] = ['available', 'held', 'shared', 'pending']
const tones: AccentTone[] = ['emerald', 'amber', 'paper']

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function getText(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim().length > 0
    ? value.trim()
    : fallback
}

function getRequiredCreateBookText(value: unknown) {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim()
  }

  throw new Error('Add book response has an unexpected format.')
}

function getOptionalCreateBookText(value: unknown) {
  return typeof value === 'string' && value.trim().length > 0
    ? value.trim()
    : undefined
}

function getBookId(value: unknown, index: number) {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim()
  }

  if (typeof value === 'number') {
    return String(value)
  }

  return `owned-book-${index}`
}

function getBookStatus(value: unknown): BookStatus {
  if (typeof value !== 'string') {
    return 'available'
  }

  const normalizedStatus = value.toLowerCase()

  return bookStatuses.includes(normalizedStatus as BookStatus)
    ? (normalizedStatus as BookStatus)
    : 'available'
}

function getBookTone(index: number) {
  return tones[index % tones.length]
}

function getOwnedBooksData(data: unknown) {
  if (Array.isArray(data)) {
    return data
  }

  if (isRecord(data)) {
    if (Array.isArray(data.books)) {
      return data.books
    }

    if (data.books === null) {
      return []
    }
  }

  throw new Error('Owned books response has an unexpected format.')
}

function toCreatedBook(data: unknown): CreatedBook {
  if (!isRecord(data)) {
    throw new Error('Add book response has an unexpected format.')
  }

  const createdBook: CreatedBook = {
    author: getRequiredCreateBookText(data.author),
    title: getRequiredCreateBookText(data.title),
  }

  if (isRecord(data.person)) {
    const person: NonNullable<CreatedBook['person']> = {}
    const email = getOptionalCreateBookText(data.person.email)
    const name = getOptionalCreateBookText(data.person.name)

    if (email) {
      person.email = email
    }

    if (name) {
      person.name = name
    }

    if (Object.keys(person).length > 0) {
      createdBook.person = person
    }
  }

  return createdBook
}

function toOwnedBook(
  dto: Record<string, unknown>,
  index: number,
  currentUserEmail: string,
): Book {
  const book = isRecord(dto.book) ? dto.book : {}
  const person = isRecord(dto.person) ? dto.person : {}

  return {
    id: getBookId(book.id ?? book.book_id ?? dto.id ?? dto.book_id, index),
    title: getText(book.title ?? dto.title, 'Untitled book'),
    author: getText(book.author ?? dto.author, 'Unknown author'),
    owner: getText(person.email ?? dto.ownerEmail ?? dto.owner, currentUserEmail),
    genre: getText(book.genre ?? dto.genre, 'General'),
    status: getBookStatus(dto.status),
    tone: getBookTone(index),
    note: getText(
      book.description ?? dto.description,
      'No description provided yet',
    ),
  }
}

export async function getOwnedBooks() {
  const credentials = loadCredentials()

  if (!credentials) {
    throw new Error('Saved sign-in details are missing. Please sign in again.')
  }

  const response = await apiClient.get<unknown>('/owned', {
    headers: createBasicAuthHeaders(credentials),
  })

  const ownedBooksData = getOwnedBooksData(response.data)

  return ownedBooksData
    .filter(isRecord)
    .map((bookDto, index) => toOwnedBook(bookDto, index, credentials.email))
}

export async function createBook(book: CreateBookInput) {
  const credentials = loadCredentials()

  if (!credentials) {
    throw new Error('Saved sign-in details are missing. Please sign in again.')
  }

  const response = await apiClient.post<unknown>('/book/add', book, {
    headers: createBasicAuthHeaders(credentials),
  })

  return toCreatedBook(response.data)
}
