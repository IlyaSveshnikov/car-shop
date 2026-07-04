import { describe, it, expect, beforeEach } from "vitest";
import { FavoritesStore } from "./FavoritesStore";
import { makeCar } from "../test/fixtures";

describe("FavoritesStore", () => {
  beforeEach(() => localStorage.clear());

  it("добавляет и убирает по toggle", () => {
    const store = new FavoritesStore();
    const car = makeCar({ id: 1 });

    store.toggle(car);
    expect(store.isFavorite(1)).toBe(true);
    expect(store.count).toBe(1);
    expect(store.list).toHaveLength(1);

    store.toggle(car);
    expect(store.isFavorite(1)).toBe(false);
    expect(store.count).toBe(0);
  });

  it("remove убирает конкретное авто", () => {
    const store = new FavoritesStore();
    store.toggle(makeCar({ id: 1 }));
    store.toggle(makeCar({ id: 2 }));
    store.remove(1);
    expect(store.isFavorite(1)).toBe(false);
    expect(store.isFavorite(2)).toBe(true);
  });

  it("переживает пересоздание через localStorage", () => {
    const store = new FavoritesStore();
    store.toggle(makeCar({ id: 5, brand: "BMW" }));

    const restored = new FavoritesStore();
    expect(restored.count).toBe(1);
    expect(restored.isFavorite(5)).toBe(true);
    expect(restored.list[0].brand).toBe("BMW");
  });

  it("игнорирует устаревший формат (массив id) без падения", () => {
    // Старая версия хранила избранное как массив чисел — такие данные не должны ломать стор.
    localStorage.setItem("favorites", JSON.stringify([1, 2, 3]));
    const store = new FavoritesStore();
    expect(store.count).toBe(0);
    expect(store.list).toHaveLength(0);
  });

  it("отбрасывает битые записи, сохраняя валидные", () => {
    localStorage.setItem(
      "favorites",
      JSON.stringify([makeCar({ id: 9 }), 42, null, { foo: "bar" }])
    );
    const store = new FavoritesStore();
    expect(store.count).toBe(1);
    expect(store.isFavorite(9)).toBe(true);
  });
});
