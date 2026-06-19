function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export function isOwnedBooksPayload(data: unknown) {
  if (Array.isArray(data)) {
    return true
  }

  return isRecord(data) && (Array.isArray(data.books) || data.books === null)
}
