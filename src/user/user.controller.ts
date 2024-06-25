import { Controller, Get, Param, Req, UseFilters, UseGuards } from '@nestjs/common';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { UserService } from './user.service';
import { Request } from 'express';
import { IUser } from './user.interface';
import { HttpErrorFilter } from 'src/filters/filters';
@Controller('user')
@UseFilters(HttpErrorFilter)
@UseGuards(AuthMiddleware)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getMe(@Req() req: Request): Promise<IUser> {
      const userId = req['user'].id;
      return this.userService.getUserById(userId);
    }
  
    @Get(':username')
    async getUserByUsername(@Param('username') username: string): Promise<IUser> {
      return this.userService.getUserByUsername(username);
    }
}


