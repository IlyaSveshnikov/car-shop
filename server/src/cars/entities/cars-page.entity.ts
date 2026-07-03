import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Car } from './car.entity';

/** Страница каталога: срез автомобилей и общее число подходящих под фильтр. */
@ObjectType()
export class CarsPage {
  @Field(() => [Car], { description: 'Автомобили на текущей странице' })
  items: Car[];

  @Field(() => Int, { description: 'Всего автомобилей, подходящих под фильтр' })
  total: number;
}
