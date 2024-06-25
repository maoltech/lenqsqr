import { Body, Controller, Post, Put, Param, HttpCode, HttpStatus, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ICreateUser, IloginUser } from '../user/user.interface';
import { HttpErrorFilter } from '../filters/filters';
@Controller('auth')
@UseFilters(HttpErrorFilter)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() createUserDto: ICreateUser): Promise<any> {
    return this.authService.signup(createUserDto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() loginUserDto: IloginUser): Promise<any> {
    const { email, password } = loginUserDto;
    return this.authService.signin(loginUserDto);
  }

  @Put('onboard/:id')
  @HttpCode(HttpStatus.OK)
  async onboardProcess(
    @Param('id') userId: string,
    @Body() onboardData: any,
  ): Promise<any> {
    return this.authService.onboardProcess(userId, onboardData);
  }
}
