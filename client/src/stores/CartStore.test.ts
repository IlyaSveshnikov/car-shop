import { describe, it, expect, beforeEach } from "vitest";
import { CartStore } from "./CartStore";
import { makeCar } from "../test/fixtures";

describe("CartStore", () => {
  let cart: CartStore;

  beforeEach(() => {
    localStorage.clear();
    cart = new CartStore();
  });

  it("начинается пустым", () => {
    expect(cart.isEmpty).toBe(true);
    expect(cart.count).toBe(0);
    expect(cart.totalPrice).toBe(0);
  });

  it("добавляет авто и считает сумму", () => {
    cart.add(makeCar({ id: 1, priceValue: 54333 }));
    expect(cart.has(1)).toBe(true);
    expect(cart.count).toBe(1);
    expect(cart.totalPrice).toBe(54333);
  });

  it("повторное добавление увеличивает количество", () => {
    const car = makeCar({ id: 1, priceValue: 50000 });
    cart.add(car);
    cart.add(car);
    expect(cart.count).toBe(2);
    expect(cart.totalPrice).toBe(100000);
  });

  it("setQty(0) удаляет позицию", () => {
    cart.add(makeCar({ id: 1 }));
    cart.setQty(1, 0);
    expect(cart.has(1)).toBe(false);
    expect(cart.isEmpty).toBe(true);
  });

  it("суммирует несколько разных авто", () => {
    cart.add(makeCar({ id: 1, priceValue: 54333 }));
    cart.add(makeCar({ id: 2, priceValue: 100000 }));
    expect(cart.count).toBe(2);
    expect(cart.totalPrice).toBe(154333);
  });

  it("clear() очищает корзину", () => {
    cart.add(makeCar({ id: 1 }));
    cart.clear();
    expect(cart.isEmpty).toBe(true);
  });

  it("переживает пересоздание через localStorage", () => {
    cart.add(makeCar({ id: 7, priceValue: 80000 }));
    cart.add(makeCar({ id: 7, priceValue: 80000 }));

    const restored = new CartStore();
    expect(restored.count).toBe(2);
    expect(restored.totalPrice).toBe(160000);
    expect(restored.has(7)).toBe(true);
  });
});
