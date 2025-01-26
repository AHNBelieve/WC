import { Module } from '@nestjs/common';
import { DailyDataModule } from './daily-data/daily-data.module';
import { ConfigModule } from '@nestjs/config';
import { WeatherDataModule } from './weather-data/weather-data.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 이 부분이 중요합니다!
      envFilePath: '.env', // .env 파일 경로 지정 (기본값은 .env)
    }),
    DailyDataModule,
    WeatherDataModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }  