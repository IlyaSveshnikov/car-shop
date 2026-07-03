import { Injectable } from '@nestjs/common';
import reviewsJSON from './reviews.json';
import { Review } from './entities/review.entity';

const reviews = reviewsJSON as Review[];

@Injectable()
export class ReviewsService {
  findAll(): Review[] {
    return reviews;
  }
}
