import {
  Body,
  Controller,
  Get,
  Headers,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DailyDataService } from './daily-data.service';
import { DailyDataResponseDto, UpdateDailyDataDto } from './dto/daily-data.dto';

@Controller('DailyData')
export class DailyDataController {
  constructor(private readonly DailyDataService: DailyDataService) {}

  @Get()
  async getDailyData(
    @Headers('Authorization') authHeader: string,
    @Query('date') date?: string,
  ): Promise<DailyDataResponseDto> {
    return await this.DailyDataService.getDailyData(authHeader, date);
  }
  @Get('month')
  async getMonthlyDailyData(
    @Headers('Authorization') authHeader: string,
  ): Promise<{ date: string }[]> {
    return await this.DailyDataService.getMonthlyDailyData(authHeader);
  }

  @Post()
  async postDailyData(
    @Headers('Authorization') authHeader: string,
  ): Promise<{ success: string; data: DailyDataResponseDto }> {
    return await this.DailyDataService.postDailyData(authHeader);
  }

  @Patch()
  async updateDailyData(
    @Body() body: UpdateDailyDataDto,
    @Headers('Authorization') authHeader: string,
  ): Promise<void> {
    return await this.DailyDataService.updateDailyData(body, authHeader);
  }
}
