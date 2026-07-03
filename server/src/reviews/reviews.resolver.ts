import { Resolver, Query } from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Query(() => [Review], {
    name: 'reviews',
    description: 'Отзывы клиентов автосалона',
  })
  findAll() {
    return this.reviewsService.findAll();
  }
}
