/** Форматирует число как цену: 54333 → "$54 333". */
export function formatMoney(value: number): string {
  return `$${value.toLocaleString("ru-RU")}`;
}

/** Цена с приставкой «от» для карточек каталога: 54333 → "от $54 333". */
export function formatPriceFrom(value: number): string {
  return `от ${formatMoney(value)}`;
}

/** Пробег: 0 → "новый", иначе "15 000 км". */
export function formatMileage(mileage: number): string {
  return mileage > 0 ? `${mileage.toLocaleString("ru-RU")} км` : "новый";
}

/** Склонение слова «позиция» по числу: 1 позиция, 2 позиции, 5 позиций. */
export function pluralizePositions(count: number): string {
  return pluralize(count, "позиция", "позиции", "позиций");
}

/** Склонение слова «автомобиль» по числу. */
export function pluralizeCars(count: number): string {
  return pluralize(count, "автомобиль", "автомобиля", "автомобилей");
}

/** Универсальное русское склонение по числу. */
export function pluralize(
  count: number,
  one: string,
  few: string,
  many: string
): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}
