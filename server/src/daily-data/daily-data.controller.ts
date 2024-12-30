import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { DailyDataService } from './daily-data.service';

@Controller('DailyData')
export class DailyDataController {
  constructor(private readonly DailyDataService: DailyDataService) {}

  @Get()
  async getDailyData(@Headers('Authorization') authHeader: string) {
    return await this.DailyDataService.getDailyData(authHeader);
  }

  @Post()
  async postDailyData(
    @Body() body: { data: any },
    @Headers('Authorization') authHeader: string,
  ) {
    return await this.DailyDataService.postDailyData(body, authHeader);
  }
}
