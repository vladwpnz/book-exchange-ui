import { loadCredentials } from '../auth/authStorage'
import i18n from '../i18n/i18n'
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

export type AdminBookDto = {
  id?: string | number | null
  book_id?: string | number | null
  title?: string | null
  author?: string | null
  owner_id?: string | number | null
  holder_id?: string | number | null
  ownerId?: string | number | null
  holderId?: string | number | null
}

export type AdminBook = {
  id: string
  title: string
  author: string
  ownerId: string
  holderId: string
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

  throw new Error(i18n.t('api.books.addedBookUnread'))
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
    throw new Error(
      i18n.t('api.books.signInAgainAction', { action: actionName }),
    )
  }

  if (isHtmlResponse(data, contentType)) {
    throw new Error(i18n.t('api.books.actionIncomplete', { action: actionName }))
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

  throw new Error(i18n.t('api.books.loadResponse', { name: responseName }))
}

function getAdminBooksData(data: unknown) {
  if (!isRecord(data) || !Array.isArray(data.books)) {
    throw new Error(i18n.t('api.books.loadAdminBooks'))
  }

  return data.books.map((bookDto, index) => {
    if (!isRecord(bookDto)) {
      throw new Error(
        i18n.t('api.books.readAdminBook', { index: index + 1 }),
      )
    }

    return bookDto as AdminBookDto
  })
}

type BookMappingOptions = {
  fallbackIdPrefix: string
  fallbackStatus: BookStatus
}

function toCreatedBook(data: unknown): CreatedBook {
  if (!isRecord(data)) {
    throw new Error(i18n.t('api.books.addedBookUnread'))
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
    title: getText(book.title ?? dto.title, i18n.t('api.books.untitled')),
    author: getText(
      book.author ?? dto.author,
      i18n.t('api.books.unknownAuthor'),
    ),
    owner: getText(person.email ?? dto.ownerEmail ?? dto.owner, currentUserEmail),
    genre: getText(book.genre ?? dto.genre, i18n.t('api.books.general')),
    status: getBookStatus(dto.status, options.fallbackStatus),
    tone: getBookTone(index),
    note: getText(
      book.description ?? dto.description,
      i18n.t('api.books.noDescription'),
    ),
  }
}

function getRequiredAdminBookText(
  value: unknown,
  fieldName: string,
  index: number,
) {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim()
  }

  throw new Error(
    i18n.t('api.books.readAdminField', {
      field: fieldName,
      index: index + 1,
    }),
  )
}

function getRequiredAdminBookId(
  value: unknown,
  fieldName: string,
  index: number,
) {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim()
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value)
  }

  throw new Error(
    i18n.t('api.books.readAdminField', {
      field: fieldName,
      index: index + 1,
    }),
  )
}

function toAdminBook(dto: AdminBookDto, index: number): AdminBook {
  return {
    id: getRequiredAdminBookId(dto.id ?? dto.book_id, 'id', index),
    title: getRequiredAdminBookText(dto.title, 'title', index),
    author: getRequiredAdminBookText(dto.author, 'author', index),
    ownerId: getRequiredAdminBookId(dto.owner_id ?? dto.ownerId, 'owner_id', index),
    holderId: getRequiredAdminBookId(
      dto.holder_id ?? dto.holderId,
      'holder_id',
      index,
    ),
  }
}

function getErrorStatus(error: unknown) {
  if (!isRecord(error) || !isRecord(error.response)) {
    return undefined
  }

  return typeof error.response.status === 'number'
    ? error.response.status
    : undefined
}

function getErrorResponseMessage(error: unknown) {
  if (!isRecord(error) || !isRecord(error.response)) {
    return undefined
  }

  const data = error.response.data

  if (typeof data === 'string' && data.trim().length > 0) {
    return data.trim()
  }

  if (isRecord(data) && typeof data.message === 'string') {
    const message = data.message.trim()

    return message.length > 0 ? message : undefined
  }

  return undefined
}

function toAdminRequestError(error: unknown, fallbackMessage: string) {
  const status = getErrorStatus(error)

  if (status === 401) {
    return new Error(i18n.t('api.books.signInAgain'))
  }

  if (status === 403) {
    return new Error(i18n.t('api.books.adminRequired'))
  }

  return new Error(
    getErrorResponseMessage(error) ??
      (error instanceof Error ? error.message : fallbackMessage),
  )
}

