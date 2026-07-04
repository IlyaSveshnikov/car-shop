import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { existsSync } from 'fs';
import { join } from 'path';
import type { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Фотографии автомобилей.
  app.useStaticAssets(join(__dirname, '..', 'static'), {
    prefix: '/static/',
  });

  // В продакшене тот же сервер отдаёт собранный фронтенд (single-service деплой):
  // один URL, без CORS. В разработке клиент поднимается отдельно через Vite.
  const clientDist = join(__dirname, '..', '..', 'client', 'dist');
  if (existsSync(clientDist)) {
    app.useStaticAssets(clientDist);
    // SPA-фолбэк: любой не-API и не-файловый GET-маршрут отдаёт index.html,
    // чтобы клиентская маршрутизация работала при прямом заходе/перезагрузке.
    app.use((req: Request, res: Response, next: NextFunction) => {
      if (
        req.method === 'GET' &&
        !req.path.startsWith('/api') &&
        !req.path.startsWith('/static') &&
        !req.path.includes('.')
      ) {
        res.sendFile(join(clientDist, 'index.html'));
      } else {
        next();
      }
    });
  }

  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();
