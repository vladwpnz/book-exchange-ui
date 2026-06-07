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

export type ShareBookInput = {
  title: string
  username: string
}

export type GiveBookInput = ShareBookInput

export type ReturnBookInput = {
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

function getResponseUrl(request: unknown) {
  if (!isRecord(request)) {
    return undefined
  }

  return getOptionalCreateBookText(request.responseURL)
}

function isUnexpectedResponseUrl(responseUrl: string, expectedUrl: string) {
  try {
    const responseLocation = new URL(responseUrl, window.location.href)
    const expectedLocation = new URL(expectedUrl, window.location.href)

    return (
      responseLocation.origin !== expectedLocation.origin ||
      responseLocation.pathname !== expectedLocation.pathname
    )
  } catch {
    return false
  }
}

function isHtmlResponse(data: unknown, contentType: unknown) {
  if (typeof contentType === 'string') {
    const normalizedContentType = contentType.toLowerCase()

    if (normalizedContentType.includes('text/html')) {
      return true
    }
  }

  if (typeof data !== 'string') {
    return false
  }

  const normalizedData = data.trim().toLowerCase()

  return (
    normalizedData.startsWith('<!doctype html') ||
    normalizedData.startsWith('<html') ||
    (normalizedData.includes('<form') && normalizedData.includes('login'))
  )
}

function assertBookActionAccepted(
  data: unknown,
  contentType: unknown,
  responseUrl: string | undefined,
  expectedUrl: string,
  actionName: string,
) {
  if (responseUrl && isUnexpectedResponseUrl(responseUrl, expectedUrl)) {
    throw new Error(`${actionName} request was redirected. Please sign in again.`)
  }

  if (isHtmlResponse(data, contentType)) {
    throw new Error(`${actionName} response has an unexpected format.`)
  }
}

function getBookId(value: unknown, index: number, fallbackPrefix: string) {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim()
  }

  if (typeof value === 'number') {
    return String(value)
  }

  return `${fallbackPrefix}-${index}`
}

function getBookStatus(
  value: unknown,
  fallbackStatus: BookStatus,
): BookStatus {
  if (typeof value !== 'string') {
    return fallbackStatus
  }

  const normalizedStatus = value.toLowerCase()

  return bookStatuses.includes(normalizedStatus as BookStatus)
    ? (normalizedStatus as BookStatus)
    : fallbackStatus
}

function getBookTone(index: number) {
  return tones[index % tones.length]
}

function getBooksData(data: unknown, responseName: string) {
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

  throw new Error(`${responseName} response has an unexpected format.`)
}

type BookMappingOptions = {
  fallbackIdPrefix: string
  fallbackStatus: BookStatus
}

export function isOwnedBooksPayload(data: unknown) {
  try {
    getBooksData(data, 'Owned books')

    return true
  } catch {
    return false
  }
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

function toBook(
  dto: Record<string, unknown>,
  index: number,
  currentUserEmail: string,
  options: BookMappingOptions,
): Book {
  const book = isRecord(dto.book) ? dto.book : {}
  const person = isRecord(dto.person) ? dto.person : {}

  return {
    id: getBookId(
      book.id ?? book.book_id ?? dto.id ?? dto.book_id,
      index,
      options.fallbackIdPrefix,
    ),
    title: getText(book.title ?? dto.title, 'Untitled book'),
    author: getText(book.author ?? dto.author, 'Unknown author'),
    owner: getText(person.email ?? dto.ownerEmail ?? dto.owner, currentUserEmail),
    genre: getText(book.genre ?? dto.genre, 'General'),
    status: getBookStatus(dto.status, options.fallbackStatus),
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

  const ownedBooksData = getBooksData(response.data, 'Owned books')

  return ownedBooksData
    .filter(isRecord)
    .map((bookDto, index) =>
      toBook(bookDto, index, credentials.email, {
        fallbackIdPrefix: 'owned-book',
        fallbackStatus: 'available',
      }),
    )
}

export async function getHeldBooks() {
  const credentials = loadCredentials()

  if (!credentials) {
    throw new Error('Saved sign-in details are missing. Please sign in again.')
  }

  const response = await apiClient.get<unknown>('/held', {
    headers: createBasicAuthHeaders(credentials),
  })

  const heldBooksData = getBooksData(response.data, 'Held books')

  return heldBooksData
    .filter(isRecord)
    .map((bookDto, index) =>
      toBook(bookDto, index, credentials.email, {
        fallbackIdPrefix: 'held-book',
        fallbackStatus: 'held',
      }),
    )
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

export async function shareBook(book: ShareBookInput) {
  const credentials = loadCredentials()

  if (!credentials) {
    throw new Error('Saved sign-in details are missing. Please sign in again.')
  }

  const expectedUrl = apiClient.getUri({ url: '/book/share' })
  const response = await apiClient.post<unknown>('/book/share', book, {
    headers: createBasicAuthHeaders(credentials),
  })

  assertBookActionAccepted(
    response.data,
    response.headers['content-type'],
    getResponseUrl(response.request),
    expectedUrl,
    'Share book',
  )
}

export async function giveBook(book: GiveBookInput) {
  const credentials = loadCredentials()

  if (!credentials) {
    throw new Error('Saved sign-in details are missing. Please sign in again.')
  }

  const expectedUrl = apiClient.getUri({ url: '/book/give' })
  const response = await apiClient.post<unknown>('/book/give', book, {
    headers: createBasicAuthHeaders(credentials),
  })

  assertBookActionAccepted(
    response.data,
    response.headers['content-type'],
    getResponseUrl(response.request),
    expectedUrl,
    'Give book',
  )
}

export async function returnBook(book: ReturnBookInput) {
  const credentials = loadCredentials()

  if (!credentials) {
    throw new Error('Saved sign-in details are missing. Please sign in again.')
  }

  const expectedUrl = apiClient.getUri({ url: '/book/return' })
  const response = await apiClient.post<unknown>('/book/return', book, {
    headers: createBasicAuthHeaders(credentials),
  })

  assertBookActionAccepted(
    response.data,
    response.headers['content-type'],
    getResponseUrl(response.request),
    expectedUrl,
    'Return book',
  )
}
