import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';

/** Режимы сортировки каталога — совпадают с выпадающим списком на фронте. */
export enum CarSort {
  AVAILABILITY = 'availability',
  NAME_ASC = 'name_asc',
  NAME_DESC = 'name_desc',
  YEAR_DESC = 'year_desc',
  YEAR_ASC = 'year_asc',
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
}

registerEnumType(CarSort, {
  name: 'CarSort',
  description: 'Режим сортировки списка автомобилей',
});

/** Набор фильтров каталога. Все поля необязательны — пустой фильтр возвращает всё. */
@InputType()
export class CarFilterInput {
  @Field(() => String, { nullable: true, description: 'Поиск по марке и модели' })
  search?: string;

  @Field(() => [String], { nullable: true, description: 'Марки' })
  brands?: string[];

  @Field(() => [String], { nullable: true, description: 'Типы кузова' })
  bodyTypes?: string[];

  @Field(() => [String], { nullable: true, description: 'Типы топлива' })
  fuelTypes?: string[];

  @Field(() => Int, { nullable: true, description: 'Минимальная цена' })
  priceMin?: number;

  @Field(() => Int, { nullable: true, description: 'Максимальная цена' })
  priceMax?: number;

  @Field(() => Int, { nullable: true, description: 'Минимальный год выпуска' })
  yearMin?: number;

  @Field(() => Int, { nullable: true, description: 'Максимальный год выпуска' })
  yearMax?: number;

  @Field(() => Boolean, { nullable: true, description: 'Только автомобили в наличии' })
  onlyAvailable?: boolean;
}
