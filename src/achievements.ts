export type AchievementId = 'first-book-added'

const ACHIEVEMENT_STORAGE_PREFIX = 'book-exchange-achievements'

function getStorageKey(userEmail: string | null | undefined) {
  const normalizedEmail = userEmail?.trim().toLowerCase()

  return normalizedEmail
    ? `${ACHIEVEMENT_STORAGE_PREFIX}:${normalizedEmail}`
    : null
}

function getStoredAchievementIds(storageKey: string) {
  try {
    const savedValue = window.localStorage.getItem(storageKey)

    if (!savedValue) {
      return []
    }

    const parsedValue: unknown = JSON.parse(savedValue)

    return Array.isArray(parsedValue)
      ? parsedValue.filter((id): id is AchievementId => id === 'first-book-added')
      : []
  } catch {
    return []
  }
}

export function markAchievementShownOnce(
  userEmail: string | null | undefined,
  achievementId: AchievementId,
) {
  const storageKey = getStorageKey(userEmail)

  if (!storageKey) {
    return false
  }

  const achievementIds = new Set(getStoredAchievementIds(storageKey))

  if (achievementIds.has(achievementId)) {
    return false
  }

  achievementIds.add(achievementId)

  try {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify([...achievementIds]),
    )
  } catch {
    return false
  }

  return true
}
