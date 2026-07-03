/** Читает и парсит значение из localStorage, возвращая fallback при любой ошибке. */
export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

/** Сохраняет значение в localStorage, молча игнорируя ошибки (приватный режим и т.п.). */
export function saveToStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}
