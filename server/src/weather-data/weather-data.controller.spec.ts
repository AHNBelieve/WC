import { Test, TestingModule } from '@nestjs/testing';
import { WeatherDataController } from './weather-data.controller';

describe('WeatherDataController', () => {
  let controller: WeatherDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherDataController],
    }).compile();

    controller = module.get<WeatherDataController>(WeatherDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
