import { describe, it, expect, beforeEach, vi } from "vitest";
import { makeCar } from "../test/fixtures";

// Мокаем сетевой слой — стор тестируем изолированно от сервера.
vi.mock("../api/cars", () => ({
  fetchCars: vi.fn(),
  fetchFacets: vi.fn(),
}));

import { fetchCars, fetchFacets, FetchCarsParams } from "../api/cars";
import { CarsStore } from "./CarsStore";

const facets = {
  brands: ["BMW", "Volvo"],
  bodyTypes: ["Седан", "Внедорожник"],
  fuelTypes: ["Бензин", "Дизель"],
  minPrice: 50000,
  maxPrice: 225987,
  minYear: 2017,
  maxYear: 2022,
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(fetchFacets).mockResolvedValue(facets);
  vi.mocked(fetchCars).mockImplementation(async (params: FetchCarsParams = {}) => {
    const { offset = 0, limit = 9 } = params;
    const items = Array.from({ length: limit }, (_, i) =>
      makeCar({ id: offset + i + 1 })
    );
    return { items, total: 18 };
  });
});

describe("CarsStore", () => {
  it("init загружает фасеты и первую страницу", async () => {
    const store = new CarsStore();
    await store.init();

    expect(fetchFacets).toHaveBeenCalledTimes(1);
    expect(store.facets).toEqual(facets);
    expect(store.cars).toHaveLength(9);
    expect(store.total).toBe(18);
    expect(store.hasMore).toBe(true);
  });

  it("init повторно не грузит", async () => {
    const store = new CarsStore();
    await store.init();
    await store.init();
    expect(fetchFacets).toHaveBeenCalledTimes(1);
  });

  it("фильтр по марке уходит на сервер и сбрасывает страницу", async () => {
    const store = new CarsStore();
    await store.init();

    store.toggleInArray("brands", "BMW");
    await vi.waitFor(() =>
      expect(vi.mocked(fetchCars).mock.calls.length).toBeGreaterThan(1)
    );

    const lastCall = vi.mocked(fetchCars).mock.calls.at(-1)![0];
    expect(lastCall?.filter?.brands).toEqual(["BMW"]);
    expect(lastCall?.offset).toBe(0);
    expect(store.activeFilterCount).toBe(1);
  });

  it("loadMore догружает следующую страницу и добавляет к списку", async () => {
    const store = new CarsStore();
    await store.init();
    expect(store.cars).toHaveLength(9);

    await store.loadMore();
    expect(store.cars).toHaveLength(18);
    expect(store.hasMore).toBe(false);

    const lastCall = vi.mocked(fetchCars).mock.calls.at(-1)![0];
    expect(lastCall?.offset).toBe(9);
  });

  it("resetFilters очищает активные фильтры", async () => {
    const store = new CarsStore();
    await store.init();
    store.setOnlyAvailable(true);
    store.toggleInArray("fuelTypes", "Дизель");
    expect(store.activeFilterCount).toBe(2);

    store.resetFilters();
    expect(store.activeFilterCount).toBe(0);
  });
});
