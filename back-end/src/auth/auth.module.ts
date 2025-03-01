import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ModuleAccessGuard } from './guards/module-access.guard';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './auth.entity';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([Auth])
  ],
  providers: [JwtStrategy, JwtAuthGuard, ModuleAccessGuard, AuthService],
  exports: [JwtAuthGuard, ModuleAccessGuard, AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