function getForceReturnId(id: string | number) {
  if (typeof id === 'number' && Number.isFinite(id)) {
    return String(id)
  }

  if (typeof id === 'string' && id.trim().length > 0) {
    return id.trim()
  }

  throw new Error(i18n.t('api.books.chooseForceReturn'))
}

function assertForceReturnAccepted(data: unknown) {
  if (data === null || data === undefined) {
    return
  }

  if (typeof data !== 'string') {
    throw new Error(i18n.t('api.books.forceReturnConfirm'))
  }

  const message = data.trim()

  if (message.length > 0 && message !== 'The book was returned') {
    throw new Error(i18n.t('api.books.forceReturnConfirm'))
  }
}

export async function getOwnedBooks() {
  const credentials = loadCredentials()

  if (!credentials) {
    throw new Error(i18n.t('api.books.missingCredentials'))
  }

  const response = await apiClient.get<unknown>('/owned', {
    headers: createBasicAuthHeaders(credentials),
  })

  const ownedBooksData = getBooksData(response.data, i18n.t('myBooks.header.title'))

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
    throw new Error(i18n.t('api.books.missingCredentials'))
  }

  const response = await apiClient.get<unknown>('/held', {
    headers: createBasicAuthHeaders(credentials),
  })

  const heldBooksData = getBooksData(response.data, i18n.t('heldBooks.header.title'))

  return heldBooksData
    .filter(isRecord)
    .map((bookDto, index) =>
      toBook(bookDto, index, credentials.email, {
        fallbackIdPrefix: 'held-book',
        fallbackStatus: 'held',
      }),
    )
}

export async function getAdminBooks() {
  const credentials = loadCredentials()

  if (!credentials) {
    throw new Error(i18n.t('api.books.missingCredentials'))
  }

  const expectedUrl = apiClient.getUri({ url: '/items' })

  try {
    const response = await apiClient.get<unknown>('/items', {
      headers: createBasicAuthHeaders(credentials),
    })

    assertBookActionAccepted(
      response.data,
      response.headers['content-type'],
      getResponseUrl(response.request),
      expectedUrl,
      i18n.t('admin.header.title'),
    )

    return getAdminBooksData(response.data).map(toAdminBook)
  } catch (error) {
    if (error instanceof Error && !getErrorStatus(error)) {
      throw error
    }

    throw toAdminRequestError(error, i18n.t('admin.errors.loadFallback'))
  }
}

export async function createBook(book: CreateBookInput) {
  const credentials = loadCredentials()

  if (!credentials) {
    throw new Error(i18n.t('api.books.missingCredentials'))
  }

  const response = await apiClient.post<unknown>('/book/add', book, {
    headers: createBasicAuthHeaders(credentials),
  })

  return toCreatedBook(response.data)
}

export async function shareBook(book: ShareBookInput) {
  const credentials = loadCredentials()

  if (!credentials) {
    throw new Error(i18n.t('api.books.missingCredentials'))
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
    i18n.t('common.actions.shareBook'),
  )
}

export async function giveBook(book: GiveBookInput) {
  const credentials = loadCredentials()

  if (!credentials) {
    throw new Error(i18n.t('api.books.missingCredentials'))
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
    i18n.t('common.actions.giveBook'),
  )
}

export async function forceReturnBook(id: string | number) {
  const credentials = loadCredentials()

  if (!credentials) {
    throw new Error(i18n.t('api.books.missingCredentials'))
  }

  const bookId = getForceReturnId(id)
  const expectedUrl = apiClient.getUri({
    url: '/book/return/force',
    params: { id: bookId },
  })

  try {
    const response = await apiClient.post<unknown>(
      '/book/return/force',
      undefined,
      {
        headers: createBasicAuthHeaders(credentials),
        params: { id: bookId },
      },
    )

    assertBookActionAccepted(
      response.data,
      response.headers['content-type'],
      getResponseUrl(response.request),
      expectedUrl,
      i18n.t('admin.table.forceReturn'),
    )
    assertForceReturnAccepted(response.data)
  } catch (error) {
    if (error instanceof Error && !getErrorStatus(error)) {
      throw error
    }

    throw toAdminRequestError(error, i18n.t('admin.errors.forceFallback'))
  }
}

export async function returnBook(book: ReturnBookInput) {
  const credentials = loadCredentials()

  if (!credentials) {
    throw new Error(i18n.t('api.books.missingCredentials'))
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
    i18n.t('common.actions.returnBook'),
  )
}
