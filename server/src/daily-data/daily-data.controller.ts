import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DailyDataService } from './daily-data.service';

@Controller('DailyData')
export class DailyDataController {
  constructor(private readonly DailyDataService: DailyDataService) {}

  @Get()
  async getDailyData(
    @Headers('Authorization') authHeader: string,
    @Query('date') date?: string,
  ) {
    return await this.DailyDataService.getDailyData(authHeader, date);
  }

  @Post()
  async postDailyData(@Headers('Authorization') authHeader: string) {
    return await this.DailyDataService.postDailyData(authHeader);
  }

  @Patch()
  async updateDailyData(
    @Body()
    body: any,
    @Headers('Authorization') authHeader: string,
  ) {
    return await this.DailyDataService.updateDailyData(body, authHeader);
  }
}
