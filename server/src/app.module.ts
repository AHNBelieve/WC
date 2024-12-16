import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CModule } from './pr/c/c.module';
import { DailyDataModule } from './daily-data/daily-data.module';

@Module({
  imports: [UserModule, CModule, DailyDataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
