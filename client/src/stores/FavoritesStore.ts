import { makeAutoObservable, reaction, toJS } from "mobx";
import { Car } from "../types/car";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const STORAGE_KEY = "favorites";

/**
 * Стор «Избранного». Хранит полные снимки выбранных автомобилей (а не только id),
 * чтобы страница избранного рендерилась независимо от загруженного каталога.
 * Переживает перезагрузку за счёт синхронизации с localStorage.
 */
export class FavoritesStore {
  private items = new Map<number, Car>();

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    loadFromStorage<Car[]>(STORAGE_KEY, []).forEach((car) =>
      this.items.set(car.id, car)
    );

    reaction(
      () => this.list.map((car) => toJS(car)),
      (cars) => saveToStorage(STORAGE_KEY, cars)
    );
  }

  isFavorite(carId: number): boolean {
    return this.items.has(carId);
  }

  /** Добавляет автомобиль в избранное или убирает его, если он уже там. */
  toggle(car: Car): void {
    if (this.items.has(car.id)) {
      this.items.delete(car.id);
    } else {
      this.items.set(car.id, car);
    }
  }

  remove(carId: number): void {
    this.items.delete(carId);
  }

  get list(): Car[] {
    return Array.from(this.items.values());
  }

  get count(): number {
    return this.items.size;
  }
}
