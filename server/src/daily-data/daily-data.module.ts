import { Module } from '@nestjs/common';
import { DailyDataController } from './daily-data.controller';
import { DailyDataService } from './daily-data.service';

@Module({
  controllers: [DailyDataController],
  providers: [DailyDataService],
})
export class DailyDataModule {}
