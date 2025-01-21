import { Module } from '@nestjs/common';
import { WeatherDataController } from './weather-data.controller';
import { WeatherDataService } from './weather-data.service';

@Module({
  controllers: [WeatherDataController],
  providers: [WeatherDataService]
})
export class WeatherDataModule {}
