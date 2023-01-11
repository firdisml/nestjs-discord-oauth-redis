import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as createRedisStore from 'connect-redis';
import { createClient } from 'redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const RedisStore = createRedisStore(session);
  const RedisClient = createClient({
    url: 'redis://default:V8cbzdWwATNoaepn5YyX@containers-us-west-125.railway.app:5925',
  });
  RedisClient.on('error', (err) => console.log(`Could not connect: ${err}`));
  RedisClient.on('connect', () => console.log(`Connected`));
  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
      },
      store: new RedisStore({ client: RedisClient as any }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
