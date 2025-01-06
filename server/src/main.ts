import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // 프론트엔드 주소 (Vite 기본 포트)
    credentials: true, // 쿠키 전달 필요시
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
