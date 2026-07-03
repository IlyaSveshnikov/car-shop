import { Field, Int, ObjectType } from '@nestjs/graphql';

/** Доступные значения фильтров — чтобы фронт строил панель фильтров по данным. */
@ObjectType()
export class CarFacets {
  @Field(() => [String], { description: 'Все марки в каталоге' })
  brands: string[];

  @Field(() => [String], { description: 'Все типы кузова' })
  bodyTypes: string[];

  @Field(() => [String], { description: 'Все типы топлива' })
  fuelTypes: string[];

  @Field(() => Int, { description: 'Минимальная цена в каталоге' })
  minPrice: number;

  @Field(() => Int, { description: 'Максимальная цена в каталоге' })
  maxPrice: number;

  @Field(() => Int, { description: 'Самый ранний год выпуска' })
  minYear: number;

  @Field(() => Int, { description: 'Самый поздний год выпуска' })
  maxYear: number;
}
