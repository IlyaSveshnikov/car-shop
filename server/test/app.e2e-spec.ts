import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('GraphQL API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('возвращает страницу каталога с фильтром и пагинацией', () => {
    return request(app.getHttpServer())
      .post('/api')
      .send({
        query: `query Cars($filter: CarFilterInput, $limit: Int) {
          cars(filter: $filter, limit: $limit) { total items { id brand } }
        }`,
        variables: { filter: { brands: ['BMW'] }, limit: 2 },
      })
      .expect(200)
      .expect((res) => {
        const { total, items } = res.body.data.cars;
        expect(total).toBeGreaterThan(0);
        expect(items.length).toBeLessThanOrEqual(2);
        expect(
          items.every((car: { brand: string }) => car.brand === 'BMW'),
        ).toBe(true);
      });
  });

  it('возвращает автомобиль по id', () => {
    return request(app.getHttpServer())
      .post('/api')
      .send({ query: '{ car(id: 1) { id brand model priceValue } }' })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.car.id).toBe(1);
        expect(res.body.data.car.priceValue).toBeGreaterThan(0);
      });
  });

  it('отдаёт доступные значения фильтров', () => {
    return request(app.getHttpServer())
      .post('/api')
      .send({ query: '{ carFacets { brands bodyTypes minPrice maxPrice } }' })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.carFacets.brands.length).toBeGreaterThan(0);
        expect(res.body.data.carFacets.maxPrice).toBeGreaterThan(
          res.body.data.carFacets.minPrice,
        );
      });
  });
});
