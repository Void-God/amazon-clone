import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [BusinessService],
  controllers: [BusinessController],
  imports: [AuthModule]
})
export class BusinessModule {}
