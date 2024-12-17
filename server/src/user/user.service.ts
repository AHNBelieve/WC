import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase.service/supabase.service';

@Injectable()
export class UserService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // 1. 유저 테이블 생성
  async createUserTable() {
    const client = this.supabaseService.getClient();

    const { data, error } = await client.rpc('init_user_table'); // SQL 사용 가능
    if (error) {
      throw new Error(`Error creating user table: ${error.message}`);
      return;
    }
  }
}
