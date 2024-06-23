import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtService } from 'src/jwt/jwt.service';
import { AuthService } from './auth.service';
import { AuthRepo } from './auth.repo';

@Module({
    controllers: [AuthController],
    providers: [JwtService, AuthService, AuthRepo],
    exports: [AuthService, JwtService, AuthRepo]
})
export class AuthModule {}
