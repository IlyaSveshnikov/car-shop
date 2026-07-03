import { Injectable } from '@nestjs/common';
import carsJSON from './cars.json';
import { Car } from './entities/car.entity';
import { CarFacets } from './entities/car-facets.entity';
import { CarsPage } from './entities/cars-page.entity';
import { CarFilterInput, CarSort } from './dto/cars.args';

const cars = carsJSON as Car[];

/** Сравнение по названию (марка + модель) с учётом русской локали. */
function compareByName(a: Car, b: Car): number {
  return `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`, 'ru');
}

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, 'ru'));
}

@Injectable()
export class CarsService {
  /** Отфильтрованный, отсортированный и постранично нарезанный список. */
  findAll(
    filter: CarFilterInput = {},
    sort: CarSort = CarSort.AVAILABILITY,
    limit?: number,
    offset = 0,
  ): CarsPage {
    const filtered = this.applyFilter(cars, filter);
    const sorted = this.applySort(filtered, sort);
    const items =
      limit != null ? sorted.slice(offset, offset + limit) : sorted.slice(offset);

    return { items, total: filtered.length };
  }

  findOne(id: number): Car | undefined {
    return cars.find((car) => car.id === id);
  }

  /** Похожие авто той же марки или типа кузова (для страницы автомобиля). */
  findSimilar(id: number, take = 4): Car[] {
    const source = this.findOne(id);
    if (!source) return [];

    return cars
      .filter(
        (car) =>
          car.id !== source.id &&
          (car.brand === source.brand || car.bodyType === source.bodyType),
      )
      .slice(0, take);
  }

  /** Доступные значения фильтров и диапазоны цен/годов. */
  facets(): CarFacets {
    return {
      brands: uniqueSorted(cars.map((car) => car.brand)),
      bodyTypes: uniqueSorted(cars.map((car) => car.bodyType)),
      fuelTypes: uniqueSorted(cars.map((car) => car.fuelType)),
      minPrice: Math.min(...cars.map((car) => car.priceValue)),
      maxPrice: Math.max(...cars.map((car) => car.priceValue)),
      minYear: Math.min(...cars.map((car) => car.model_year)),
      maxYear: Math.max(...cars.map((car) => car.model_year)),
    };
  }

  private applyFilter(list: Car[], filter: CarFilterInput): Car[] {
    const search = filter.search?.trim().toLowerCase();

    return list.filter((car) => {
      if (
        search &&
        !`${car.brand} ${car.model}`.toLowerCase().includes(search)
      ) {
        return false;
      }
      if (filter.brands?.length && !filter.brands.includes(car.brand)) {
        return false;
      }
      if (filter.bodyTypes?.length && !filter.bodyTypes.includes(car.bodyType)) {
        return false;
      }
      if (filter.fuelTypes?.length && !filter.fuelTypes.includes(car.fuelType)) {
        return false;
      }
      if (filter.priceMin != null && car.priceValue < filter.priceMin) {
        return false;
      }
      if (filter.priceMax != null && car.priceValue > filter.priceMax) {
        return false;
      }
      if (filter.yearMin != null && car.model_year < filter.yearMin) {
        return false;
      }
      if (filter.yearMax != null && car.model_year > filter.yearMax) {
        return false;
      }
      if (filter.onlyAvailable && !car.availability) {
        return false;
      }
      return true;
    });
  }

  private applySort(list: Car[], sort: CarSort): Car[] {
    // copy, чтобы не мутировать исходный массив.
    return [...list].sort((a, b) => {
      switch (sort) {
        case CarSort.NAME_ASC:
          return compareByName(a, b);
        case CarSort.NAME_DESC:
          return compareByName(b, a);
        case CarSort.YEAR_DESC:
          return b.model_year - a.model_year;
        case CarSort.YEAR_ASC:
          return a.model_year - b.model_year;
        case CarSort.PRICE_ASC:
          return a.priceValue - b.priceValue;
        case CarSort.PRICE_DESC:
          return b.priceValue - a.priceValue;
        case CarSort.AVAILABILITY:
        default:
          // Сначала авто в наличии, внутри групп — по названию.
          return (
            Number(b.availability) - Number(a.availability) ||
            compareByName(a, b)
          );
      }
    });
  }
}
