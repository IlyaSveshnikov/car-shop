import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Car {
  @Field(() => Int, { description: 'Уникальный id автомобиля' })
  id: number;

  @Field(() => String, { description: 'Марка автомобиля' })
  brand: string;

  @Field(() => String, { description: 'Модель автомобиля' })
  model: string;

  @Field(() => String, { description: 'Цвет автомобиля' })
  color: string;

  @Field(() => Int, { description: 'Год выпуска модели автомобиля' })
  model_year: number;

  @Field(() => String, { description: 'Главное фото автомобиля' })
  img_src: string;

  @Field(() => [String], { description: 'Галерея фотографий автомобиля' })
  images: string[];

  @Field(() => String, { description: 'Цена автомобиля (отформатированная строка)' })
  price: string;

  @Field(() => Int, { description: 'Цена автомобиля числом (для фильтров и сортировки)' })
  priceValue: number;

  @Field(() => String, { description: 'Краткое описание автомобиля' })
  description: string;

  @Field(() => Boolean, { description: 'Наличие автомобиля' })
  availability: boolean;

  @Field(() => String, { description: 'Тип кузова' })
  bodyType: string;

  @Field(() => String, { description: 'Тип топлива' })
  fuelType: string;

  @Field(() => String, { description: 'Коробка передач' })
  transmission: string;

  @Field(() => Float, { description: 'Объём двигателя, л' })
  engineVolume: number;

  @Field(() => Int, { description: 'Мощность двигателя, л.с.' })
  power: number;

  @Field(() => String, { description: 'Тип привода' })
  drivetrain: string;

  @Field(() => String, { description: 'Состояние: новый или с пробегом' })
  condition: string;

  @Field(() => Int, { description: 'Пробег, км (0 для новых)' })
  mileage: number;

  @Field(() => [String], { description: 'Комплектация и опции' })
  features: string[];
}
