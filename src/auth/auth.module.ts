import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtService } from 'src/jwt/jwt.service';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { AuthMiddleware } from './auth.middleware';

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [JwtService, AuthService],
    exports: [AuthService, JwtService, AuthMiddleware]
})
export class AuthModule {}
