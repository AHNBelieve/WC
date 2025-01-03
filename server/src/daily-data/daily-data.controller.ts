import { Body, Controller, Get, Headers, Patch, Post } from '@nestjs/common';
import { DailyDataService } from './daily-data.service';

@Controller('DailyData')
export class DailyDataController {
  constructor(private readonly DailyDataService: DailyDataService) {}

  @Get()
  async getDailyData(@Headers('Authorization') authHeader: string) {
    return await this.DailyDataService.getDailyData(authHeader);
  }
  @Get('month')
  async getMonthlyDailyData(@Headers('Authorization') authHeader: string) {
    return await this.DailyDataService.getMonthlyDailyData(authHeader);
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
