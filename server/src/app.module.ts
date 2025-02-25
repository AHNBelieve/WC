import { Module } from '@nestjs/common';
import { DailyDataModule } from './daily-data/daily-data.module';
import { ConfigModule } from '@nestjs/config';
import { WeatherDataModule } from './weather-data/weather-data.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전역 사용 가능하게 설정
      ignoreEnvFile: process.env.NODE_ENV === 'production', // 프로덕션(Vercel)에서는 .env 무시
      envFilePath: process.env.NODE_ENV !== 'production' ? '.env' : undefined, // 개발 환경에서만 .env 사용
    }),
    DailyDataModule,
    WeatherDataModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
