import { makeAutoObservable, reaction, toJS } from "mobx";
import { Car } from "../types/car";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const STORAGE_KEY = "cart";

/** Позиция корзины: снимок автомобиля и его количество. */
export interface CartItem {
  car: Car;
  qty: number;
}

/**
 * Стор корзины. Хранит снимки автомобилей и количество, переживает перезагрузку
 * через localStorage. Заказы обрабатываются на клиенте (демо-магазин без оплаты).
 */
export class CartStore {
  private items = new Map<number, CartItem>();

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    loadFromStorage<CartItem[]>(STORAGE_KEY, []).forEach((item) =>
      this.items.set(item.car.id, item)
    );

    reaction(
      () => this.list.map((item) => toJS(item)),
      (items) => saveToStorage(STORAGE_KEY, items)
    );
  }

  has(carId: number): boolean {
    return this.items.has(carId);
  }

  /** Добавляет автомобиль в корзину (или увеличивает количество). */
  add(car: Car, qty = 1): void {
    const existing = this.items.get(car.id);
    if (existing) {
      existing.qty += qty;
    } else {
      this.items.set(car.id, { car, qty });
    }
  }

  setQty(carId: number, qty: number): void {
    const item = this.items.get(carId);
    if (!item) return;
    if (qty <= 0) {
      this.items.delete(carId);
    } else {
      item.qty = qty;
    }
  }

  remove(carId: number): void {
    this.items.delete(carId);
  }

  clear(): void {
    this.items.clear();
  }

  get list(): CartItem[] {
    return Array.from(this.items.values());
  }

  /** Общее количество единиц товара (для бейджа в шапке). */
  get count(): number {
    return this.list.reduce((sum, item) => sum + item.qty, 0);
  }

  /** Итоговая стоимость корзины. */
  get totalPrice(): number {
    return this.list.reduce(
      (sum, item) => sum + item.car.priceValue * item.qty,
      0
    );
  }

  get isEmpty(): boolean {
    return this.items.size === 0;
  }
}
