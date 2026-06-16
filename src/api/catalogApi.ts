import axios from 'axios'

import { loadCredentials } from '../auth/authStorage'
import i18n from '../i18n/i18n'
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

export class CatalogRequestError extends Error {
  status: number | undefined

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'CatalogRequestError'
    this.status = status
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function getResponseErrorMessage(data: unknown) {
  if (isRecord(data)) {
    const responseError = data.error
    const responseMessage = data.message

    if (typeof responseError === 'string' && responseError.trim().length > 0) {
      return responseError.trim()
    }

    if (
      typeof responseMessage === 'string' &&
      responseMessage.trim().length > 0
    ) {
      return responseMessage.trim()
    }
  }

  if (typeof data === 'string' && data.trim().length > 0) {
    return data.trim()
  }

  return undefined
}

function toCatalogRequestError(error: unknown, fallbackMessage: string) {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error : new Error(fallbackMessage)
  }

  const status = error.response?.status
  const message =
    status === 409
      ? i18n.t('api.catalog.duplicate')
      : getResponseErrorMessage(error.response?.data) ?? error.message

  return new CatalogRequestError(message || fallbackMessage, status)
}

export function isDuplicateCatalogBookError(error: unknown) {
  return error instanceof CatalogRequestError && error.status === 409
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
    i18n.t('api.catalog.readField', {
      field: fieldName,
      name: responseName,
    }),
  )
}

function getOptionalText(value: unknown) {
  return typeof value === 'string' && value.trim().length > 0
    ? value.trim()
    : undefined
}

function getCatalogBooksData(data: unknown) {
  if (!isRecord(data) || !Array.isArray(data.books)) {
    throw new Error(i18n.t('api.catalog.load'))
  }

  return data.books.map((bookDto, index) => {
    if (!isRecord(bookDto)) {
      throw new Error(
        i18n.t('api.catalog.readBook', { index: index + 1 }),
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
      i18n.t('addBook.catalog.resultsTitle'),
    ),
    title: getRequiredText(
      dto.title,
      'title',
      i18n.t('addBook.catalog.resultsTitle'),
    ),
    author: getRequiredText(
      dto.author,
      'author',
      i18n.t('addBook.catalog.resultsTitle'),
    ),
    genre: getOptionalText(dto.genre) ?? i18n.t('api.catalog.general'),
    description:
      getOptionalText(dto.description) ?? i18n.t('api.catalog.noDescription'),
    coverUrl: getOptionalText(dto.coverUrl),
    isbn: getOptionalText(dto.isbn),
  }
}

function toCreatedCatalogBook(data: unknown): CreatedCatalogBook {
  if (!isRecord(data)) {
    throw new Error(i18n.t('api.catalog.readAdded'))
  }

  const book = isRecord(data.book) ? data.book : data

  return {
    title: getRequiredText(
      book.title,
      'title',
      i18n.t('addBook.catalog.addedTitle'),
    ),
    author: getRequiredText(
      book.author,
      'author',
      i18n.t('addBook.catalog.addedTitle'),
    ),
  }
}

function getCatalogBookId(catalogBookId: string | number) {
  if (typeof catalogBookId === 'number' && Number.isFinite(catalogBookId)) {
    return String(catalogBookId)
  }

  if (typeof catalogBookId === 'string' && catalogBookId.trim().length > 0) {
    return catalogBookId.trim()
  }

  throw new Error(i18n.t('api.catalog.idRequired'))
}

function getCredentials() {
  const credentials = loadCredentials()

  if (!credentials) {
    throw new Error(i18n.t('api.books.missingCredentials'))
  }

  return credentials
}

export async function searchCatalogBooks(query: string): Promise<CatalogBook[]> {
  const credentials = getCredentials()
  const trimmedQuery = query.trim()

  try {
    const response = await apiClient.get<unknown>('/catalog/books', {
      headers: createBasicAuthHeaders(credentials),
      params: trimmedQuery ? { query: trimmedQuery } : undefined,
    })

    return getCatalogBooksData(response.data).map(toCatalogBook)
  } catch (error) {
    throw toCatalogRequestError(
      error,
      i18n.t('api.catalog.load'),
    )
  }
}

export async function addBookFromCatalog(
  catalogBookId: string | number,
): Promise<CreatedCatalogBook> {
  const credentials = getCredentials()
  const id = getCatalogBookId(catalogBookId)

  try {
    const response = await apiClient.post<unknown>(
      '/book/add/from-catalog',
      undefined,
      {
        headers: createBasicAuthHeaders(credentials),
        params: { id },
      },
    )

    return toCreatedCatalogBook(response.data)
  } catch (error) {
    throw toCatalogRequestError(
      error,
      i18n.t('api.catalog.addFallback'),
    )
  }
}
