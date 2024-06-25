import { Controller, Post, Put, HttpCode, HttpStatus, UseFilters, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpErrorFilter } from '../filters/filters';
import { AuthMiddleware } from './auth.middleware';
import { Request, Response } from 'express';
import { CreateUserDto, LoginUserDto } from './auth.dto';

@Controller('auth')
@UseFilters(HttpErrorFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  public async signup(@Req() req: Request, @Res() res: Response): Promise<any> {
    const createUserDto: CreateUserDto = req.body;
    const result = await this.authService.signup(createUserDto);
    return res.status(HttpStatus.CREATED).json(result);
  }

  @Post('signin')
  public async signin(@Req() req: Request, @Res() res: Response): Promise<any> {
    const loginUserDto: LoginUserDto = req.body;
    const result = await this.authService.signin(loginUserDto);
    return res.status(HttpStatus.OK).json(result);
  }

  @Put('onboard/:id')
  @UseGuards(AuthMiddleware)
  public async onboardProcess(@Req() req: Request, @Res() res: Response): Promise<any> {
    const userId = req['user'].id;
    const onboardData = req.body;
    const result = await this.authService.onboardProcess(userId, onboardData);
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('complete-registration')
  @UseGuards(AuthMiddleware)
  public async completeRegistration(@Req() req: Request, @Res() res: Response): Promise<any> {
    const userId = req['user'].id;
    const result = await this.authService.completeRegistration(userId);
    return res.status(HttpStatus.OK).json(result);
  }
}
