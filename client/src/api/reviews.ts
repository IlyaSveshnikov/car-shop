import { Review } from "../types/car";
import { graphqlRequest } from "./client";

/** Загружает отзывы клиентов для главной страницы. */
export async function fetchReviews(): Promise<Review[]> {
  const data = await graphqlRequest<{ reviews: Review[] }>(
    `query Reviews {
      reviews { id author city car rating date text }
    }`
  );
  return data.reviews;
}
