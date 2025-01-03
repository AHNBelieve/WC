import {
  Injectable,
  UnauthorizedException,
  Headers,
  Body,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

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

  async getDailyData(@Headers('Authorization') authHeader: string) {
    //오늘 데이터를 보내주는 함수
    try {
      const today = new Date().toISOString().split('T')[0];
      const user = await this.getUserFromAuthHeader(authHeader);
      const { data, error } = await this.supabase
        .from('DailyData')
        .select('*')
        .match({ userId: user.id, date: today });
      if (error) {
        console.error('Supabase Error:', error);
        throw error;
      }

      return data[0];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
  async postDailyData(@Headers('Authorization') authHeader: string) {
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
    @Body() body: any,
    @Headers('Authorization') authHeader: string,
  ) {
    try {
      //DailyData받아서 오늘 데이터 업데이트!
      const today = new Date().toISOString().split('T')[0];
      const user = await this.getUserFromAuthHeader(authHeader);
      //supabase fetch
      const { error } = await this.supabase
        .from('DailyData')
        .update({
          weatherData: body.weatherDataToSave,
          todoData: body.todoDataArray,
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
  async getMonthlyDailyData(@Headers('Authorization') authHeader: string) {
    try {
      //조건 : 해당 유저이고, todoData가 있긴 해야한다.
      const user = await this.getUserFromAuthHeader(authHeader);
      const { data, error } = await this.supabase
        .from('DailyData')
        .select('date')
        .eq('userId', user.id)
        .neq('weatherData', null)
        .gte('date', '2025-01-01')
        .lte('date', '2025-01-31');
      if (error) {
        throw new Error(error.message);
      }
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}
