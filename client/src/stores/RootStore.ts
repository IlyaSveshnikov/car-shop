import { CarsStore } from "./CarsStore";
import { CartStore } from "./CartStore";
import { FavoritesStore } from "./FavoritesStore";

/** Корневой стор: объединяет и связывает остальные сторы приложения. */
export class RootStore {
  favoritesStore: FavoritesStore;
  cartStore: CartStore;
  carsStore: CarsStore;

  constructor() {
    this.favoritesStore = new FavoritesStore();
    this.cartStore = new CartStore();
    this.carsStore = new CarsStore();
  }
}
