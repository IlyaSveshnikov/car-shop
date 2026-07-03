import { Car, CarFacets, CarFilter, CarsPage, SortMode } from "../types/car";
import { graphqlRequest } from "./client";

/** Поля автомобиля, запрашиваемые для карточек и списков. */
const CAR_FIELDS = `
  id
  brand
  model
  color
  model_year
  img_src
  images
  price
  priceValue
  description
  availability
  bodyType
  fuelType
  transmission
  engineVolume
  power
  drivetrain
  condition
  mileage
  features
`;

export interface FetchCarsParams {
  filter?: CarFilter;
  sort?: SortMode;
  limit?: number;
  offset?: number;
}

/** GraphQL-enum CarSort ждёт имена ключей (PRICE_DESC), а не значения. */
function toSortEnum(sort?: SortMode): string | undefined {
  return sort?.toUpperCase();
}

/** Загружает страницу каталога с учётом фильтров, сортировки и пагинации. */
export async function fetchCars(params: FetchCarsParams = {}): Promise<CarsPage> {
  const data = await graphqlRequest<{ cars: CarsPage }>(
    `query Cars($filter: CarFilterInput, $sort: CarSort, $limit: Int, $offset: Int) {
      cars(filter: $filter, sort: $sort, limit: $limit, offset: $offset) {
        total
        items { ${CAR_FIELDS} }
      }
    }`,
    {
      filter: params.filter,
      sort: toSortEnum(params.sort),
      limit: params.limit,
      offset: params.offset,
    }
  );
  return data.cars;
}

/** Загружает один автомобиль по id. */
export async function fetchCar(id: number): Promise<Car | null> {
  const data = await graphqlRequest<{ car: Car | null }>(
    `query Car($id: Int!) {
      car(id: $id) { ${CAR_FIELDS} }
    }`,
    { id }
  );
  return data.car;
}

/** Похожие автомобили для страницы автомобиля. */
export async function fetchSimilarCars(id: number): Promise<Car[]> {
  const data = await graphqlRequest<{ similarCars: Car[] }>(
    `query SimilarCars($id: Int!) {
      similarCars(id: $id) { ${CAR_FIELDS} }
    }`,
    { id }
  );
  return data.similarCars;
}

/** Доступные значения фильтров и диапазоны для панели фильтров. */
export async function fetchFacets(): Promise<CarFacets> {
  const data = await graphqlRequest<{ carFacets: CarFacets }>(
    `query CarFacets {
      carFacets { brands bodyTypes fuelTypes minPrice maxPrice minYear maxYear }
    }`
  );
  return data.carFacets;
}
