import { Body, Controller, Get, Patch, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Post()
  Create() {
    //회원가입
    return;
  }

  @Patch()
  Login() {
    //로그인
    return;
  }

  @Get()
  Auth() {}
}
