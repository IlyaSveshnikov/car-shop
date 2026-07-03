import { CarsService } from './cars.service';
import { CarSort } from './dto/cars.args';

describe('CarsService', () => {
  const service = new CarsService();

  it('фильтрует по марке', () => {
    const { items, total } = service.findAll({ brands: ['BMW'] });
    expect(total).toBeGreaterThan(0);
    expect(items.every((car) => car.brand === 'BMW')).toBe(true);
  });

  it('фильтрует по диапазону цены', () => {
    const { items } = service.findAll({ priceMin: 60000, priceMax: 90000 });
    expect(items.every((car) => car.priceValue >= 60000 && car.priceValue <= 90000)).toBe(
      true,
    );
  });

  it('оставляет только авто в наличии', () => {
    const { items } = service.findAll({ onlyAvailable: true });
    expect(items.every((car) => car.availability)).toBe(true);
  });

  it('сортирует по цене по возрастанию', () => {
    const { items } = service.findAll({}, CarSort.PRICE_ASC);
    const prices = items.map((car) => car.priceValue);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  it('соблюдает limit и offset', () => {
    const page1 = service.findAll({}, CarSort.NAME_ASC, 3, 0);
    const page2 = service.findAll({}, CarSort.NAME_ASC, 3, 3);
    expect(page1.items).toHaveLength(3);
    expect(page1.items[0].id).not.toBe(page2.items[0].id);
    expect(page1.total).toBe(page2.total);
  });

  it('находит похожие авто той же марки или кузова', () => {
    const similar = service.findSimilar(1);
    expect(similar.length).toBeGreaterThan(0);
    expect(similar.every((car) => car.id !== 1)).toBe(true);
  });

  it('возвращает фасеты с корректными диапазонами', () => {
    const facets = service.facets();
    expect(facets.brands.length).toBeGreaterThan(0);
    expect(facets.maxPrice).toBeGreaterThan(facets.minPrice);
  });
});
