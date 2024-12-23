import { Injectable, UnauthorizedException, Headers } from '@nestjs/common';
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

  async getUserFromToken(token: string) {
    const { data, error } = await this.supabase.auth.getUser(token);
    if (error || !data?.user) {
      throw new UnauthorizedException('Invalid or expired session token.');
    }
    return data.user; // 사용자 정보 반환
  }

  async getDailyData(@Headers('Authorization') authHeader: string) {
    console.log('aa');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization 헤더가 유효하지 않습니다.',
      );
    }

    const token = authHeader.split(' ')[1]; // "Bearer " 이후의 토큰 추출
    const user = await this.getUserFromToken(token); // 세션 토큰으로 사용자 ID 가져오

    try {
      const { data, error } = await this.supabase
        .from('DailyData')
        .select('*')
        .eq('userId', user.id);
      console.log(data);
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
}
