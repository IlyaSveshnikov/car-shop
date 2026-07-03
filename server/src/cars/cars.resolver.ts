import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { CarsService } from './cars.service';
import { Car } from './entities/car.entity';
import { CarsPage } from './entities/cars-page.entity';
import { CarFacets } from './entities/car-facets.entity';
import { CarFilterInput, CarSort } from './dto/cars.args';

@Resolver(() => Car)
export class CarsResolver {
  constructor(private readonly carsService: CarsService) {}

  @Query(() => CarsPage, {
    name: 'cars',
    description: 'Каталог автомобилей с фильтрами, сортировкой и пагинацией',
  })
  findAll(
    @Args('filter', { type: () => CarFilterInput, nullable: true })
    filter?: CarFilterInput,
    @Args('sort', { type: () => CarSort, nullable: true })
    sort?: CarSort,
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
    @Args('offset', { type: () => Int, nullable: true }) offset?: number,
  ): CarsPage {
    return this.carsService.findAll(filter, sort, limit, offset);
  }

  @Query(() => Car, {
    name: 'car',
    nullable: true,
    description: 'Получить автомобиль по id',
  })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.carsService.findOne(id);
  }

  @Query(() => [Car], {
    name: 'similarCars',
    description: 'Похожие автомобили для страницы автомобиля',
  })
  findSimilar(@Args('id', { type: () => Int }) id: number) {
    return this.carsService.findSimilar(id);
  }

  @Query(() => CarFacets, {
    name: 'carFacets',
    description: 'Доступные значения фильтров каталога',
  })
  facets() {
    return this.carsService.facets();
  }
}
