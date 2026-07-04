import { Car } from "../types/car";

/** Фабрика тестового автомобиля с разумными значениями по умолчанию. */
export function makeCar(overrides: Partial<Car> = {}): Car {
  return {
    id: 1,
    brand: "Volvo",
    model: "XC90",
    color: "Белый",
    model_year: 2022,
    img_src: "/static/images/volvo_xc90.png",
    images: ["/static/images/volvo_xc90.png"],
    price: "$54333",
    priceValue: 54333,
    description: "Тестовый автомобиль",
    availability: true,
    bodyType: "Внедорожник",
    fuelType: "Бензин",
    transmission: "Автомат",
    engineVolume: 2,
    power: 249,
    drivetrain: "Полный",
    condition: "Новый",
    mileage: 0,
    features: ["Климат-контроль"],
    ...overrides,
  };
}
