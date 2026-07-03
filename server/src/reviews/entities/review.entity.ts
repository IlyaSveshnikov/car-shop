import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Review {
  @Field(() => Int, { description: 'Уникальный id отзыва' })
  id: number;

  @Field(() => String, { description: 'Имя автора отзыва' })
  author: string;

  @Field(() => String, { description: 'Город автора' })
  city: string;

  @Field(() => String, { description: 'Купленный автомобиль' })
  car: string;

  @Field(() => Int, { description: 'Оценка от 1 до 5' })
  rating: number;

  @Field(() => String, { description: 'Дата отзыва (ISO)' })
  date: string;

  @Field(() => String, { description: 'Текст отзыва' })
  text: string;
}
