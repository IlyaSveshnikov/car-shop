# 🚗 AutoHub — интернет-магазин автомобилей

**Живое демо → [autohub-1jyg.onrender.com](https://autohub-1jyg.onrender.com)**
_Первый заход после простоя грузится ~30 с — бесплатный тариф Render «засыпает»._

[![CI](https://github.com/IlyaSveshnikov/car-shop/actions/workflows/ci.yml/badge.svg)](https://github.com/IlyaSveshnikov/car-shop/actions/workflows/ci.yml)
![React](https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?logo=graphql&logoColor=white)

Fullstack-магазин автомобилей. Начинал как тестовое задание — каталог на одном экране —
и вырос в полноценный магазин: лендинг, каталог с фильтрами, страницы авто, избранное,
корзина и оформление заказа.

## Скриншоты

![Главная](docs/home.png)
![Каталог](docs/catalog.png)
![Страница авто](docs/car.png)

## Что внутри

- **Лендинг** — hero, блок доверия, подборка популярных моделей, отзывы.
- **Каталог** — серверная фильтрация (марка, кузов, топливо, цена, год), сортировка и пагинация «показать ещё».
- **Страница авто** — галерея, характеристики, комплектация, похожие модели.
- **Покупка** — избранное и корзина с персистом в `localStorage`, оформление с валидацией и подтверждением.
- **Мелочи, которые важны** — адаптив с бургер-меню, скелетоны загрузки, пустые/ошибочные состояния, `ErrorBoundary`, a11y.

## Стек

**Фронт:** React 18 · TypeScript · Vite · MobX · Emotion · React Router
**Бэк:** NestJS · GraphQL (Apollo, code-first). Данные — статический JSON, чтобы всё запускалось одной командой.
**Тесты:** Vitest + RTL на фронте, Jest + Supertest на бэке.

Фильтрация, сортировка и пагинация считаются на сервере через GraphQL-аргументы; клиент
держит состояние в MobX-сторах, сеть изолирована в отдельном слое. В проде один
NestJS-сервер отдаёт и API, и собранный клиент — один URL, без CORS.

## Запуск локально

Нужен Node.js 16+.

```bash
# сервер → http://localhost:4000/api
cd server && npm install && cp .env.example .env && npm run start:dev

# клиент (в другом терминале) → http://localhost:3000
cd client && npm install && npm start
```

Vite проксирует `/api` и `/static` на сервер, так что CORS не нужен.

## Тесты

```bash
cd client && npm test    # 23 теста (Vitest + RTL): сторы и утилиты
cd server && npm test     # unit + e2e (Jest + Supertest)
```

CI (GitHub Actions) на каждый push и PR прогоняет typecheck, тесты и сборку обоих пакетов.

## GraphQL — коротко

`cars(filter, sort, limit, offset)` · `car(id)` · `similarCars(id)` · `carFacets` · `reviews`

```graphql
query {
  cars(filter: { brands: ["BMW"], onlyAvailable: true }, sort: PRICE_DESC, limit: 6) {
    total
    items { id brand model priceValue bodyType }
  }
}
```

## Что дальше

Реальная БД (Postgres + Prisma) · авторизация · URL-фильтры каталога · тёмная тема ·
сравнение авто · кредитный калькулятор.

## Лицензия

MIT
