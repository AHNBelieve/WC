import { Module } from '@nestjs/common';
import { DailyDataModule } from './daily-data/daily-data.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 이 부분이 중요합니다!
      envFilePath: '.env', // .env 파일 경로 지정 (기본값은 .env)
    }),
    DailyDataModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
