import { Test, TestingModule } from '@nestjs/testing';
import { DailyDataController } from './daily-data.controller';

describe('DailyDataController', () => {
  let controller: DailyDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyDataController],
    }).compile();

    controller = module.get<DailyDataController>(DailyDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
