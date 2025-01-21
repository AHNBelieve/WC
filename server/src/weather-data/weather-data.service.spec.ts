import { Test, TestingModule } from '@nestjs/testing';
import { WeatherDataService } from './weather-data.service';

describe('WeatherDataService', () => {
  let service: WeatherDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherDataService],
    }).compile();

    service = module.get<WeatherDataService>(WeatherDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
