import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';
import { JwtService } from './jwt/jwt.service';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [UserModule, DbModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
