import { Test, TestingModule } from '@nestjs/testing';
import { DailyDataService } from './daily-data.service';

describe('DailyData', () => {
  let provider: DailyDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyDataService],
    }).compile();

    provider = module.get<DailyDataService>(DailyDataService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
