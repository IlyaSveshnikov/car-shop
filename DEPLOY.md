# Деплой AutoHub

Проект деплоится **одним сервисом**: NestJS отдаёт и GraphQL API (`/api`), и собранный
React-клиент (SPA + статика). Один URL, без CORS, картинки работают как есть.

Как это устроено: при старте [server/src/main.ts](server/src/main.ts) отдаёт `client/dist`
как статику и добавляет SPA-фолбэк (любой не-API GET-маршрут → `index.html`). Сборкой обоих
пакетов управляет корневой [package.json](package.json):

```bash
npm run build   # собирает клиент и сервер
npm start       # node server/dist/main.js — отдаёт API и фронтенд
```

Локально проверить прод-режим: `npm run build && PORT=4000 npm start`, открыть http://localhost:4000.

---

## Вариант 1. Render (проще всего, one-click)

1. Запушьте репозиторий на GitHub (см. раздел «GitHub» ниже).
2. Зайдите на [render.com](https://render.com) → **New** → **Blueprint**.
3. Подключите репозиторий — Render прочитает [render.yaml](render.yaml) и создаст web-сервис:
   - Build: `npm run build`
   - Start: `npm start`
   - `PORT` Render подставляет автоматически.
4. Нажмите **Apply** и дождитесь сборки. Получите публичный URL вида
   `https://autohub.onrender.com`.

> Бесплатный тариф Render «засыпает» после ~15 минут простоя — первый запрос после сна
> грузится ~30–50 с. Для портфолио это нормально; кому важно без «холодного старта» —
> платный тариф или Railway.

Без Blueprint можно вручную: **New → Web Service**, Runtime `Node`, Build `npm run build`,
Start `npm start`.

## Вариант 2. Railway / Fly / любой Docker-хостинг

В корне есть [Dockerfile](Dockerfile) (multi-stage: сборка клиента → сборка сервера →
лёгкий рантайм).

- **Railway:** New Project → Deploy from GitHub repo → Railway сам увидит `Dockerfile`.
  Переменную `PORT` Railway задаёт сам; сервер её читает.
- **Локальная проверка образа:**
  ```bash
  docker build -t autohub .
  docker run -p 4000:4000 autohub
  # открыть http://localhost:4000
  ```

---

## Публикация на GitHub

Репозиторий уже инициализирован локально. Создайте пустой репозиторий на GitHub и:

```bash
git add -A
git commit -m "feat: deploy setup (single-service, render.yaml, Dockerfile)"
git branch -M main
git remote add origin https://github.com/<ваш-логин>/autohub.git
git push -u origin main
```

Отчёт по практике и PDF в репозиторий не попадут — они в [.gitignore](.gitignore).

## Чек-лист после деплоя

- [ ] Главная открывается, hero-фото и подборка грузятся.
- [ ] Прямой заход на `/catalog` и `/cars/1` работает (SPA-фолбэк), фильтры отдаёт сервер.
- [ ] Фото автомобилей видны (идут с `/static/...` того же домена).
- [ ] Оформление заказа доходит до экрана подтверждения.
- [ ] Ссылку на демо добавить в [README.md](README.md) и в шапку GitHub-репозитория.
