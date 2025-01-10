import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // 프론트엔드 주소 (Vite 기본 포트)
    credentials: true, // 쿠키 전달 필요시
  });
  // ValidationPipe 추가
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 속성 자동 제거
      forbidNonWhitelisted: true, // 정의되지 않은 속성 전달 시 예외 발생
      transform: true, // 요청 데이터를 DTO 인스턴스로 자동 변환
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
