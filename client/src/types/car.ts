/** Автомобиль в том виде, в котором его отдаёт GraphQL-сервер. */
export interface Car {
  id: number;
  brand: string;
  model: string;
  color: string;
  model_year: number;
  img_src: string;
  images: string[];
  price: string;
  priceValue: number;
  description: string;
  availability: boolean;
  bodyType: string;
  fuelType: string;
  transmission: string;
  engineVolume: number;
  power: number;
  drivetrain: string;
  condition: string;
  mileage: number;
  features: string[];
}

/** Отзыв клиента (для главной страницы). */
export interface Review {
  id: number;
  author: string;
  city: string;
  car: string;
  rating: number;
  date: string;
  text: string;
}

/** Доступные значения фильтров и диапазоны — приходят с сервера. */
export interface CarFacets {
  brands: string[];
  bodyTypes: string[];
  fuelTypes: string[];
  minPrice: number;
  maxPrice: number;
  minYear: number;
  maxYear: number;
}

/** Страница каталога: срез автомобилей и общее число под фильтр. */
export interface CarsPage {
  items: Car[];
  total: number;
}

/** Набор фильтров, отправляемых на сервер. */
export interface CarFilter {
  search?: string;
  brands?: string[];
  bodyTypes?: string[];
  fuelTypes?: string[];
  priceMin?: number;
  priceMax?: number;
  yearMin?: number;
  yearMax?: number;
  onlyAvailable?: boolean;
}

/** Варианты сортировки списка (совпадают с пунктами выпадающего списка). */
export type SortMode =
  | "availability"
  | "name_asc"
  | "name_desc"
  | "year_desc"
  | "year_asc"
  | "price_asc"
  | "price_desc";
