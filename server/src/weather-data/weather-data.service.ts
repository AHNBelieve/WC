import { Injectable, Query } from '@nestjs/common';
import { WeathersResponse } from './dto/weather-data.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherDataService {
  constructor(private configService: ConfigService) {}

  async getWeatherData(@Query('lat') lat: number, @Query('lon') lon: number) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.configService.get<string>(
          'WEATHER_API_KEY',
        )}&units=metric&lang=kr`,
      );
      if (!response.ok) {
        throw new Error('날씨 데이터를 가져오는 데 실패했습니다.');
      }
      return await response.json();
    } catch (err) {
      return err.json();
    }
  }
  async getForecastData(@Query('lat') lat: number, @Query('lon') lon: number) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.configService.get<string>(
          'WEATHER_API_KEY',
        )}&units=metric`,
      );
      if (!response.ok) {
        throw new Error('날씨 데이터를 가져오는 데 실패했습니다.');
      }

      return await response.json();
    } catch (err) {
      return err.json();
    }
  }
}
