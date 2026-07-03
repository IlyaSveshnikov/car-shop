import { makeAutoObservable, runInAction } from "mobx";
import { fetchCars, fetchFacets } from "../api/cars";
import { Car, CarFacets, CarFilter, SortMode } from "../types/car";

/** Сколько карточек грузим за одну «страницу» каталога. */
const PAGE_SIZE = 9;

/** Изменяемое состояние фильтров каталога. */
interface FilterState {
  search: string;
  brands: string[];
  bodyTypes: string[];
  fuelTypes: string[];
  priceMin: number | null;
  priceMax: number | null;
  yearMin: number | null;
  yearMax: number | null;
  onlyAvailable: boolean;
}

function emptyFilters(): FilterState {
  return {
    search: "",
    brands: [],
    bodyTypes: [],
    fuelTypes: [],
    priceMin: null,
    priceMax: null,
    yearMin: null,
    yearMax: null,
    onlyAvailable: false,
  };
}

/**
 * Стор каталога. Фильтрация, сортировка и пагинация выполняются на сервере
 * через GraphQL-аргументы; сюда приходит только текущая страница результатов.
 */
export class CarsStore {
  cars: Car[] = [];
  total = 0;
  facets: CarFacets | null = null;

  isLoading = false;
  isLoadingMore = false;
  error: string | null = null;
  initialized = false;

  filters: FilterState = emptyFilters();
  sortMode: SortMode = "availability";

  private searchTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  /** Первичная загрузка: фасеты фильтров + первая страница. Повторно не грузит. */
  async init(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;
    await Promise.all([this.loadFacets(), this.reload()]);
  }

  private async loadFacets(): Promise<void> {
    try {
      const facets = await fetchFacets();
      runInAction(() => {
        this.facets = facets;
      });
    } catch {
      // Панель фильтров переживёт отсутствие фасетов — не критично.
    }
  }

  /** Собирает набор фильтров для сервера, опуская пустые значения. */
  private get serverFilter(): CarFilter {
    const f = this.filters;
    const filter: CarFilter = {};
    if (f.search.trim()) filter.search = f.search.trim();
    if (f.brands.length) filter.brands = f.brands;
    if (f.bodyTypes.length) filter.bodyTypes = f.bodyTypes;
    if (f.fuelTypes.length) filter.fuelTypes = f.fuelTypes;
    if (f.priceMin != null) filter.priceMin = f.priceMin;
    if (f.priceMax != null) filter.priceMax = f.priceMax;
    if (f.yearMin != null) filter.yearMin = f.yearMin;
    if (f.yearMax != null) filter.yearMax = f.yearMax;
    if (f.onlyAvailable) filter.onlyAvailable = true;
    return filter;
  }

  /** Перезагружает каталог с первой страницы (после смены фильтров/сортировки). */
  async reload(): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const page = await fetchCars({
        filter: this.serverFilter,
        sort: this.sortMode,
        limit: PAGE_SIZE,
        offset: 0,
      });
      runInAction(() => {
        this.cars = page.items;
        this.total = page.total;
      });
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof Error ? error.message : "Не удалось загрузить данные";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  /** Догружает следующую страницу и добавляет её к текущим результатам. */
  async loadMore(): Promise<void> {
    if (this.isLoadingMore || !this.hasMore) return;
    this.isLoadingMore = true;
    try {
      const page = await fetchCars({
        filter: this.serverFilter,
        sort: this.sortMode,
        limit: PAGE_SIZE,
        offset: this.cars.length,
      });
      runInAction(() => {
        this.cars.push(...page.items);
        this.total = page.total;
      });
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof Error ? error.message : "Не удалось загрузить данные";
      });
    } finally {
      runInAction(() => {
        this.isLoadingMore = false;
      });
    }
  }

  get hasMore(): boolean {
    return this.cars.length < this.total;
  }

  // --- Сеттеры фильтров: каждый перезагружает первую страницу ---

  setSearch(value: string): void {
    this.filters.search = value;
    // Небольшой дебаунс, чтобы не дёргать сервер на каждый символ.
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => this.reload(), 350);
  }

  toggleInArray(key: "brands" | "bodyTypes" | "fuelTypes", value: string): void {
    const arr = this.filters[key];
    this.filters[key] = arr.includes(value)
      ? arr.filter((v) => v !== value)
      : [...arr, value];
    this.reload();
  }

  setPriceRange(min: number | null, max: number | null): void {
    this.filters.priceMin = min;
    this.filters.priceMax = max;
    this.reload();
  }

  setYearRange(min: number | null, max: number | null): void {
    this.filters.yearMin = min;
    this.filters.yearMax = max;
    this.reload();
  }

  setOnlyAvailable(value: boolean): void {
    this.filters.onlyAvailable = value;
    this.reload();
  }

  setSortMode(mode: SortMode): void {
    this.sortMode = mode;
    this.reload();
  }

  resetFilters(): void {
    this.filters = emptyFilters();
    this.reload();
  }

  /** Сколько групп фильтров активно — для кнопки «Сбросить (N)». */
  get activeFilterCount(): number {
    const f = this.filters;
    let count = 0;
    if (f.search.trim()) count++;
    if (f.brands.length) count++;
    if (f.bodyTypes.length) count++;
    if (f.fuelTypes.length) count++;
    if (f.priceMin != null || f.priceMax != null) count++;
    if (f.yearMin != null || f.yearMax != null) count++;
    if (f.onlyAvailable) count++;
    return count;
  }
}
