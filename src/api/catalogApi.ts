import { loadCredentials } from '../auth/authStorage'
import { apiClient, createBasicAuthHeaders } from './client'

export type CatalogBookDto = {
  catalogBookId?: string | number | null
  title?: string | null
  author?: string | null
  genre?: string | null
  description?: string | null
  coverUrl?: string | null
  isbn?: string | null
}

export type CatalogBook = {
  catalogBookId: string
  title: string
  author: string
  genre: string
  description: string
  coverUrl?: string
  isbn?: string
}

export type CatalogBooksResponse = {
  books: CatalogBookDto[]
}

export type CreatedCatalogBook = {
  title: string
  author: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function getRequiredText(
  value: unknown,
  fieldName: string,
  responseName: string,
) {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim()
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value)
  }

  throw new Error(
    `Could not read ${fieldName} for ${responseName.toLowerCase()}. Please try again.`,
  )
}

function getOptionalText(value: unknown) {
  return typeof value === 'string' && value.trim().length > 0
    ? value.trim()
    : undefined
}

function getCatalogBooksData(data: unknown) {
  if (!isRecord(data) || !Array.isArray(data.books)) {
    throw new Error('Could not load catalog books. Please try again.')
  }

  return data.books.map((bookDto, index) => {
    if (!isRecord(bookDto)) {
      throw new Error(
        `Could not read catalog book ${
          index + 1
        }. Please refresh and try again.`,
      )
    }

    return bookDto as CatalogBookDto
  })
}

function toCatalogBook(dto: CatalogBookDto): CatalogBook {
  return {
    catalogBookId: getRequiredText(
      dto.catalogBookId,
      'catalogBookId',
      'Catalog books',
    ),
    title: getRequiredText(dto.title, 'title', 'Catalog books'),
    author: getRequiredText(dto.author, 'author', 'Catalog books'),
    genre: getOptionalText(dto.genre) ?? 'General',
    description: getOptionalText(dto.description) ?? 'No description provided.',
    coverUrl: getOptionalText(dto.coverUrl),
    isbn: getOptionalText(dto.isbn),
  }
}

function toCreatedCatalogBook(data: unknown): CreatedCatalogBook {
  if (!isRecord(data)) {
    throw new Error('We could not read the added catalog book. Please try again.')
  }

  const book = isRecord(data.book) ? data.book : data

  return {
    title: getRequiredText(book.title, 'title', 'Add catalog book'),
    author: getRequiredText(book.author, 'author', 'Add catalog book'),
  }
}

function getCatalogBookId(catalogBookId: string | number) {
  if (typeof catalogBookId === 'number' && Number.isFinite(catalogBookId)) {
    return String(catalogBookId)
  }

  if (typeof catalogBookId === 'string' && catalogBookId.trim().length > 0) {
    return catalogBookId.trim()
  }

  throw new Error('Catalog book id is required.')
}

function getCredentials() {
  const credentials = loadCredentials()

  if (!credentials) {
    throw new Error('Saved sign-in details are missing. Please sign in again.')
  }

  return credentials
}

export async function searchCatalogBooks(query: string): Promise<CatalogBook[]> {
  const credentials = getCredentials()
  const trimmedQuery = query.trim()

  const response = await apiClient.get<unknown>('/catalog/books', {
    headers: createBasicAuthHeaders(credentials),
    params: trimmedQuery ? { query: trimmedQuery } : undefined,
  })

  return getCatalogBooksData(response.data).map(toCatalogBook)
}

export async function addBookFromCatalog(
  catalogBookId: string | number,
): Promise<CreatedCatalogBook> {
  const credentials = getCredentials()
  const id = getCatalogBookId(catalogBookId)

  const response = await apiClient.post<unknown>(
    '/book/add/from-catalog',
    undefined,
    {
      headers: createBasicAuthHeaders(credentials),
      params: { id },
    },
  )

  return toCreatedCatalogBook(response.data)
}
