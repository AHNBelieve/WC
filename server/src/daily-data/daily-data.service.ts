import {
  Injectable,
  UnauthorizedException,
  Headers,
  Body,
  Query,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { UpdateDailyDataDto, DailyDataResponseDto } from './dto/daily-data.dto';

@Injectable()
export class DailyDataService {
  private supabase: SupabaseClient;
  constructor(private configService: ConfigService) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL'),
      this.configService.get<string>('SUPABASE_KEY'),
    );
  }

  //헤더의 authHeader받아서 토큰 리턴하는 함수
  async getUserFromAuthHeader(authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization 헤더가 유효하지 않습니다.',
      );
    }
    const token = authHeader.split(' ')[1];
    const { data, error } = await this.supabase.auth.getUser(token);
    if (error || !data?.user) {
      throw new UnauthorizedException('Invalid or expired session token.');
    }
    return data.user; // 사용자 정보 반환
  }

  async getDailyData(
    @Headers('Authorization') authHeader: string,
    @Query('date') date?: string,
  ): Promise<DailyDataResponseDto> {
    try {
      const user = await this.getUserFromAuthHeader(authHeader);
      const queryDate = date || new Date().toISOString().split('T')[0];
      console.log(queryDate);
      const { data, error } = await this.supabase
        .from('DailyData')
        .select('*')
        .match({ userId: user.id, date: queryDate });

      if (error) {
        console.error('Supabase Error:', error);
        throw error;
      }

      return data[0]; // 항상 배열로 반환
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
  async postDailyData(
    @Headers('Authorization') authHeader: string,
  ): Promise<{ success: string; data: DailyDataResponseDto }> {
    try {
      const today = new Date().toISOString().split('T')[0];
      const user = await this.getUserFromAuthHeader(authHeader);
      const { data, error } = await this.supabase.from('DailyData').insert([
        {
          userId: user.id,
          created_at: new Date(),
          date: today,
          todoData: [],
          memoData: '',
        },
      ]);
      if (error) {
        throw new Error(error.message);
      }
      return {
        success: 'true',
        data: data,
      };
    } catch (error) {
      console.error('Error inserting data to Supabase:', error);
      throw new Error('Supabase insertion failed');
    }
  }
  async updateDailyData(
    @Body() body: UpdateDailyDataDto,
    @Headers('Authorization') authHeader: string,
  ): Promise<void> {
    try {
      console.log(body);
      //DailyData받아 서 오늘 데이터 업데이트!
      const today = new Date().toISOString().split('T')[0];
      const user = await this.getUserFromAuthHeader(authHeader);
      //supabase fetch
      const { error } = await this.supabase
        .from('DailyData')
        .update({
          weatherData: body.weatherData,
          todoData: body.todoData,
          memoData: body.memoData,
        })
        .match({ userId: user.id, date: today });
      if (error) {
        console.log('Error updating data', error);
      } else {
        console.log('Data updated!');
      }
    } catch (err) {
      console.log('Updating Connection Error ', err);
    }
  }
  //Calender 전용
  async getMonthlyDailyData(
    @Headers('Authorization') authHeader: string,
    year: string,
    month: string,
  ) {
    try {
      const user = await this.getUserFromAuthHeader(authHeader);

      // 해당 월의 시작일과 마지막일 계산
      console.log(year, month);
      const startDate = `${year}-${month.padStart(2, '0')}-01`;
      const lastDay = new Date(parseInt(year), parseInt(month), 0).getDate();
      const endDate = `${year}-${month.padStart(2, '0')}-${lastDay}`;

      const { data, error } = await this.supabase
        .from('DailyData')
        .select('date')
        .eq('userId', user.id)
        .neq('weatherData', null)
        .gte('date', startDate)
        .lte('date', endDate);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
