import { Controller, Get, Query } from '@nestjs/common';
import { WeatherDataService } from './weather-data.service';

@Controller('weatherData')
export class WeatherDataController {
  constructor(private readonly weatherDataService: WeatherDataService) {}
  @Get()
  async getWeatherData(@Query('lat') lat: number, @Query('lon') lon: number) {
    return await this.weatherDataService.getWeatherData(lat, lon);
  }
  @Get('forecast')
  async getForecastData(@Query('lat') lat: number, @Query('lon') lon: number) {
    return await this.weatherDataService.getForecastData(lat, lon);
  }
}
