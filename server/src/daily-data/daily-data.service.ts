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
      const user = await this.getUserFromAuthHeader(authHeader);
      const { data, error } = await this.supabase
        .from('DailyData')
        .select('*')
        .eq('userId', user.id);
      if (error) {
        console.error('Supabase Error:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
  async postDailyData(
    @Body() body: { data: any },
    @Headers('Authorization') authHeader: string,
  ) {
    try {
      const user = await this.getUserFromAuthHeader(authHeader);
      const { data: result, error } = await this.supabase
        .from('DailyData')
        .insert([
          {
            userId: user.id,
            todoData: body.data.ToDo,
            memoData: body.data.Memo,
            created_at: new Date(),
          },
        ]);
      if (error) {
        throw new Error(error.message);
      }
      return result;
    } catch (error) {
      console.error('Error inserting data to Supabase:', error);
      throw new Error('Supabase insertion failed');
    }
  }
}
