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
    console.log(authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization 헤더가 유효하지 않습니다.',
      );
    }
    const token = authHeader.split(' ')[1];
    console.log(token);
    const { data, error } = await this.supabase.auth.getUser(token);
    if (error || !data?.user) {
      throw new UnauthorizedException('Invalid or expired session token.');
    }
    return data.user; // 사용자 정보 반환
  }

  async getDailyData(@Headers('Authorization') authHeader: string) {
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
      console.log(body.data);
      console.log(user);
      const { data: result, error } = await this.supabase
        .from('DailyData') // 여기서 테이블명 'your_table'을 실제 테이블 이름으로 바꿔야 합니다
        .insert([
          {
            userId: user.id, // 'user_id' 컬럼에 유저 ID를 삽입
            todoData: body.data.ToDo,
            memoData: body.data.Memo, // 'data' 컬럼에 데이터를 삽입
            created_at: new Date(), // 'created_at' 컬럼에 현재 날짜/시간을 삽입
          },
        ]);
      if (error) {
        throw new Error(error.message); // 에러 발생 시 에러 메시지 처리
      }
      return result; // 성공적으로 삽입된 데이터 반환
    } catch (error) {
      console.error('Error inserting data to Supabase:', error);
      throw new Error('Supabase insertion failed');
    }
  }
}
